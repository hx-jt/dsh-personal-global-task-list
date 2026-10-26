// Runtime integration: real Cordis event dispatch, SessionStore append envelopes,
// storage-domain validation and the Harness JSON backend on temporary disk.
// Tools/web/jobs/system-prompt registrations are narrow test doubles: no model,
// server or job execution. Requires the sibling deepseek-harness checkout (or
// DSH_STORAGE_JSON_MODULE pointing to its built storage-json entry).
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, readFileSync, writeFileSync } from 'node:fs'
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
const jsonUrl = process.env.DSH_STORAGE_JSON_MODULE
  ? pathToFileURL(process.env.DSH_STORAGE_JSON_MODULE)
  : new URL('../../deepseek-harness/packages/storage/storage-json/lib/index.js', import.meta.url)
const StorageJson = await import(jsonUrl)
const home = mkdtempSync(join(tmpdir(), 'task-history-runtime-'))
const previousHome = process.env.DSH_HOME
process.env.DSH_HOME = home
const Plugin = await import('../lib/index.js')
const config = { openingSnapshot:true, unfinishedOnly:true, promptSection:true, jobStatusMap:{running:'running',stopping:'running',completed:'done',killed:'blocked',failed:'failed'} }
const runtimes = []
async function boot() {
  const ctx = new Context()
  const fibers = []
  const tools = new Map(), sections = [], routes = [], jobListeners = []
  fibers.push(await ctx.plugin(Storage))
  fibers.push(await ctx.plugin(StorageJson, { root: join(home, 'domains') }))
  fibers.push(await ctx.plugin(StorageDomain, { backend: 'json' }))
  fibers.push(await ctx.plugin(SessionStore))
  ctx.provide('tools', { register(tool) { tools.set(tool.name, tool); return () => tools.delete(tool.name) }, get(name) { return tools.get(name) } })
  ctx.provide('webServer', { register(route) { routes.push(route); return () => {} } })
  ctx.provide('jobs', { events: { subscribe(_filter,fn) { jobListeners.push(fn); return () => {} } } })
  ctx.provide('agents', { list() { return [] } })
  ctx.provide('systemPrompt', { section(s) { sections.push(s); return () => {} }, getSectionOrder() { return 2800 } })
  fibers.push(await ctx.plugin(Plugin, config))
  const runtime = {
    ctx, tools, sections, routes, jobListeners,
    async query(name, args = {}, exec = {}) {
      assert.ok(tools.has(name), `${name} registered through a real plugin fiber`)
      return (await tools.get(name).execute(args, exec)).text
    },
    async assemble(session) {
      const initial = { contexts: [], sections: [], tools: [], variables: {} }
      const assembly = await ctx.waterfall('system-prompt/assemble', initial, { agent: { session } }, async () => initial)
      return assembly.contexts.map(row => row.text).join('\n')
    },
    async close() {
      for (const fiber of fibers.reverse()) await fiber.dispose()
      fibers.length = 0
    },
  }
  runtimes.push(runtime)
  return runtime
}
async function history(runtime, id) { return JSON.parse(await runtime.query('task_history', {id})) }
async function panelStatus(runtime,id,status) {
  const route=runtime.routes.find(r=>r.kind==='prefix')
  let code,body
  await route.handler({method:'POST',url:'/task-ui/status',async *[Symbol.asyncIterator]() {yield Buffer.from(JSON.stringify({id,status}))}}, {writeHead(n){code=n},end(b){body=b}})
  assert.equal(code,200,body)
}
try {
  const first=await boot()
  assert.ok(first.tools.has('task_history'),'history read tool is registered')
  const a=first.ctx.sessions.create(SessionId('history-A'))
  const user=a.append('user/message',createUserMessage({content:[{type:'text',text:'预算改为300元'}],source:{kind:'user'}}),{surfaceOp:'append'})
  const exec={agent:{session:a}}
  const added=await first.query('task_add',{title:'预算测试',description:'预算500元'},exec)
  const id=added.match(/task added: ([^ ]+)/)[1]
  await first.query('task_update',{id,description:'预算300元',changeNote:'用户下调预算'},exec)
  await first.query('task_update',{id,description:'预算400元'},exec)
  let h=await history(first,id)
  assert.equal(h.total,3)
  assert.deepEqual(h.entries.map(e=>e.operation),['create','update','update'])
  const change=e=>e.changes.find(c=>c.field==='description')
  assert.equal(change(h.entries[0]).after,'预算500元')
  assert.deepEqual([change(h.entries[1]).before,change(h.entries[1]).after],['预算500元','预算300元'])
  assert.deepEqual([change(h.entries[2]).before,change(h.entries[2]).after],['预算300元','预算400元'])
  assert.equal(h.entries[1].source.sessionId,'history-A')
  assert.equal(h.entries[1].source.eventSeq,user.seq)
  assert.equal(h.entries[1].source.note,'用户下调预算')
  await first.query('task_update',{id,description:'预算400元',changeNote:'重复确认'},exec)
  assert.equal((await history(first,id)).total,3)
  await Promise.all([first.query('task_update',{id,title:'并发标题'},exec),first.query('task_update',{id,nextStep:'等待确认'},exec)])
  const current=await first.query('task_get',{id})
  assert.ok(current.includes('并发标题')&&current.includes('等待确认'))
  assert.equal((await history(first,id)).total,5)
  await panelStatus(first,id,'blocked')
  h=await history(first,id)
  assert.equal(h.total,6)
  assert.equal(h.entries.at(-1).source.kind,'panel')
  assert.deepEqual(h.entries.at(-1).changes,[{field:'status',before:'pending',after:'blocked'}])
  await assert.rejects(first.query('task_update',{id,status:'not-a-status'},exec))
  assert.equal((await history(first,id)).total,6)
  const page=JSON.parse(await first.query('task_history',{id,offset:1,limit:2}))
  assert.equal(page.entries.length,2);assert.equal(page.nextOffset,3)
  assert.ok(!(await first.assemble(a)).includes('预算500元'))
  const master=first.sections[0].text({agent:{session:a}})
  assert.ok(master.includes('Personal Agent')&&master.includes('notebook'))
  assert.ok(master.includes('ask the user')&&master.includes('before claiming'))
  const linked=await first.query('task_add',{title:'后台执行测试'})
  const jobTaskId=linked.match(/task added: ([^ ]+)/)[1]
  await first.query('task_update',{id:jobTaskId,jobId:'job-history',status:'running'})
  for(const fn of first.jobListeners) fn({job:{id:'job-history',status:'completed'}})
  let jobHistory
  for(let i=0;i<100;i++) {
    jobHistory=await history(first,jobTaskId)
    if(jobHistory.entries.at(-1)?.source.kind==='job')break
    await new Promise(resolve=>setTimeout(resolve,10))
  }
  assert.equal(jobHistory.entries.at(-1).source.kind,'job')
  assert.equal(jobHistory.entries.at(-1).changes.find(c=>c.field==='status').after,'done')
  const histBefore=(await history(first,id)).entries
  await first.close()
  // Simulate a genuine pre-upgrade record in temporary JSON only: no history field.
  const storagePath=join(home,'domains','task_ui.json')
  const disk=JSON.parse(readFileSync(storagePath,'utf8'))
  disk.tables.tasks['legacy-task']={...disk.tables.tasks[id],title:'旧任务',description:'旧预算500元'}
  delete disk.tables.tasks['legacy-task'].history
  writeFileSync(storagePath,JSON.stringify(disk))
  const reopened=await boot()
  assert.deepEqual((await history(reopened,id)).entries,histBefore)
  assert.ok((await reopened.query('task_get',{id})).includes('预算400元'))
  assert.equal((await history(reopened,'legacy-task')).total,0)
  await reopened.query('task_update',{id:'legacy-task',description:'旧预算300元'})
  const migrated=await history(reopened,'legacy-task')
  assert.equal(migrated.total,1)
  assert.equal(migrated.entries[0].operation,'update')
  assert.deepEqual([change(migrated.entries[0]).before,change(migrated.entries[0]).after],['旧预算500元','旧预算300元'])
  console.log('HISTORY_RUNTIME_OK: atomic state+history, sources, no-ops, concurrency, panel, restart')
} finally {
  for (const runtime of runtimes.reverse()) await runtime.close()
  if(previousHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previousHome
  rmSync(home,{recursive:true,force:true})
}
