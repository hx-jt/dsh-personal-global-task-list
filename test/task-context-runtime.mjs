import assert from 'node:assert/strict'
import { Session, SessionId } from '@deepseek-ai/dsh-session'
import { prepareTaskContext } from '../lib/index.js'
const session=Session.create(SessionId('context-test'))
const row=(id,extra={})=>({id,title:id,status:'pending',description:'预算500',parentId:null,steps:[],dependsOn:[],evidence:[],surface:null,progress:null,jobId:null,nextStep:'',...extra})
const deliver=message=>session.append('user/message',message,{surfaceOp:'append'})
const text=m=>m?.content[0].text
let m=prepareTaskContext(session,[row('A'),row('B',{status:'done'})],true)
assert.match(text(m),/baseline/); assert.match(text(m),/预算500/); assert.ok(!text(m).includes('"id":"B"'))
deliver(m)
assert.equal(prepareTaskContext(session,[row('A')],true),undefined)
m=prepareTaskContext(session,[row('A',{description:'x'.repeat(300)+'预算300'})],true); assert.match(text(m),/description/); deliver(m)
m=prepareTaskContext(session,[row('A',{description:'x'.repeat(300)+'预算400'})],true); assert.match(text(m),/truncated/); deliver(m)
m=prepareTaskContext(session,[row('A',{status:'done'})],true); assert.match(text(m),/completed/); deliver(m)
m=prepareTaskContext(session,[row('A')],true); assert.match(text(m),/added/); deliver(m)
m=prepareTaskContext(session,[],true); assert.match(text(m),/deleted/); deliver(m)
assert.equal(prepareTaskContext(session,[],true),undefined)
console.log('TASK_CONTEXT_RULES_OK')
// Empty baseline, stable timestamps, field completeness and canonical objects.
const empty=Session.create(SessionId('empty'))
let e=prepareTaskContext(empty,[],true);empty.append('user/message',e,{surfaceOp:'append'});assert.equal(prepareTaskContext(empty,[],true),undefined)
const fieldsSession=Session.create(SessionId('fields'))
const initial=row('X',{surface:{a:1,b:2}})
fieldsSession.append('user/message',prepareTaskContext(fieldsSession,[initial],true),{surfaceOp:'append'})
assert.equal(prepareTaskContext(fieldsSession,[{...initial,surface:{b:2,a:1},updatedAt:100}],true),undefined)
for(const [key,value] of Object.entries({steps:[{text:'next',state:'next'}],nextStep:'',progress:{text:'half',percent:50},dependsOn:['other'],evidence:[{kind:'file',ref:'x',note:''}],jobId:'j',parentId:'p'})) {
 const changed={...initial,[key]:key==='nextStep'?'verify':value}
 const m=prepareTaskContext(fieldsSession,[changed],true)
 assert.ok(text(m).includes(key));fieldsSession.append('user/message',m,{surfaceOp:'append'})
}
const all=Session.create(SessionId('all'))
e=prepareTaskContext(all,[row('done',{status:'done'})],false);assert.match(text(e),/scope=all/)
all.append('user/message',e,{surfaceOp:'append'})
e=prepareTaskContext(all,[row('done')],false);assert.match(text(e),/updated/)
// Partial batches only advance delivered rows actually included.
const many=Array.from({length:8},(_,i)=>row(`task${i}`)), partial=Session.create(SessionId('partial'))
e=prepareTaskContext(partial,many,true,600);assert.match(text(e),/complete=false/)
partial.append('user/message',e,{surfaceOp:'append'})
let rounds=1
while((e=prepareTaskContext(partial,many,true,600))) {partial.append('user/message',e,{surfaceOp:'append'});assert.ok(++rounds<10)}
assert.equal(Object.keys(partial.snapshotEvents().at(-1).data.source.state.delivered).length,8)
// Candidate generation is not delivery, even if storage changed after capture.
const fail=Session.create(SessionId('failure'))
const candidate=prepareTaskContext(fail,[row('Z')],true)
assert.equal(prepareTaskContext(fail,[row('Z')],true).source.batch,'baseline')
fail.append('user/message',candidate,{surfaceOp:'append'})
e=prepareTaskContext(fail,[row('Z',{description:'new'})],true);assert.match(text(e),/updated/)
console.log('TASK_CONTEXT_EDGE_CASES_OK')
// Parent deletion does not delete the child; explicit clearing differs from omission.
const family=Session.create(SessionId('family'))
let records=[row('parent'),row('child',{parentId:'parent',nextStep:'old'})]
family.append('user/message',prepareTaskContext(family,records,true),{surfaceOp:'append'})
e=prepareTaskContext(family,[row('child',{parentId:null,nextStep:''})],true)
assert.match(text(e),/"id":"parent".*deleted/);assert.match(text(e),/"parentId":null/);assert.match(text(e),/"nextStep":""/)
family.append('user/message',e,{surfaceOp:'append'})
assert.ok(family.snapshotEvents().at(-1).data.source.state.delivered.child)
// Baseline loss and each later transition loss require a fresh epoch.
for(const change of ['update','complete','delete']) {
 const s=Session.create(SessionId(`loss-${change}`))
 s.append('user/message',prepareTaskContext(s,[row('a')],true),{surfaceOp:'append'})
 const current=change==='delete'?[]:[row('a',change==='complete'?{status:'done'}:{description:'changed'})]
 const delta=s.append('user/message',prepareTaskContext(s,current,true),{surfaceOp:'append'})
 s.append('user/message',{...delta.data,source:{kind:'user'},content:[{type:'text',text:'summary without coverage'}]},{surfaceOp:{op:'replace',startSeq:delta.seq,endSeq:delta.seq},sourceEventSeqs:[delta.seq]})
 const recovery=prepareTaskContext(s,current,true)
 assert.equal(recovery.source.batch,'baseline');assert.notEqual(recovery.source.state.epoch,delta.data.source.state.epoch)
}
// Scope change resets epoch instead of masquerading as mass deletion.
const scope=Session.create(SessionId('scope'))
scope.append('user/message',prepareTaskContext(scope,[row('a',{status:'done'})],false),{surfaceOp:'append'})
assert.equal(prepareTaskContext(scope,[],true).source.batch,'baseline')
console.log('TASK_CONTEXT_RECOVERY_OK')
const lostBaseline=Session.create(SessionId('lost-baseline'))
const baseEvent=lostBaseline.append('user/message',prepareTaskContext(lostBaseline,[row('a')],true),{surfaceOp:'append'})
lostBaseline.append('user/message',{...baseEvent.data,source:{kind:'user'},content:[{type:'text',text:'summary'}]},{surfaceOp:{op:'replace',startSeq:baseEvent.seq,endSeq:baseEvent.seq},sourceEventSeqs:[baseEvent.seq]})
assert.equal(prepareTaskContext(lostBaseline,[row('a')],true).source.batch,'baseline')
console.log('TASK_CONTEXT_BASELINE_LOSS_OK')
// Fresh process: restore the same durable session graph; no in-memory cursor exists.
const {spawnSync}=await import('node:child_process')
const restored=spawnSync(process.execPath,['--input-type=module','-e',`
 import {Session,SessionId,SessionLogOffset,SESSION_FORMAT_VERSION} from '@deepseek-ai/dsh-session';
 import {prepareTaskContext} from './lib/index.js';
 let input=''; for await (const chunk of process.stdin) input+=chunk;
 const {events,rows}=JSON.parse(input),id=SessionId('failure');
 const session=Session.fromRestore(id,events,{id,version:SESSION_FORMAT_VERSION,createdAt:1,cwd:'/test',isSeeded:false},SessionLogOffset(0),'detached');
 if(prepareTaskContext(session,rows,true)!==undefined) throw new Error('restored session resent unchanged tasks');
 console.log('TASK_CONTEXT_PROCESS_RESTORE_OK');
`],{input:JSON.stringify({events:fail.snapshotEvents(),rows:[row('Z')]}),encoding:'utf8'})
assert.equal(restored.status,0,restored.stderr);console.log(restored.stdout.trim())
