## 0.4.0-demo.5

- 修复直接粘贴 GitHub 仓库 URL 安装时，`prepare` 导致的构建授权错误。
- 移除消费者安装构建生命周期，仓库提交预构建宿主、客户端及构建清单；维护者显式构建。
- 增加无依赖的源码/产物哈希、交付文件及生命周期检查，供维护和发布前显式运行。
- 中文 README 同时提供直接仓库 URL 和 Release 预构建包安装；保留旧版 Release。
- 任务运行逻辑与 TCI-15 的受限同步语义不变。

## 0.4.0-demo.4

- Replace aggregate full snapshots with independently sourced, per-session baseline/delta messages, complete-field fingerprinting, explicit completion/deletion and bounded previews/batches.
- Persist pending delivery IDs separately; reconstruct delivered state from effective source history and rebuild epochs after baseline or later delta loss.
- Restricted admission: refresh only when an existing nonempty input batch is accepted. TCI-15 pure tool continuation synchronization remains restricted; task_get is the current-state check. No core changes or background wakeups.
- Update notebook prompts, tools and skill; preserve edited skills and all existing task/history/legacy did data.

# Changelog

Notable changes per release, newest first. The DSH peer range is this package's
compatibility contract: a `0.1.x` release does not install on a `0.2.x` runtime,
and the runtime rejects it before pnpm runs.

## [0.4.0-demo.3] — 2026-10-25

- Remove the built-in did recorder, context contribution, did tools, configuration and recorder-only tests. The task plugin no longer owns conversation logging or automatically associates read/update tool calls with activities.
- Preserve the old task_ui_did domain untouched for backup and migration by a separately installed plugin; do not claim migration has run.
- Make task notebook system instructions, tool descriptions and bundled skill independent of a did or memory plugin. Upgrade unchanged demo.2 skill seeds; preserve customized files.
- Keep task CRUD, parent/child display, history, job sync and task snapshots. Preserve other context providers during assembly and leave did tool names available for an independent plugin.
- Add real Cordis/JSON regression coverage for task-only activation, legacy profile keys/data, skill upgrades, external context/tool ownership and reload persistence. No DSH core changes.

## [0.4.0-demo.2] — 2026-10-21

- Strengthen Personal Agent persistent-notebook behavior across system prompt, task tool descriptions and bundled skill: read before resuming, maintain during work, hand off truthfully and confirm only after successful writes.
- Ask for clarification before ambiguous association or state changes; keep unassigned did records separate and continue directly when uniquely identified.
- Atomically retain task creation/field changes with old/new values, timestamp and agent/panel/job source. Use storage-domain atomic updates for current+history; same-value writes do not add revisions.
- Add task_history paging and collapsed, localized history display; keep historical values out of current-state context.
- Preserve legacy records with no fabricated past history and migrate unchanged prior plugin skill seeds. Add real JSON persistence, concurrency and render coverage. No DSH core or Git changes.

## [0.4.0-demo.1] — 2026-10-21

- Add independent durable did ledger populated by master-agent turn/session events, without model logging calls or extra summarization requests.
- Inject recent activity (default72 hours plus unsettled turns) and persistent unfinished-task headings. Time-window expiry does not delete history or hide old unfinished tasks.
- Add paged did_list, did_get and optional did_note; preserve source event references and distinguish reply settlement from task success.
- Retain failed writes for retry and report unavailable storage; correct task snapshot generation caching across concurrent writes.
- Add parent/child expand/collapse and tests for orphan/cyclic task relations.
- Add real SessionStore/storage-domain restart integration on temporary JSON storage. Complex recovery, delegation and live model verification remain outside this demo.

## [0.3.0] — 2026-10-16

Personal Agent 首版：新会话开场自动注入完整任务库快照（依据 2026-10-16 开发交接手册）。

### Added

- **开场任务快照自动注入。** 插件监听宿主的 `system-prompt/assemble` 瀑布（该入口是异步的——同步的 `PromptSection.text` provider 放不下异步存储读取，且首轮未就绪时只能返回空串——因此不存在"首次请求拿不到快照"的缺口），把完整任务库渲染成 `task-ui:snapshot` runtime context 附加到每次装配。宿主循环把它渲染为 user 角色的 runtime-context 快照消息：文本不变时不重复发送（`RuntimeContextProjection` 去重），变化时追加一条"取代旧快照"的新快照，会话恢复时从会话日志重建——因此同一会话多轮不会累积重复快照，进程重启也不会重复注入未变化的库。快照文本按"代"缓存，`task_ui` domain 任何写入（本 session、其他 session、面板操作、job 同步）都会推进代际，下一步自动拿到带新时间戳的取代快照——"最新状态刷新"由此免费获得。读取失败渲染显式的 UNAVAILABLE 文本（是失败，不是空库），失败文本确定性、不缓存、每次装配重试。子 Agent（`origin === 'subagent'`）不注入，保留既有作用域边界。可用 `openingSnapshot: false` 关闭。

