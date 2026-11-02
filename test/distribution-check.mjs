import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'))
for(const key of ['preinstall','install','postinstall','prepare','prepublish','prepack','postpack']) {
 assert.equal(pkg.scripts?.[key],undefined,`${key} must not run a build in a consumer installation`)
}
for(const file of ['lib/index.js','lib/client.js','cordis.patch.yml','skills/task-ui/SKILL.md']) {
 assert.ok(existsSync(new URL('../'+file,import.meta.url)),`missing prebuilt runtime ${file}`)
 assert.ok(pkg.files.includes(file),`not packed: ${file}`)
}
const ignore=readFileSync(new URL('../.gitignore',import.meta.url),'utf8')
assert.ok(!/^\/?lib\/?$/m.test(ignore),'prebuilt lib must be committed for repository URL installs')
assert.ok(!pkg.version.startsWith('v'))
console.log('DISTRIBUTION_OK: no consumer lifecycle builds; runtime files present and packable')
