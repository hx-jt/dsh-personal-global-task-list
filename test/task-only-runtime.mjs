// Real Cordis/session/storage integration: removal must preserve tasks and legacy DID bytes.
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { Context } from '@deepseek-ai/cordis'
import SessionStore, { SessionId } from '@deepseek-ai/dsh-session'
import { createMessage, createUserMessage } from '@deepseek-ai/dsh-llm'
import * as StorageDomain from '@deepseek-ai/dsh-storage-domain'

const requireDomain = createRequire(import.meta.resolve('@deepseek-ai/dsh-storage-domain'))
const { default: Storage } = await import(pathToFileURL(requireDomain.resolve('@deepseek-ai/dsh-storage')))
const StorageJson = await import(process.env.DSH_STORAGE_JSON_MODULE
  ? pathToFileURL(process.env.DSH_STORAGE_JSON_MODULE)
  : new URL('../../deepseek-harness/packages/storage/storage-json/lib/index.js', import.meta.url))
const home = mkdtempSync(join(tmpdir(), 'task-only-runtime-'))
const previousHome = process.env.DSH_HOME
process.env.DSH_HOME = home
const Plugin = await import('../lib/index.js')
const legacyPath = join(home, 'domains', 'task_ui_did.json')
const legacyBytes = JSON.stringify({ unit: {}, global: null, tables: { records: {
  'legacy:1': { id:'legacy:1', sessionId:'legacy', turn:1, summary:'保留给独立插件迁移', reply:'旧回复', taskIds:['legacy-task'], startedAt:1, endedAt:2, updatedAt:2, status:'replied', sourceSeqs:[1,2], requestSeqs:[1] },
} } }) + '\n'
mkdirSync(join(home, 'domains'), { recursive: true })
writeFileSync(legacyPath, legacyBytes)
const seededSkill = join(home, 'skills', 'task-ui', 'SKILL.md')
mkdirSync(join(home, 'skills', 'task-ui'), { recursive:true })
writeFileSync(seededSkill, readFileSync(new URL('./fixtures/task-ui-demo2.md', import.meta.url), 'utf8'))
const runtimes = []
async function boot(extra = {}) {
  const ctx = new Context(), fibers = [], tools = new Map(), sections = []
  fibers.push(await ctx.plugin(Storage))
  fibers.push(await ctx.plugin(StorageJson, { root: join(home, 'domains') }))
  fibers.push(await ctx.plugin(StorageDomain, { backend: 'json' }))
  fibers.push(await ctx.plugin(SessionStore))
  ctx.provide('tools', {
    register(tool) {
      if (tools.has(tool.name)) throw new Error(`duplicate tool: ${tool.name}`)
      tools.set(tool.name, tool)
      return () => tools.delete(tool.name)
    },
    get(name) { return tools.get(name) },
  })
  ctx.provide('webServer', { register() { return () => {} } })
  ctx.provide('jobs', { events: { subscribe() { return () => {} } } })
  ctx.provide('agents', { list() { return [] } })
  ctx.provide('systemPrompt', { section(s) { sections.push(s); return () => {} }, getSectionOrder() { return 2800 } })
  const tables = new Map()
  const openDomain = ctx.storageDomain.open.bind(ctx.storageDomain)
  ctx.storageDomain.open = async spec => {
    const domain = await openDomain(spec)
    const name = spec.name === 'task_ui' ? 'tasks' : 'pending'
    tables.set(name, domain.table(name))
    return domain
  }
  fibers.push(await ctx.plugin(Plugin, { promptSection:true, openingSnapshot:true, unfinishedOnly:true,
    jobStatusMap:{running:'running',stopping:'running',completed:'done',killed:'blocked',failed:'failed'}, ...extra }))
  const runtime = {
    ctx, tools, sections, tables,
    async query(name, args = {}, exec = {}) { return (await tools.get(name).execute(args, exec)).text },
    async assemble(session) {
      const foreign = [{ name:'what-we-did:delta', text:'EXTERNAL_DID_DELTA' }, { name:'task-ui:did', text:'FOREIGN_CONTEXT' }]
      const initial = { contexts:foreign, sections:[], tools:[], variables:{} }
      const result = await ctx.waterfall('system-prompt/assemble', initial, {agent:{session}}, async () => initial)
      assert.deepEqual(result.contexts.filter(x=>x.name!=='task-ui:snapshot'), foreign, 'preserve other context providers')
      assert.ok(!result.contexts.some(x=>x.name==='task-ui:snapshot'))
      const decision = await ctx.waterfall('agent/pre-step', {agent:{session},signal:new AbortController().signal}, async()=>({kind:'enter',messages:[createUserMessage({content:[{type:'text',text:'normal input'}],source:{kind:'user'}})]}))
      const data = decision.messages.find(x=>x.source.kind==='task-ui-state')
      if(data) session.append('user/message',data,{surfaceOp:'append'})
      return data?.content[0].text
    },
    async close() { for (const fiber of fibers.reverse()) await fiber.dispose(); fibers.length = 0 },
  }
  runtimes.push(runtime)
  return runtime
}
try {
  // Old profile flags must never re-enable removed behavior.
  const first = await boot({didLog:true, didWindowHours:72})
  assert.deepEqual([...first.tools.keys()].filter(n=>n.startsWith('did_')), [], 'must not register DID tools even with old config')
  const skillBody = readFileSync(seededSkill,'utf8').split('\n').slice(1).join('\n')
  assert.equal(skillBody,readFileSync(new URL('../skills/task-ui/SKILL.md', import.meta.url),'utf8'), 'unchanged unstamped demo.2 skill must be upgraded, not left teaching retired tools')
  const schema = Plugin.Config({didLog:true, didWindowHours:72})
  assert.equal(schema.openingSnapshot, true, 'old keys must not break task config defaults')
  const a = first.ctx.sessions.create(SessionId('task-only-A'))
  a.append('turn/start', {turn:1})
  a.append('user/message', createUserMessage({content:[{type:'text',text:'只记录任务预算'}],source:{kind:'user'}}), {surfaceOp:'append'})
  const exec = {agent:{session:a}}
  const created = await first.query('task_add', {title:'任务拆分回归',description:'预算500元'}, exec)
  const id = created.match(/task added: ([^ ]+)/)[1]
  await first.query('task_update', {id,description:'预算300元'}, exec)
  const child = await first.query('task_add', {title:'子任务回归',parentId:id,description:'尚未执行'}, exec)
  const childId = child.match(/task added: ([^ ]+)/)[1]
  const h = JSON.parse(await first.query('task_history',{id}))
  assert.equal(h.total,2)
  assert.deepEqual(h.entries[1].changes.find(x=>x.field==='description'), {field:'description',before:'预算500元',after:'预算300元'})
  assert.ok((await first.query('task_get',{id:childId})).includes(id), 'parent relation remains queryable')
  a.append('assistant/message', {turn:1,step:1,stream:[],message:createMessage({role:'assistant',content:[{type:'text',text:'不应作为did重新录制'}],source:{kind:'model',provider:'test',model:'none'}})}, {surfaceOp:'append'})
  a.append('turn/end', {turn:1,reason:{kind:'completed'}})
  const b = first.ctx.sessions.create(SessionId('task-only-B'))
  const snapshot = await first.assemble(b)
  assert.ok(snapshot.includes('预算300元') && snapshot.includes(childId))
  assert.ok(!snapshot.includes('不应作为did重新录制'))
  assert.equal(await first.assemble(b), undefined, 'unchanged task state adds no message')
  // Admission gates and a dropped candidate: retry exactly the same delivery.
  const candidateSession = first.ctx.sessions.create(SessionId('candidate-retry'))
  const candidate = async (session, messages) => first.ctx.waterfall('agent/pre-step',
    {agent:{session},signal:new AbortController().signal},async()=>({kind:'enter',messages}))
  assert.deepEqual((await candidate(candidateSession,[])).messages,[], 'empty tool continuation never creates input')
  const input=()=>[createUserMessage({content:[{type:'text',text:'核对任务'}],source:{kind:'user'}})]
  const one=(await candidate(candidateSession,input())).messages.at(-1)
  const two=(await candidate(candidateSession,input())).messages.at(-1)
  assert.equal(one.source.deliveryId,two.source.deliveryId,'uncommitted batch retries stable deliveryId')
  candidateSession.append('user/message',two,{surfaceOp:'append'})
  assert.equal((await candidate(candidateSession,input())).messages.length,1,'committed delivery reconciles pending metadata')
  const sub=await candidate({header:{origin:'subagent'}},input())
  assert.equal(sub.messages.length,1,'subagent has no global task injection')
  const taskTable=first.tables.get('tasks'), savedEntries=taskTable.entries.bind(taskTable)
  taskTable.entries=function*(){yield [...savedEntries()][0];throw new Error('partial task read failed')}
  assert.equal(await first.assemble(b),undefined,'partial read does not emit deletion or empty baseline')
  taskTable.entries=savedEntries
  assert.equal(await first.assemble(b),undefined,'read recovery keeps committed state')
  await first.tables.get('pending').delete(b.id)
  assert.equal(await first.assemble(b),undefined,'missing control metadata restores from retained deliveries')
  const fresh=first.ctx.sessions.create(SessionId('pending-write-failure'))
  const pendingTable=first.tables.get('pending'), savedPut=pendingTable.put.bind(pendingTable)
  pendingTable.put=async()=>{throw new Error('pending write failed')}
  assert.equal(await first.assemble(fresh),undefined,'pending write failure never advances delivered state')
  pendingTable.put=savedPut
  assert.match(await first.assemble(fresh),/baseline/,'next successful admission still sends missing baseline')
  const prompt = first.sections[0].text({agent:{session:b}})
  assert.ok(!/did_(list|get|note)|task-ui:did|automatic did ledger/.test(prompt), 'instructions must not depend on a ledger')
  for (const name of ['did_list','did_get','did_note']) {
    first.ctx.tools.register({name,async execute(){return {text:'independent ledger'}}})
    assert.equal(await first.query(name), 'independent ledger', 'independent plugin owns DID names')
  }
  assert.equal(readFileSync(legacyPath,'utf8'), legacyBytes)
  await first.close()
  assert.equal(readFileSync(legacyPath,'utf8'), legacyBytes, 'unload preserves migration source')
  const disabled = await boot({openingSnapshot:false})
  assert.equal(await disabled.assemble(disabled.ctx.sessions.create(SessionId('disabled'))),undefined)
  await disabled.close()
  const second = await boot()
  const reopened = second.ctx.sessions.create(SessionId('task-only-reopened'))
  assert.ok((await second.assemble(reopened)).includes('预算300元'))
  assert.equal(JSON.parse(await second.query('task_history',{id})).total,2)
  assert.equal(readFileSync(legacyPath,'utf8'),legacyBytes, 'reload must not migrate or erase legacy DID')
  console.log('TASK_ONLY_RUNTIME_OK: no DID ownership/recording; foreign contexts/legacy bytes preserved; tasks/history/parents survive reload')
} finally {
  for (const runtime of runtimes.reverse()) await runtime.close()
  if (previousHome === undefined) delete process.env.DSH_HOME
  else process.env.DSH_HOME = previousHome
  rmSync(home,{recursive:true,force:true})
}