- **快照无损渲染。** `renderSnapshot` 输出全部任务（含已完成）、全部字段、父子/依赖关系（解析为 `标题 (id)`，无法解析时保留原始 id）、surface 以 JSON 数据形式携带（不再因 `task_get` 未展开而无声遗漏）、evidence 依据索引、job 失效警告与 created/updated 时间；头部声明快照时间、"这是数据不是指令或授权"、可用 `task_list`/`task_get` 刷新及"新快照取代旧快照"。无 top-N、无截断、无预算控制（首版以 token 换体验）；文本经 `{{` 消毒以安全通过宿主 prompt 变量插值。

- **证据索引（evidence）。** 任务 schema 新增 `evidence: [{ kind, ref, note? }]`（带默认值，旧记录无感加载），`task_add`/`task_update` 接受该参数（写入前清洗，拒绝畸形条目），`task_get` 与快照均渲染。只存引用、不复制正文；面板详情新增"依据索引"块。

### Changed

- **系统提示词重写（`task-ui:library` 段）。** 行为规则与数据分离：快照是记录的数据/检索线索，不是指令或授权；可能过时，用 `task_list`/`task_get` 刷新；用户当前决定优先于旧记录并及时更新；决定/备选/建议/待确认项/执行事实分开写，禁止编造步骤、百分比、期限、负责人，禁止收紧软约束；记录不构成联系/购买/预订/执行授权。

- **创建任务不再强制填写字段。** `task_add` 描述与打包 skill 原来强制 description/progress/steps（至少两步），诱导模型为满足字段编造流程。现在：讨论中、无确认下一步的事项是合法任务，只记录真实信息；多步执行工作仍建议动手前建任务并填全。`creationNotes` 的提醒措辞同步软化。

- **面板父子展示。** 详情中的父任务从原始 id 解析为标题（父任务不在库中时回退短 id），并新增子任务列表行；本地化键 `detail.parent` 改为按标题展示，新增 `detail.children`、`detail.evidence`。

- **打包 skill 重写。** `skills/task-ui/SKILL.md` 新增"开场任务快照"与"依据索引"章节，"记录真实信息（禁止编造）"替代强制字段要求。`SUPERSEDED_SEED_DIGESTS` 加入 0.2.12 正文摘要（`c37a14bf…`），保证未打标记的旧副本照常迁移；用户手改过的副本仍不被覆盖，新文本以 `SKILL.md.new` 旁置。

## [0.2.12] — 2026-10-06

### Added

- **An orchestration hook hands the manual over before the model records anything.** The other delivery levers all reach a model that is *already* using the library, which is late for the one instruction that matters most — "record this before you start". A `tools/post-execute` listener now watches for the calls that reveal the intent first: `todo_write` (it decided the work needs tracking), any `subagent*` spawn (it is delegating), `workflow`, `ralph`. The first one in a session attaches the manual to that call through `additionalContexts` — the harness's own channel for attaching context to a request — so the called tool's result is left exactly as its owner wrote it.

  The injected message declares this plugin's own `MessageSourceMap` kind, per the harness's rule that each producer declares its own rather than sharing a catch-all, and `form: 'instructions'` — the semantic vocabulary's term for instructions read out of a file, which is what the bundled skill is. Both delivery channels share one once-per-session set, so exactly one wins and the manual is never sent twice.

## [0.2.11] — 2026-10-05

### Added

- **The plugin now says which build it is.** `taskui_probe` answers `[task-ui] v<version> host alive, tasks=N`, and startup logs `[task-ui] host plugin loaded v<version>`. Neither was answerable before, which turned "the marketplace showed 2.10 but I got 2.3" into guesswork: a marketplace displays the version a registry reports while the install is a package-manager run that can resolve differently — an exact pin, a lockfile entry, or a registry asked in turn — and nothing reconciles the two.

### Changed

