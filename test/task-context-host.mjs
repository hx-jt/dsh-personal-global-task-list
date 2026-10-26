import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { mkdtempSync,rmSync,writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
const require=createRequire(new URL('../../deepseek-harness/packages/core/agent-loop/package.json',import.meta.url))
const load=name=>import(pathToFileURL(require.resolve(name)).href)
const {Context}=await load('@deepseek-ai/cordis')
const {default:Llm,LlmAdapter,createUserMessage}=await load('@deepseek-ai/dsh-llm')
const {default:Sessions,SessionId}=await load('@deepseek-ai/dsh-session')
const {default:Projection}=await load('@deepseek-ai/dsh-session-projection')
const {default:Prompt}=await load('@deepseek-ai/dsh-system-prompt')
const {default:Tools}=await load('@deepseek-ai/dsh-tools')
const {default:Agents}=await load('@deepseek-ai/dsh-agent')
const {default:Loop}=await load('@deepseek-ai/dsh-agent-loop')
const requireDomain=createRequire(import.meta.resolve('@deepseek-ai/dsh-storage-domain'))
const {default:Storage}=await import(pathToFileURL(requireDomain.resolve('@deepseek-ai/dsh-storage')))
const StorageJson=await import(new URL('../../deepseek-harness/packages/storage/storage-json/lib/index.js',import.meta.url))
const Domain=await import('@deepseek-ai/dsh-storage-domain')
const Plugin=await import('../lib/index.js')
const home=mkdtempSync(join(tmpdir(),'task-context-host-')), oldHome=process.env.DSH_HOME
process.env.DSH_HOME=home
const ctx=new Context(),requests=[],errors=[]
let failNext=false, inputs=0, foreign="FOREIGN_INITIAL"
const msg=text=>createUserMessage({content:[{type:'text',text}],source:{kind:'user'}})
try {
 for(const plugin of [Llm,Sessions,Projection,Prompt,Tools,Agents,Storage]) await ctx.plugin(plugin)
 await ctx.plugin(StorageJson,{root:join(home,'domains')}); await ctx.plugin(Domain,{backend:'json'})
 ctx.provide('jobs',{events:{subscribe(){return ()=>{}}}});ctx.provide('webServer',{register(){return ()=>{}}})
 await ctx.plugin(Loop,{agents:[]})
 ctx.on('system-prompt/assemble',async(_assembly,_context,next)=>{
  const result=await next();return {...result,contexts:[...result.contexts,{name:'foreign:context',text:foreign}]}
 })
 let fiber=await ctx.plugin(Plugin,Plugin.Config({}))
 ctx.on('agent/error',({error})=>errors.push(String(error)))
 ctx.llm.registerAdapter(['capture'],new class extends LlmAdapter {
  async resolveModel(provider,model){return {provider,id:model,name:model}}
  async *stream(request){requests.push(request);if(failNext){failNext=false;throw new Error("capture request failure")}yield {type:'block-start',index:0,blockType:'text'};yield {type:'block-end',index:0,block:{type:'text',text:'ok'}};yield {type:'finish',reason:{kind:'stop'}}}
 })
 const a=await ctx.agentLoop.create(SessionId('A'),{provider:'capture',model:'test'})
 const send=async(agent=a)=>{inputs++;agent.followup(msg('继续核对当前任务'));await agent.whenIdle();assert.deepEqual(errors,[])}
 const query=async(name,args)=> (await ctx.tools.get(name).execute(args,{agent:a})).text
 const batches=()=>a.session.snapshotEvents().filter(e=>e.type==='user/message'&&e.data.source.kind==='task-ui-state')
 await send();assert.equal(batches().length,1);await send();assert.equal(batches().length,1)
 foreign='FOREIGN_CHANGED';await send();assert.equal(batches().length,1,'foreign runtime context cannot carry task data again')
 const beforeWrite=requests.length
 const id=(await query('task_add',{title:'录音整理',description:'预算500元'})).match(/task added: ([^ ]+)/)[1]
 assert.equal(requests.length,beforeWrite,'task writes do not wake the agent')
 await send();assert.equal(batches().length,2);assert.match(batches().at(-1).data.content[0].text,/added/)
 await query('task_update',{id,description:'预算400元'});await send();assert.match(batches().at(-1).data.content[0].text,/预算400/)
 const changed=batches().at(-1)
 await send();assert.equal(batches().length,3)
 await fiber.dispose(); fiber=await ctx.plugin(Plugin,Plugin.Config({}));await send();assert.equal(batches().length,3,'plugin reload does not resend')
 await query('task_update',{id,status:'done'});await send();assert.match(batches().at(-1).data.content[0].text,/completed/)
 const completion=batches().at(-1)
 // Replace a later delta while the original baseline remains on the surface.
 a.session.append('user/message',msg('compaction summary'),{surfaceOp:{op:'replace',startSeq:completion.seq,endSeq:completion.seq},sourceEventSeqs:[completion.seq]})
 await send();assert.equal(batches().at(-1).data.source.batch,'baseline');assert.notEqual(batches().at(-1).data.source.state.epoch,completion.data.source.state.epoch)
 await query('task_update',{id,status:'pending'});await send();assert.match(batches().at(-1).data.content[0].text,/added/)
 await query('task_delete',{id});await send();assert.match(batches().at(-1).data.content[0].text,/deleted/)
 const b=await ctx.agentLoop.create(SessionId('B'),{provider:'capture',model:'test'});await send(b)
 assert.equal(b.session.snapshotEvents().filter(e=>e.type==='user/message'&&e.data.source.kind==='task-ui-state').length,1)
 const beforeFailure=batches().length
 await query('task_add',{title:'失败恢复',description:'重试不重贴'})
 failNext=true;inputs++;a.followup(msg('核对失败恢复'));await a.whenIdle();assert.equal(errors.length,1);errors.length=0
 assert.equal(batches().length,beforeFailure+1)
 await send();assert.equal(batches().length,beforeFailure+1,'model failure retains delivery already in effective context')
 assert.equal(requests.length,inputs,'exactly one request per human input')
 assert.ok(!JSON.stringify(requests).includes('task-ui:snapshot'))
 const evidence={requests:requests.map(r=>r.messages),batches:batches().map(e=>({seq:e.seq,source:e.data.source,text:e.data.content[0].text}))}
 if(process.env.TASK_CONTEXT_EVIDENCE) writeFileSync(process.env.TASK_CONTEXT_EVIDENCE,JSON.stringify(evidence,null,2))
 console.log('TASK_CONTEXT_HOST_OK: captured requests; no duplicates; reload; completion/deletion; lost-delta recovery; per-session baseline')
} finally {await ctx.fiber.dispose();if(oldHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=oldHome;rmSync(home,{recursive:true,force:true})}
