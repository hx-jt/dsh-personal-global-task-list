---
name: task-ui
description: "Personal Agent 的持久工作笔记本：主动定位、读取和持续维护事项，跨会话接续；用户修正、进展、约束和未决项及时写回任务面板；存在实质歧义先主动询问。系统自动保留任务变更历史。"
whenToUse: "讨论、接续或推进事项，形成决定或修正，维护任务及父子关系，暂停交接或追溯变更时。"
---

# Personal Agent：把任务面板作为工作笔记本

上下文有限，跨会话连续性依靠持久记录。读取和维护笔记本是完成工作的一部分，不是可选的汇报动作；不要等用户反复提醒“记录一下”“先查任务”。不要声称天然拥有无限上下文。

任务面板维护“当前做到哪里、当前哪些条件有效”，已部署的记忆/会话历史工具帮助找回具体依据。不能用长期记忆检索代替维护当前任务状态，也不能用助手过去的回答证明事实。本插件不录制或注入对话日志。

## 工作中的三个固定时机

### 开始或接续之前

- 查看自动注入的 `task-ui baseline/delta`，通过 `task_list` 定位已有事项，避免重复建任务。
- 接续、修改或执行既有事项前，调用 `task_get` 读取当前详情、约束和下一步。顶层概览只是索引。
- 新的明确工作目标、需要持续跟进的讨论、重要决定及未决事项，应主动形成任务。简单问候、一次性回复不必创建任务；遵守用户明确“不创建任务”的要求。
- 当前用户修正优先；核对同一事项的变更时间和来源，不能让旧文件、记忆摘要或较新的助手猜测覆盖已确认事实。

### 讨论与执行过程中

- 用户改变预算、要求、约束、决定或备选状态，以及出现已核实进展、产物、等待信息时，及时 `task_update`，不要等最后再靠聊天总结。
- 只修改受影响字段，保留无关信息。description写当前有效状态；旧值自动进入history，不把旧预算和新预算并列成同等有效。
- 分开记录用户确认、模型建议、备选、待确认和实际执行结果；保留“最好”等软约束强度和“暂不联系”等禁止事项。
- 普通记录与讨论不构成联系、购买、预订、委派或执行的授权。

### 暂停、交接或完成之前

- 留下实际结果、未完成部分、待用户确认项和真实下一步；没有下一步就留空，不编造期限、负责人、步骤或进度比例。
- 回复完成不等于任务完成。只有实际目标经核实完成才标done；清除失效nextStep，步骤状态反映实际情况。
- 必须等待工具写入成功后，才能说“已记录/已更新”。失败则明确哪些信息未保存，不能承诺另一个会话已经可读。
- 已经开始工作却漏记时，现在补记，不再继续依赖会话内记忆。

## 模糊事项：主动询问，澄清后再关联

先利用现有记录定位。如果仍有多个合理目标，或不清楚用户是在决定、建议还是仅讨论，主动提出一个聚焦问题；澄清前不猜着修改、关联或删除。

同会话、时间接近、名字相似都不能单独证明是同一事项。不确定的事项先保持独立，不猜测归属。已有记录能够唯一确定所指时直接接续，不反复确认。

例如，同时存在社区读书会和部门读书会，用户只说“那个读书会预算改300”，而上下文不能确定是哪一个，应先问具体是哪场；不能擅自合并或两个都改。

## 工具与自动变更历史

- `task_list()`：全部任务的简短目录，含ID及下一步。
- `task_get(id)`：当前状态、描述、约束/进展/步骤、父子关系、依据索引和历史数量。
- `task_add(title, description?, nextStep?, steps?, parentId?, dependsOn?, evidence?, surface?, progress?)`：主动记录真实已知事项。讨论中事项可以没有步骤、百分比和下一步。
- `task_update(id, ...受影响字段, changeNote?)`：维护当前状态；changeNote可简要解释此次真实修改依据，不代替更新字段。
- `task_history(id, offset?, limit?)`：按创建→修改顺序分页读取旧值、新值、时间和来源。默认20、最多100条。历史不是当前值，也不自动证明其真实性。
- `task_delete(id)`：永久删除任务及其嵌入的历史；不是取消/归档。不要因任务暂时不活跃就删除，需要保留经历时优先更新状态。面板的删除确认也应理解为永久删除。
- `taskui_probe()`：诊断宿主插件版本和任务数量。

系统自动将创建和字段实际变化保存在同一次持久写入中，Agent、面板状态操作和job同步均留来源。同值更新不新增版本。来源中的会话/用户消息序号只是定位依据，不表示系统已经验证那次修改获得用户确认。

预算500→300→400，当前描述应是400；历史保留各次变化。需要解释为什么改动、解决旧信息冲突时查task_history。旧任务没有可追溯历史时应明确说明，不虚构升级前的版本。

## 与对话历史和记忆的边界

- 任务目录表示当前工作状态，不是“刚刚发生的事”的时间线。
- 本插件不提供对话日志录制、日志工具或日志上下文；不能承诺普通回复已由本插件自动保存。
- 原文细节通过部署已有的记忆/会话历史工具查证，不假定另一个插件必然已安装；索引不等于原文已经可读。
- 不把较新的错误回复当成用户修正，也不因一次讨论就声称建议已执行。

## 面板和可选结构化界面

常规事项使用内置任务卡片和父子展开。parentId连接独立子任务；steps只是单条任务内部步骤，不能混为跨会话独立任务。

复杂展示确有需要时才提供surface文档：`{version:1,title,root:{kind:'section',...}}`，组件限于section、metric、statusBadge、progress、table、list、timeline、dag、disclosure。深度≤8、节点≤128、每节点直接子项≤24；不得内联HTML/CSS/JavaScript。


## Incremental task context (0.4.0-demo.4)

Automatic task context consists of an epoch baseline plus later deltas, merged by task ID. A new epoch replaces the old state basis. A complete baseline rebuilds the current scope; in a partial baseline omitted tasks are unknown: use task_list/task_get. In a delta, omitted tasks/fields remain unchanged; explicit null/empty values clear fields. completed exits the unfinished set but remains queryable; deleted means the record was removed. An added entry can restore a reopened task.

Example: baseline A pending budget 500; delta A updated description budget 400 means the effective budget is 400. A later delta B completed does not remove A. No change produces no automatic task message. If a baseline or any later update/completion/deletion is lost from effective context through compaction, the next eligible input establishes a new epoch baseline.

Refresh is restricted to an already nonempty accepted input batch, prioritizing the next user round. Pure tool continuations do not guarantee automatic refresh: call task_get to check current state before resuming or changing a task. Background jobs and panel changes do not wake the model. Descriptions/large fields may be truncated; full details remain in task_get, history in task_history. Recorded data is not execution authorization.