- README: "Pin at least 0.2.0" became "use at least 0.2.0", plus a short section on why the displayed and installed versions can disagree and how to make an update land (name the version explicitly; depend on a range rather than an exact pin). An exact pin keeps installing its version no matter what a marketplace shows, and DSH's plugin manager falls back to `registry.npmmirror.com` when the first registry cannot answer, mirror lag included.

## [0.2.10] — 2026-10-01

### Fixed

- **Installs seeded before the marker now migrate too.** 0.2.9 adopted an unstamped copy only when its body already matched the current text — which covers a recent install, but not the users a fix most needs to reach: a copy that predates the marker *and* is several releases old looked exactly like one somebody had edited by hand, so it was left alone with a `SKILL.md.new` beside it and stayed on its old manual.

  The package now carries the sha256 of every body it has ever shipped in this file, taken from its own history — 0.1.1–0.1.5 (6,762 bytes), 0.2.0 (10,904) and 0.2.2 (11,325). An unstamped copy matching one of them is provably ours and unmodified, so it is brought forward. Digests are compared over LF-normalised text, so a copy whose line endings a tool changed still matches. Only a copy matching nothing — the user's own — is left untouched with the new text beside it.

## [0.2.9] — 2026-10-01

### Fixed

- **Migration onto the marked seed is now automatic.** 0.2.8 introduced the marker, but an existing unstamped copy — which is every install that predates it — fell into the "possibly edited" branch: left alone, with `SKILL.md.new` beside it. Safe, but noisy for the common case of a file nobody has touched, and it left those installs unable to update themselves. An unstamped copy whose body already equals this package's text is now **adopted**: only the marker line is written, no instruction text changes, and it updates in place from then on. A copy that genuinely differs is still left untouched with the newer text alongside.

## [0.2.8] — 2026-10-01

### Fixed

- **An upgraded plugin no longer serves a stale skill.** The bundled `task-ui` skill was seeded into `<dshHome>/skills/` **once** and never again, so after an upgrade the model kept being handed whatever manual the version that first ran had written — while the plugin believed it had shipped a new one. The seeded file now carries a marker recording the version and a sha256 of its body, and each activation: refreshes a copy nobody has edited, leaves a copy with no valid marker (hand-edited, or seeded before markers existed) exactly as it is with this version's text written beside it as `SKILL.md.new` and a log line naming both paths, and does nothing when the copy is already current. Fail-soft as before, and never silent about a clobber it declined to make.

### Changed

- `test/host-smoke.mjs` points `$DSH_HOME` at a throwaway directory, so running the suite no longer writes to the developer's real skill root. It covers all three seeding paths: seed when absent, refresh when untouched, leave-and-offer when edited.

## [0.2.7] — 2026-10-01

### Added

- **The library hands its operator manual to the session that starts using it.** The bundled `task-ui` skill stays model-invoked for every other purpose, but a model that never calls the `skill` tool never reads it — and the moment it decides to use the library is exactly when it needs to know how. The skill's body is now attached to the result of the first `task_*` call of a session, once per session.

  A tool result is the right vehicle for three reasons. It lands in the **same turn** — a system-prompt section or a dynamic context could only take effect on the next request, one step after the decision it is meant to inform. It costs nothing in sessions that never touch the library. And it appends to the conversation instead of changing the prompt, so the cached prefix is untouched.

  The body is read from this package's own bundled copy rather than through `ctx.skills`: this plugin runs on the host plane while skill providers mount per agent preset, so a host lookup can miss the catalog a session actually sees. Front matter is stripped, and the delivered text stays under the tool-result pruner's threshold.

## [0.2.6] — 2026-10-01

### Added

- **Just-in-time notes in tool results.** `task_add` now names the fields a title-only entry is missing, and `task_update` on a task that just became `done` names the specific gaps in the finished record: a `nextStep` still set, steps not marked `done`, an empty `description`. They are derived from the record they just wrote — they restate no rule and repeat no guidance — so they say nothing while the record is right and cost nothing until something is wrong, and they land at the moment it can still be fixed. A tool result is appended to the conversation, so unlike a section it never touches the cached prompt prefix.

### Changed

- The completion form moved into the always-on layer. `task_update`'s description now says to clear `nextStep`, leave `steps` all `done`, and write the outcome into `description` — because that rule was reachable only by loading the skill, and a model that never loads the skill is exactly who leaves the record half-finished. (`host-smoke` asserts all three clauses, so a rewording cannot silently drop them.)

## [0.2.5] — 2026-10-01

### Changed

