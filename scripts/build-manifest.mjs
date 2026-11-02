// No dependencies: CI can check committed distribution without installing/building it.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {join,relative} from 'node:path'
import assert from 'node:assert/strict'
const root=fileURLToPath(new URL('../',import.meta.url))
const digest=data=>createHash('sha256').update(data).digest('hex')
const walk=dir=>readdirSync(join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`])
const inputs=[...walk('src'),'tsconfig.json','tsdown.config.mjs','tsdown.host.config.mjs'].sort()
const outputs=['lib/index.js','lib/client.js']
const hashes=paths=>Object.fromEntries(paths.map(p=>[p,digest(readFileSync(join(root,p)))]))
const pkg=JSON.parse(readFileSync(join(root,'package.json'),'utf8'))
const current={schema:1,package:pkg.name,version:pkg.version,inputs:hashes(inputs),outputs:hashes(outputs)}
const path=join(root,'lib/build-manifest.json')
if(process.argv[2]==='write') {
 writeFileSync(path,JSON.stringify(current,null,2)+'\n')
 console.log('BUILD_MANIFEST_WRITTEN')
} else if(process.argv[2]==='check') {
 assert.deepEqual(JSON.parse(readFileSync(path,'utf8')),current,'Source/runtime distribution is stale; run npm run build and commit lib/')
 console.log('BUILD_MANIFEST_OK: committed inputs and runtime bytes match')
} else {throw new Error('usage: node scripts/build-manifest.mjs write|check')}