- **The skip boundary is now a shape test, not a length test.** Both the always-on prompt section and the `task_add` description said to skip "trivial single-step requests" / "one-shot answers", and a repository analysis walks straight through that: "analyze X" is one exchange producing one deliverable, so skipping it was a *defensible* reading of the rule. That is how a user's "给你一个任务：分析 `<repo>`" produced no entry — the rule, not the model, was wrong.

  The boundary now names the shapes that count — analyze / investigate / compare / implement / review, and anything the user calls a task — and keeps exactly one exemption: a reply you can give without looking anything up. It also states that a late entry beats no entry, because "before you start" is the moment a model is least likely to pause.

  The bundled skill states the same boundary and records the case that motivated it, so the three surfaces that carry the obligation (section, tool description, skill) agree.

## [0.2.4] — 2026-09-30

### Fixed

- **A reload that collided with the previous instance could still take the app down.** 0.2.3 made the storage-domain open survive `already-open`, but the same window produces other collisions of the same kind: `WebServer.register` throws on a duplicate `(kind, path)` — the host reports it as `webserver: duplicate prefix route "/task-ui"` — and `Tools.register` fails on a duplicate name within one layer. The crash log says what a synchronous throw out of `apply()` means: `dsh: fatal load failure`, and the application exits.

  Every scope-global registration the plugin makes — the two HTTP routes, the prompt section, and all six tools — is now acquired through one tolerant path. It retries that class of failure (the storage facility's `already-open`, or the web server's duplicate-route error) with a short backoff, and each disposer is owned by the plugin's own `ctx.effect`, which is what actually releases the name. When a resource never frees, the plugin logs it and stays loaded but degraded: a panel without its HTTP API is a far better outcome than an application that will not start.

- Live SSE streams are ended when the plugin is disposed, so a browser's `EventSource` is not left waiting on a channel that nothing will ever write to.

### Added

- `test/host-smoke.mjs` drives the collision path directly: with two injected duplicate-route throws, both routes must still be acquired, and disposing the plugin must free the prefix route.

## [0.2.3] — 2026-09-30

### Fixed

- **Toggling the plugin off could crash the whole application.** `apply()` opened the `task_ui` storage domain and never handled a rejection, so a `DomainError` carrying `already-open` escaped as an unhandled promise rejection — which the host treats as fatal, taking the app down mid-reload. `already-open` is documented as *transient* ("the name is open or still closing"), and this path produces it by construction: a host reloads plugins without awaiting the previous instance's disposal, so the next `apply()` runs while the old domain is still tearing down.

  Both halves of the fix are needed. The handle is now closed from the plugin's own `ctx.effect` disposer — `DomainFacility.open` documents that the caller owns the handle, and relying on the facility's asynchronous unmount fallback is what left the name reserved for the next `apply()` to collide with. The open itself retries that one code with a bounded backoff, because a transient failure deserves a retry rather than a hard failure. Any rejection is also observed, so nothing can reach the host as an unhandled rejection.

### Added

- `test/bundle-css-check.mjs` — verifies the *built* client bundle is internally consistent: every class in its exported map has a rule in the CSS text that bundle injects. The source-level class check cannot see a build that drops or renames a rule.

## [0.2.2] — 2026-09-30

### Changed

- **`skills/task-ui/SKILL.md`** — the completion form now keeps the step flow and
  marks it `done`, instead of sending `steps: []`. Clearing it discarded the one
  thing a later reader most wants — the sequence of what was actually done — and
  made the panel's detail degrade to a single derived node; only `nextStep` is
  cleared on completion. This reaches **fresh installs only**: the Host seeds the
  skill into `<dshHome>/skills/` once and never overwrites it, so an existing
  deployment keeps whatever it already has.
- **README** — the absence of a session/provenance field is now documented as a
  deliberate design decision (tasks are session-independent, so a handoff needs
  current state and the next action, not the origin) rather than as a gap. The
  blocked-reason item stays, on its own.

## [0.2.1] — 2026-09-30

### Added

- **`task_get(id)`** — reads one task in full: description, progress, the whole
  step flow, next step, dependencies, linked job and timestamps, ordered the way
  a session picking up someone else's work needs it. The durable record carried
  far more than `task_list` printed, and a later session had no way to reach it.
- **`task_list` triage clause** — each line gains `— next: ...`, so filtering
  shows what every task does next while the detail stays in `task_get`.
- **`steps` and `nextStep`** on the record, with the flow's states (`done` /
  `current` / `next` / `todo`) validated at the zod boundary on write.
- **Step flow in the detail card** — progress is drawn as a vertical flow rather
  than a bar: finished and pending steps share the plain frame, `current` gets a
  solid brand frame with a faint tint, `next` a dashed one. A flow the owner
  never wrote falls back to `progress` + `nextStep`, and says so on screen.
- **Unprompted use** — a registered system-prompt section plus rewritten tool
  descriptions. The descriptions carry the when-and-how (the shape DSH uses for
  its own `todo_write`); the section is the always-on nudge, covering record /
  keep current / read back / skip trivial, and renders a shorter variant for
  subagents, which are told only to keep their own task's record true.
- **Expired job links** — a `running` task whose job predates the current process
  is flagged in `task_list` (`[expired]`), in `task_get` (a `warning:` line
  before the actionable state) and in the panel (warn-coloured job line). The job
  registry is in-process, so after a restart those links cannot be alive; the
  record is annotated rather than rewritten, because the plugin cannot know
  whether the work finished, was abandoned, or went unrecorded.
- **Panel motion** — new tasks rise in while the bottom-anchored panel slides up
  by the height it gained; a deleted card holds its slot through its exit
  animation.
- **Resizable panel** — drag the left edge (or focus it and use ←/→) for
  260–760px, remembered in `localStorage`.

### Changed

- Tool descriptions now state each tool's purpose, the moment to act, and its
  boundary, and the bundled skill keeps the detailed workflow.
- `config.promptSection` (default `true`) drops just the prompt section, for a
  deployment that would rather rely on the tool descriptions alone.

### Fixed

- Deleting a task made the whole list flash and the panel run a
  shrink/grow/shrink cycle: the removed row is re-adopted as a ghost inside a
  *layout* effect, so it never leaves the DOM for a painted frame.
- The panel could vanish entirely — a `ReferenceError` in the motion effect's
  dependency array. DSH isolates each slot entry, so a component that throws
  renders nothing while the rest of the UI stays healthy.

### Build

- `npm test`: `tsc --noEmit` against the published `0.2.0-rc.2` type packages
  (dev-only, pinned exactly, never shipped) plus host-smoke, client-smoke,
  render and CSS-class checks. The typecheck found a real latent bug on its
  first run; tsdown alone never type-checks.

## [0.2.0] — 2026-09-30

### Added

- Support for `0.2.x` DSH runtimes alongside `0.1.x`; peer ranges widened to
  `^0.1.5-rc.2 || ^0.2.0-rc.2`.

### Changed

- Job-status sync is version-adaptive: `jobs.events.subscribe({ owners: 'all' },
  …)` on 0.2, `jobs.onJobsChanged` on 0.1. A runtime with neither logs a line and
  disables only the bridge, keeping the tools, the panel and the HTTP API.

### Fixed

- `installation rejected: Plugin dsh-global-task-list@0.1.5 is incompatible with
  dsh 0.2.0-rc.2` — caused by peer ranges that excluded the running runtime.
- Agent-origin detection read `session.header.origin` instead of the always-
  undefined `header.meta?.origin`, which made every agent look like a master.

## [0.1.5] — 2026-09-11

### Fixed

- Ported the client bundle to the `0.1.5` client module table (`defineStore`),
  which earlier hosts do not expose; before this the panel failed to load with
  `Failed to load plugins`.

## [0.1.4] — 2026-08-22

### Added

- The bundled `task-ui` skill is seeded into the user skill root on first
  activation (and never overwritten afterwards).

### Fixed

- The panel refreshes on task changes from any session.

## [0.1.3] — 2026-08-22

### Changed

- Documented the exact `allowBuilds` key a pnpm GitHub install requires.

## [0.1.2] — 2026-08-22

### Added

- Host half migrated to TypeScript (`src/index.ts`) with its own build.
- The panel hides off the conversation view, and its header stays visible while
  the list scrolls.

### Fixed

- Session-scoped inject signature (`sessionId, actions`) — the panel previously
  showed 0 tasks.

## [0.1.1] — 2026-08-14

Initial release: a cross-session global task library, a floating panel with
status/delete/split controls, subagent job-status sync, and the generative-UI
`surface` renderer.

[0.2.12]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.11...v0.2.12
[0.2.11]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.10...v0.2.11
[0.2.10]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.9...v0.2.10
[0.2.9]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.8...v0.2.9
[0.2.8]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.7...v0.2.8
[0.2.7]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.1.5...v0.2.0
[0.1.5]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/sgzxs/dsh-global-task-list/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/sgzxs/dsh-global-task-list/releases/tag/v0.1.1
