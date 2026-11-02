window.__ModuleLoader__.load({
	id: "@hx-jt/dsh-personal-global-task-list",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		//#region \0dsh-css:/Users/yasirhuang/Documents/work/cmri/项目/DSH/coding/dsh-global-task-list-main/src/client/TaskUiPanel.module.css.mjs
		const css = ".PAwdXG_root{--task-status-pending:var(--dsw-alias-state-idle-primary);--task-status-running:var(--dsw-alias-brand-primary);--task-status-done:var(--dsw-alias-state-success-primary);--task-status-blocked:var(--dsw-alias-state-warn-primary);--task-status-failed:var(--dsw-alias-state-error-primary);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);box-sizing:border-box;border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1);width:360px;max-width:calc(100vw - 32px);max-height:70vh;color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);z-index:100;border:0;flex-direction:column;gap:10px;padding:14px 16px;display:flex;position:fixed;bottom:16px;right:16px;overflow:hidden}.PAwdXG_resizer{cursor:col-resize;touch-action:none;z-index:1;width:8px;position:absolute;top:0;bottom:0;left:0}.PAwdXG_resizer:after{content:\"\";corner-shape:round;background:var(--dsw-alias-border-l2);opacity:0;width:3px;height:28px;transition:opacity var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:999px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.PAwdXG_root:hover .PAwdXG_resizer:after,.PAwdXG_resizer:focus-visible:after,.PAwdXG_root[data-resizing=true] .PAwdXG_resizer:after{opacity:1}.PAwdXG_resizer:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px;border-radius:var(--dsw-radius-sm)}.PAwdXG_root[data-resizing=true]{user-select:none}.PAwdXG_mini{--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent);corner-shape:round;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);z-index:100;border:0;border-radius:999px;align-items:center;gap:6px;padding:8px 12px;display:inline-flex;position:fixed;bottom:16px;right:16px}.PAwdXG_mini:hover{background:var(--dsw-alias-interactive-bg-hover)}.PAwdXG_miniDot{corner-shape:round;background:var(--task-status-running);border-radius:50%;flex:none;width:8px;height:8px}.PAwdXG_header{flex:none;align-items:baseline;gap:10px;display:flex}.PAwdXG_body{flex-direction:column;flex:auto;gap:10px;min-height:0;display:flex;overflow-y:auto}.PAwdXG_title{font:var(--dsw-font-s-strong-14);color:var(--dsw-alias-label-primary)}.PAwdXG_summary{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-secondary)}.PAwdXG_collapseButton{border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xxxs-11);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;margin-left:auto;padding:3px 8px}.PAwdXG_collapseButton:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.PAwdXG_errorBanner{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 60%, transparent);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);font:var(--dsw-font-xxs-12);flex:none;padding:6px 10px}.PAwdXG_empty{color:var(--dsw-alias-label-tertiary);font:var(--dsw-font-xxs-12);padding:8px 0}.PAwdXG_list{flex-direction:column;gap:8px;margin:0;padding:0;list-style:none;display:flex}.PAwdXG_card{border:1px solid var(--dsw-alias-settings-card-stroke);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-settings-card-fill);cursor:pointer;transition:border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), background var(--ds-transition-duration-fast) var(--ds-ease-in-out);flex-direction:column;gap:6px;padding:8px 10px;display:flex}.PAwdXG_card:hover{border-color:var(--dsw-alias-border-l2)}.PAwdXG_card[data-enter=true]{animation:PAwdXG_dsh-task-rise var(--ds-transition-duration) var(--ds-ease-in-out)}.PAwdXG_card[data-exit=true]{pointer-events:none;animation:PAwdXG_dsh-task-fall var(--ds-transition-duration-fast) var(--ds-ease-in-out) forwards}@keyframes PAwdXG_dsh-task-rise{0%{opacity:0;transform:translateY(12px)scale(.98)}to{opacity:1;transform:none}}@keyframes PAwdXG_dsh-task-fall{to{opacity:0;transform:translateY(8px)scale(.98)}}@keyframes PAwdXG_dsh-task-fade-out{to{opacity:0}}.PAwdXG_cardHeader{align-items:center;gap:8px;display:flex}.PAwdXG_expandButton{border-radius:var(--dsw-radius-xs);width:18px;height:18px;color:var(--dsw-alias-label-tertiary);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:0;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.PAwdXG_expandButton:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.PAwdXG_chevron{width:6px;height:6px;transition:transform var(--ds-transition-duration) var(--ds-ease-in-out);border-bottom:1.5px solid;border-right:1.5px solid;transform:translateY(-1px)rotate(45deg)}.PAwdXG_card[data-expanded=true] .PAwdXG_chevron{transform:translateY(1px)rotate(-135deg)}.PAwdXG_dot{corner-shape:round;background:var(--dsw-alias-label-tertiary);border-radius:50%;flex:none;width:8px;height:8px}.PAwdXG_dotPending{background:var(--task-status-pending)}.PAwdXG_dotRunning{background:var(--task-status-running)}.PAwdXG_dotDone{background:var(--task-status-done)}.PAwdXG_dotBlocked{background:var(--task-status-blocked)}.PAwdXG_dotFailed{background:var(--task-status-failed)}.PAwdXG_dotNeutral{background:var(--dsw-alias-label-tertiary)}.PAwdXG_taskTitle{min-width:0;font:var(--dsw-font-xs-strong-13);color:var(--dsw-alias-label-primary);overflow-wrap:anywhere;flex:1}.PAwdXG_jobLine{font-family:var(--ds-font-family-code);font-size:var(--dsw-font-xxxs-11-font-size);line-height:var(--dsw-font-xxxs-11-line-height);color:var(--dsw-alias-label-tertiary)}.PAwdXG_jobLineStale{font-family:var(--ds-font-family-code);font-size:var(--dsw-font-xxxs-11-font-size);line-height:var(--dsw-font-xxxs-11-line-height);color:var(--dsw-alias-state-warn-primary)}.PAwdXG_controls{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.PAwdXG_statusButton,.PAwdXG_deleteButton,.PAwdXG_splitButton{border-radius:var(--dsw-radius-sm);font:var(--dsw-font-xxxs-11);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), color var(--ds-transition-duration-fast) var(--ds-ease-in-out);padding:3px 8px}.PAwdXG_statusButton{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.PAwdXG_statusButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.PAwdXG_statusButton[data-active=true]{cursor:default;font-weight:500}.PAwdXG_statusButton[data-status=pending][data-active=true]{color:var(--task-status-pending);border-color:var(--task-status-pending);background:color-mix(in srgb, var(--task-status-pending) 16%, transparent)}.PAwdXG_statusButton[data-status=running][data-active=true]{color:var(--task-status-running);border-color:var(--task-status-running);background:color-mix(in srgb, var(--task-status-running) 16%, transparent)}.PAwdXG_statusButton[data-status=done][data-active=true]{color:var(--task-status-done);border-color:var(--task-status-done);background:color-mix(in srgb, var(--task-status-done) 16%, transparent)}.PAwdXG_statusButton[data-status=blocked][data-active=true]{color:var(--task-status-blocked);border-color:var(--task-status-blocked);background:color-mix(in srgb, var(--task-status-blocked) 16%, transparent)}.PAwdXG_deleteButton{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 60%, transparent);color:var(--dsw-alias-state-error-primary);background:0 0}.PAwdXG_deleteButton:hover{background:var(--dsw-alias-interactive-bg-hover-danger)}.PAwdXG_deleteButton[data-confirming=true]{border-color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.PAwdXG_splitButton{border:1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 60%, transparent);color:var(--dsw-alias-brand-primary);background:0 0;margin-left:auto}.PAwdXG_splitButton:hover{background:var(--dsw-alias-interactive-bg-hover)}.PAwdXG_surface{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:6px;margin-top:2px;padding-top:8px;display:flex}.PAwdXG_surfaceSection{flex-direction:column;gap:6px;display:flex}.PAwdXG_sectionTitle{font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-secondary)}.PAwdXG_metricRow{flex-wrap:wrap;align-items:baseline;gap:8px;display:flex}.PAwdXG_metricLabel{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-secondary)}.PAwdXG_metricValue{font:var(--dsw-font-xs-strong-13);color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}.PAwdXG_metricUnit{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-tertiary);margin-left:2px}.PAwdXG_metricTrend{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}.PAwdXG_badge{corner-shape:round;font:var(--dsw-font-xxxs-11);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0;border-radius:999px;align-self:flex-start;align-items:center;padding:1px 8px;display:inline-flex}.PAwdXG_badgeNeutral{color:var(--dsw-alias-label-tertiary);border-color:var(--dsw-alias-border-l2)}.PAwdXG_badgeSuccess{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 60%, transparent)}.PAwdXG_badgeWarn{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 60%, transparent)}.PAwdXG_badgeError{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 60%, transparent)}.PAwdXG_badgeBrand{color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb, var(--dsw-alias-brand-primary) 60%, transparent)}.PAwdXG_progressRow{flex-direction:column;gap:4px;display:flex}.PAwdXG_progressLabel{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-secondary)}.PAwdXG_progressTrack{corner-shape:round;background:var(--dsw-alias-interactive-bg-hover);border-radius:999px;height:6px;overflow:hidden}.PAwdXG_progressFill{corner-shape:round;background:var(--dsw-alias-brand-primary);border-radius:999px;height:100%}.PAwdXG_table{border-collapse:collapse;width:100%;font:var(--dsw-font-xxs-12)}.PAwdXG_tableCell{border:1px solid var(--dsw-alias-border-l2);text-align:left;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;padding:4px 8px}.PAwdXG_surfaceList{flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;display:flex}.PAwdXG_listItem{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-primary)}.PAwdXG_timeline{flex-direction:column;gap:6px;margin:0;padding:0;list-style:none;display:flex}.PAwdXG_timelineEvent{border-left:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:1px;padding-left:10px;display:flex}.PAwdXG_eventTime{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}.PAwdXG_eventTitle{font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-primary)}.PAwdXG_eventDetail{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-secondary)}.PAwdXG_dag{flex-direction:column;gap:6px;display:flex}.PAwdXG_dagNodes{flex-wrap:wrap;gap:6px;display:flex}.PAwdXG_dagNode{border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm);font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-primary);align-items:center;gap:6px;padding:2px 8px;display:inline-flex}.PAwdXG_dagNodeDot{corner-shape:round;border-radius:50%;flex:none;width:6px;height:6px}.PAwdXG_dagEdges{flex-direction:column;gap:2px;display:flex}.PAwdXG_dagEdge{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}.PAwdXG_disclosure{flex-direction:column;gap:4px;display:flex}.PAwdXG_disclosureTitle{font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-secondary);cursor:pointer}.PAwdXG_disclosure[open] .PAwdXG_disclosureTitle{color:var(--dsw-alias-label-primary)}.PAwdXG_detailWrap{transition:grid-template-rows var(--ds-transition-duration) var(--ds-ease-in-out);grid-template-rows:0fr;display:grid}.PAwdXG_card[data-expanded=true] .PAwdXG_detailWrap{grid-template-rows:1fr}.PAwdXG_detail{visibility:hidden;min-height:0;transition:visibility 0s linear var(--ds-transition-duration);overflow:hidden}.PAwdXG_card[data-expanded=true] .PAwdXG_detail{visibility:visible;transition:visibility}.PAwdXG_detailBlock{flex-direction:column;gap:3px;padding-top:8px;display:flex}.PAwdXG_detailBlock:first-child{border-top:1px solid var(--dsw-alias-border-l2);margin-top:2px;padding-top:10px}.PAwdXG_detailLabel{font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-tertiary)}.PAwdXG_detailText{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}.PAwdXG_detailUnset{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-tertiary);font-style:italic}.PAwdXG_flowHeader{align-items:baseline;gap:8px;display:flex}.PAwdXG_flow{flex-direction:column;margin:0;padding:2px 0 0;list-style:none;display:flex}.PAwdXG_flowStep{grid-template-columns:14px minmax(0,1fr);gap:8px;padding-bottom:6px;display:grid;position:relative}.PAwdXG_flowStep:not(:last-child):before{content:\"\";background:var(--dsw-alias-border-l2);width:1px;position:absolute;top:15px;bottom:-1px;left:6px}.PAwdXG_flowMarker{z-index:1;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);corner-shape:round;background:var(--dsw-alias-settings-card-fill);width:13px;height:13px;color:var(--dsw-alias-label-tertiary);border-radius:50%;justify-content:center;align-items:center;margin-top:2px;font-size:8px;line-height:1;display:flex;position:relative}.PAwdXG_flowBox{border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm);min-width:0;font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;background:0 0;padding:4px 8px}.PAwdXG_flowStep[data-state=current] .PAwdXG_flowBox{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-primary)}.PAwdXG_flowStep[data-state=current] .PAwdXG_flowMarker{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-inverted)}.PAwdXG_flowStep[data-state=next] .PAwdXG_flowBox{border-style:dashed;border-color:var(--dsw-alias-border-l3);font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-primary)}.PAwdXG_flowStep[data-state=next] .PAwdXG_flowMarker{border-style:dashed;border-color:var(--dsw-alias-label-secondary);color:var(--dsw-alias-label-secondary)}.PAwdXG_flowStep[data-state=done] .PAwdXG_flowMarker{border-color:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}.PAwdXG_srOnly{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.PAwdXG_detailNote{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-tertiary);padding-top:4px;font-style:italic}.PAwdXG_detailPercent{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;flex:none}.PAwdXG_detailMeta{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;overflow-wrap:anywhere;padding-top:6px}@media (prefers-reduced-motion:reduce){.PAwdXG_statusButton,.PAwdXG_deleteButton,.PAwdXG_splitButton,.PAwdXG_collapseButton,.PAwdXG_expandButton,.PAwdXG_chevron,.PAwdXG_mini,.PAwdXG_card,.PAwdXG_detailWrap,.PAwdXG_detail,.PAwdXG_resizer:after{transition:none}.PAwdXG_card[data-enter=true]{animation:none}.PAwdXG_card[data-exit=true]{animation:PAwdXG_dsh-task-fade-out var(--ds-transition-duration-fast) linear forwards}}.PAwdXG_childCount{color:var(--dsw-alias-label-secondary);font-size:var(--dsw-font-xxxs-11-font-size);white-space:nowrap}.PAwdXG_historyDisclosure{padding-top:8px}.PAwdXG_historySummary{font:var(--dsw-font-xxs-strong-12);color:var(--dsw-alias-label-tertiary);cursor:pointer;font-weight:600}.PAwdXG_historyEntry{border-top:1px solid var(--dsw-alias-border-l2);overflow-wrap:anywhere;margin-top:10px;padding-top:8px}";
		const tagId = "@hx-jt/dsh-personal-global-task-list/TaskUiPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@hx-jt/dsh-personal-global-task-list";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var TaskUiPanel_module_css_default = {
			"timelineEvent": "PAwdXG_timelineEvent",
			"flowBox": "PAwdXG_flowBox",
			"timeline": "PAwdXG_timeline",
			"childCount": "PAwdXG_childCount",
			"detailMeta": "PAwdXG_detailMeta",
			"surface": "PAwdXG_surface",
			"surfaceSection": "PAwdXG_surfaceSection",
			"eventTitle": "PAwdXG_eventTitle",
			"eventTime": "PAwdXG_eventTime",
			"detailUnset": "PAwdXG_detailUnset",
			"badgeError": "PAwdXG_badgeError",
			"card": "PAwdXG_card",
			"dsh-task-rise": "PAwdXG_dsh-task-rise",
			"dotDone": "PAwdXG_dotDone",
			"srOnly": "PAwdXG_srOnly",
			"taskTitle": "PAwdXG_taskTitle",
			"metricValue": "PAwdXG_metricValue",
			"cardHeader": "PAwdXG_cardHeader",
			"jobLine": "PAwdXG_jobLine",
			"dot": "PAwdXG_dot",
			"progressTrack": "PAwdXG_progressTrack",
			"header": "PAwdXG_header",
			"table": "PAwdXG_table",
			"flowHeader": "PAwdXG_flowHeader",
			"historySummary": "PAwdXG_historySummary",
			"disclosure": "PAwdXG_disclosure",
			"splitButton": "PAwdXG_splitButton",
			"badge": "PAwdXG_badge",
			"summary": "PAwdXG_summary",
			"chevron": "PAwdXG_chevron",
			"dotPending": "PAwdXG_dotPending",
			"detailText": "PAwdXG_detailText",
			"body": "PAwdXG_body",
			"mini": "PAwdXG_mini",
			"controls": "PAwdXG_controls",
			"historyEntry": "PAwdXG_historyEntry",
			"metricTrend": "PAwdXG_metricTrend",
			"progressLabel": "PAwdXG_progressLabel",
			"dagEdges": "PAwdXG_dagEdges",
			"badgeWarn": "PAwdXG_badgeWarn",
			"jobLineStale": "PAwdXG_jobLineStale",
			"detailNote": "PAwdXG_detailNote",
			"badgeBrand": "PAwdXG_badgeBrand",
			"sectionTitle": "PAwdXG_sectionTitle",
			"badgeNeutral": "PAwdXG_badgeNeutral",
			"dotNeutral": "PAwdXG_dotNeutral",
			"flowMarker": "PAwdXG_flowMarker",
			"root": "PAwdXG_root",
			"dagNodes": "PAwdXG_dagNodes",
			"detailBlock": "PAwdXG_detailBlock",
			"flowStep": "PAwdXG_flowStep",
			"title": "PAwdXG_title",
			"dsh-task-fall": "PAwdXG_dsh-task-fall",
			"detail": "PAwdXG_detail",
			"list": "PAwdXG_list",
			"metricUnit": "PAwdXG_metricUnit",
			"detailLabel": "PAwdXG_detailLabel",
			"progressFill": "PAwdXG_progressFill",
			"dotRunning": "PAwdXG_dotRunning",
			"badgeSuccess": "PAwdXG_badgeSuccess",
			"eventDetail": "PAwdXG_eventDetail",
			"deleteButton": "PAwdXG_deleteButton",
			"miniDot": "PAwdXG_miniDot",
			"dagNodeDot": "PAwdXG_dagNodeDot",
			"detailWrap": "PAwdXG_detailWrap",
			"flow": "PAwdXG_flow",
			"dotBlocked": "PAwdXG_dotBlocked",
			"tableCell": "PAwdXG_tableCell",
			"dag": "PAwdXG_dag",
			"dagEdge": "PAwdXG_dagEdge",
			"historyDisclosure": "PAwdXG_historyDisclosure",
			"metricLabel": "PAwdXG_metricLabel",
			"dsh-task-fade-out": "PAwdXG_dsh-task-fade-out",
			"expandButton": "PAwdXG_expandButton",
			"metricRow": "PAwdXG_metricRow",
			"dagNode": "PAwdXG_dagNode",
			"disclosureTitle": "PAwdXG_disclosureTitle",
			"progressRow": "PAwdXG_progressRow",
			"listItem": "PAwdXG_listItem",
			"statusButton": "PAwdXG_statusButton",
			"surfaceList": "PAwdXG_surfaceList",
			"resizer": "PAwdXG_resizer",
			"empty": "PAwdXG_empty",
			"dotFailed": "PAwdXG_dotFailed",
			"collapseButton": "PAwdXG_collapseButton",
			"errorBanner": "PAwdXG_errorBanner",
			"detailPercent": "PAwdXG_detailPercent"
		};
		//#endregion
		//#region src/client/surface.tsx
		/** Status-dot hue class per task status (shared with the panel's task dots). */
		const statusDotClass = {
			pending: TaskUiPanel_module_css_default.dotPending,
			running: TaskUiPanel_module_css_default.dotRunning,
			done: TaskUiPanel_module_css_default.dotDone,
			blocked: TaskUiPanel_module_css_default.dotBlocked,
			failed: TaskUiPanel_module_css_default.dotFailed
		};
		/** Status-badge tone class per accepted tone (unknown tones fall back to neutral). */
		const TONE_CLASS = {
			neutral: TaskUiPanel_module_css_default.badgeNeutral,
			success: TaskUiPanel_module_css_default.badgeSuccess,
			warn: TaskUiPanel_module_css_default.badgeWarn,
			error: TaskUiPanel_module_css_default.badgeError,
			brand: TaskUiPanel_module_css_default.badgeBrand
		};
		/**
		* Render one surface node, dispatching on `kind`. Unknown or malformed kinds
		* render nothing.
		* @param surface - the surface node to render.
		* @returns the node's element tree, or null when the kind is unsupported.
		*/
		function SurfaceView({ surface }) {
			switch (surface.kind) {
				case "section": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskUiPanel_module_css_default.surfaceSection,
					children: [surface.title !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.sectionTitle,
						children: surface.title
					}), (surface.children ?? []).map((child, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SurfaceView, { surface: child }, index))]
				});
				case "metric": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskUiPanel_module_css_default.metricRow,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TaskUiPanel_module_css_default.metricLabel,
							children: surface.label
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: TaskUiPanel_module_css_default.metricValue,
							children: [String(surface.value), surface.unit !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskUiPanel_module_css_default.metricUnit,
								children: surface.unit
							})]
						}),
						surface.trend !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TaskUiPanel_module_css_default.metricTrend,
							children: surface.trend
						})
					]
				});
				case "statusBadge": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: `${TaskUiPanel_module_css_default.badge} ${TONE_CLASS[surface.tone ?? "neutral"] ?? TaskUiPanel_module_css_default.badgeNeutral}`,
					children: surface.label
				});
				case "progress": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskUiPanel_module_css_default.progressRow,
					children: [surface.label !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.progressLabel,
						children: surface.label
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.progressTrack,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: TaskUiPanel_module_css_default.progressFill,
							style: { width: `${Math.min(100, Math.max(0, surface.percent))}%` }
						})
					})]
				});
				case "table": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
					className: TaskUiPanel_module_css_default.table,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: surface.columns.map((column) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
						className: TaskUiPanel_module_css_default.tableCell,
						children: column
					}, column)) }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: surface.rows.map((row, rowIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: row.map((cell, cellIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
						className: TaskUiPanel_module_css_default.tableCell,
						children: String(cell)
					}, cellIndex)) }, rowIndex)) })]
				});
				case "list": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
					className: TaskUiPanel_module_css_default.surfaceList,
					children: surface.items.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
						className: TaskUiPanel_module_css_default.listItem,
						children: String(item)
					}, index))
				});
				case "timeline": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
					className: TaskUiPanel_module_css_default.timeline,
					children: surface.events.map((event, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
						className: TaskUiPanel_module_css_default.timelineEvent,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskUiPanel_module_css_default.eventTime,
								children: event.time
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskUiPanel_module_css_default.eventTitle,
								children: event.title
							}),
							event.detail !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskUiPanel_module_css_default.eventDetail,
								children: event.detail
							})
						]
					}, index))
				});
				case "dag": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskUiPanel_module_css_default.dag,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.dagNodes,
						children: surface.nodes.map((node) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: TaskUiPanel_module_css_default.dagNode,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `${TaskUiPanel_module_css_default.dagNodeDot} ${statusDotClass[node.status] ?? TaskUiPanel_module_css_default.dotNeutral}`,
								"aria-hidden": "true"
							}), node.label]
						}, node.id))
					}), surface.edges !== void 0 && surface.edges.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.dagEdges,
						children: surface.edges.map((edge, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskUiPanel_module_css_default.dagEdge,
							children: [
								edge.from,
								" → ",
								edge.to
							]
						}, index))
					})]
				});
				case "disclosure": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
					className: TaskUiPanel_module_css_default.disclosure,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", {
						className: TaskUiPanel_module_css_default.disclosureTitle,
						children: surface.title
					}), (surface.children ?? []).map((child, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SurfaceView, { surface: child }, index))]
				});
				default: return null;
			}
		}
		//#endregion
		//#region src/client/TaskUiPanel.tsx
		/**
		* Task panel (`conversation.input.dock` occupant): a floating, live list of the
		* global task library. Pure props component — reads the store via `useStore`,
		* renders localized copy via `t`, and triggers Host operations through the
		* injected callbacks (the apply world owns every fetch).
		*
		* Detail: clicking a card expands a secondary region under it (description,
		* progress, next action, dependencies, timestamps). The expansion is CSS-only
		* (`grid-template-rows: 0fr -> 1fr`), so the panel's bottom-anchored rise
		* follows it for free.
		*
		* Motion:
		*   - a task that arrives after the panel has painted plays the card rise and
		*     the panel slides up by the height it gained — which is what lifts the
		*     cards above it and carries the new one in from below the viewport;
		*   - a deleted task keeps its slot while it plays the exit animation, and the
		*     panel retracts afterwards.
		* Both are skipped under `prefers-reduced-motion`.
		*/
		/** How long a delete confirmation stays armed before it lapses. */
		const CONFIRM_TIMEOUT_MS = 3e3;
		/** Statuses offered as quick-set controls (legacy panel parity: no `failed` control). */
		const STATUS_CONTROLS = [
			"running",
			"done",
			"blocked",
			"pending"
		];
		/** Locale key per task status. */
		const STATUS_LABEL_KEY = {
			pending: "status.pending",
			running: "status.running",
			done: "status.done",
			blocked: "status.blocked",
			failed: "status.failed"
		};
		/** Shared empty results, so a render without a change keeps a stable identity. */
		const NO_ENTERING = /* @__PURE__ */ new Set();
		const NO_EXITING = [];
		/** Distance from the list bottom that still counts as following the newest card. */
		const PINNED_SLACK_PX = 40;
		/** Timings used only if the theme's motion tokens are unavailable. */
		const FALLBACK_RISE_MS = 200;
		const FALLBACK_EXIT_MS = 100;
		const FALLBACK_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
		/** Whether the platform asked for reduced motion. */
		function prefersReducedMotion() {
			return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		/** One theme motion value, in milliseconds, with a fallback. */
		function tokenMs(raw, fallback) {
			const seconds = Number.parseFloat(raw);
			return Number.isFinite(seconds) && seconds > 0 ? seconds * 1e3 : fallback;
		}
		/**
		* Read the theme's own motion values, so the panel's animations are timed by
		* the same tokens as the card's CSS keyframes instead of a second copy of the
		* numbers.
		* @param el - the element to animate (the custom properties are inherited).
		* @returns Web Animations timing for a panel move.
		*/
		function panelTiming(el) {
			const style = getComputedStyle(el);
			const easing = style.getPropertyValue("--ds-ease-in-out").trim();
			return {
				duration: tokenMs(style.getPropertyValue("--ds-transition-duration"), FALLBACK_RISE_MS),
				easing: easing === "" ? FALLBACK_EASING : easing
			};
		}
		/** The card-exit duration, so the removal timer matches its animation. */
		function exitDurationMs() {
			if (typeof document === "undefined") return FALLBACK_EXIT_MS;
			return tokenMs(getComputedStyle(document.documentElement).getPropertyValue("--ds-transition-duration-fast"), FALLBACK_EXIT_MS);
		}
		/** Local timestamp for the detail view (minute precision is enough there). */
		function formatTime(ms) {
			return new Date(ms).toLocaleString(void 0, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		/** Show all JSON history values as React text, preserving null and empty strings. */
		function historyValue(value) {
			return JSON.stringify(value) ?? "undefined";
		}
		const HISTORY_FIELDS = {
			title: "history.field.title",
			status: "history.field.status",
			description: "history.field.description",
			nextStep: "history.field.nextStep",
			steps: "history.field.steps",
			parentId: "history.field.parentId",
			dependsOn: "history.field.dependsOn",
			evidence: "history.field.evidence",
			surface: "history.field.surface",
			progress: "history.field.progress",
			jobId: "history.field.jobId"
		};
		/** Locale key naming one flow state (the detail flow's accessible text). */
		const FLOW_STATE_KEY = {
			done: "flow.done",
			current: "flow.current",
			next: "flow.next",
			todo: "flow.todo"
		};
		/** Marker glyph per flow state; `todo` stays blank (its ring is the mark). */
		const FLOW_STATE_GLYPH = {
			done: "✓",
			current: "●",
			next: "→",
			todo: ""
		};
		/**
		* The flow the detail card draws.
		*
		* The owner's `steps` win when it wrote any. Otherwise one node is derived from
		* the coarse fields, so tasks created before the flow existed still render
		* something true rather than an empty box. A step list that names no `next`
		* inherits `nextStep` as its next node, so the field the bundled skill requires
		* is never lost behind a partial list.
		* @param task - the task row to describe.
		* @returns the ordered flow, possibly empty (the caller renders the placeholder).
		*/
		function flowOf(task) {
			const steps = task.steps ?? [];
			const nodes = steps.length > 0 ? [...steps] : task.progress === null ? [] : [{
				text: task.progress.text,
				state: task.status === "done" ? "done" : task.status === "pending" ? "todo" : "current"
			}];
			const nextStep = task.nextStep ?? "";
			if (nextStep !== "" && !nodes.some((node) => node.state === "next")) nodes.push({
				text: nextStep,
				state: "next"
			});
			return nodes;
		}
		/** Panel width bounds, in px. The stylesheet's 360px sits between them. */
		const MIN_PANEL_WIDTH = 260;
		const MAX_PANEL_WIDTH = 760;
		/** Mirrors the stylesheet's default width, for the pre-drag ARIA value. */
		const DEFAULT_PANEL_WIDTH = 360;
		/** Width change per arrow key on the resize handle. */
		const RESIZE_KEY_STEP = 16;
		/** Where the remembered width lives. */
		const WIDTH_STORAGE_KEY = "dsh-global-task-list:panel-width";
		/**
		* Clamp a candidate width to the panel's bounds, further capped by the viewport
		* so the panel can never grow past the edge it is anchored to.
		* @param candidate - desired width in px.
		* @returns the width to apply.
		*/
		function clampWidth(candidate) {
			const viewportMax = typeof window === "undefined" ? MAX_PANEL_WIDTH : window.innerWidth - 32;
			return Math.round(Math.min(Math.max(candidate, MIN_PANEL_WIDTH), Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, viewportMax))));
		}
		/**
		* The remembered width, or null to keep the stylesheet default.
		* Storage is best-effort: a browser that denies it (or a scheme without web
		* storage) simply gets an unremembered width for the session.
		* @returns the stored width, clamped, or null.
		*/
		function readStoredWidth() {
			try {
				const raw = window.localStorage.getItem(WIDTH_STORAGE_KEY);
				if (raw === null) return null;
				const value = Number.parseInt(raw, 10);
				return Number.isFinite(value) ? clampWidth(value) : null;
			} catch {
				return null;
			}
		}
		/** Remember the width, best-effort. */
		function storeWidth(width) {
			try {
				window.localStorage.setItem(WIDTH_STORAGE_KEY, String(width));
			} catch {}
		}
		/**
		* Pointer-drag width resizing for the right-anchored panel, following
		* ui-layout's own DragHandle: pointer capture for the whole gesture, one
		* throttled report per animation frame, and the drag origin captured at
		* pointer-down so the width is computed from the gesture rather than
		* accumulated per move (which would drift with rounding).
		*
		* The panel hangs off the viewport's right edge, so its movable edge is the
		* left one and a leftward drag is what widens it.
		* @param panelRef - the panel element, measured at drag start.
		* @returns the width to apply, the drag flag, and the handle's handlers.
		*/
		function usePanelResize(panelRef) {
			const [width, setWidth] = (0, react.useState)(readStoredWidth);
			const [resizing, setResizing] = (0, react.useState)(false);
			/** The active gesture; null between drags. */
			const drag = (0, react.useRef)(null);
			/** Pending frame for the throttled width update. */
			const frame = (0, react.useRef)(null);
			const cancelFrame = () => {
				if (frame.current === null) return;
				window.cancelAnimationFrame(frame.current);
				frame.current = null;
			};
			const end = () => {
				cancelFrame();
				drag.current = null;
				setResizing(false);
			};
			const onPointerDown = (event) => {
				if (event.button !== 0 || drag.current !== null) return;
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				drag.current = {
					id: event.pointerId,
					originX: event.clientX,
					startWidth: panelRef.current?.offsetWidth ?? MIN_PANEL_WIDTH,
					latestX: event.clientX
				};
				setResizing(true);
			};
			const onPointerMove = (event) => {
				const active = drag.current;
				if (active === null || active.id !== event.pointerId) return;
				active.latestX = event.clientX;
				if (frame.current !== null) return;
				frame.current = window.requestAnimationFrame(() => {
					frame.current = null;
					const current = drag.current;
					if (current === null) return;
					setWidth(clampWidth(current.startWidth - (current.latestX - current.originX)));
				});
			};
			const onPointerUp = (event) => {
				const active = drag.current;
				if (active === null || active.id !== event.pointerId) return;
				cancelFrame();
				const settled = clampWidth(active.startWidth - (event.clientX - active.originX));
				setWidth(settled);
				storeWidth(settled);
				end();
			};
			const onKeyDown = (event) => {
				if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
				event.preventDefault();
				const next = clampWidth((width ?? panelRef.current?.offsetWidth ?? MIN_PANEL_WIDTH) + (event.key === "ArrowLeft" ? RESIZE_KEY_STEP : -16));
				setWidth(next);
				storeWidth(next);
			};
			(0, react.useEffect)(() => end, []);
			return {
				width,
				resizing,
				handle: {
					onPointerDown,
					onPointerMove,
					onPointerUp,
					onPointerCancel: end,
					onLostPointerCapture: end,
					onKeyDown
				}
			};
		}
		/**
		* Derive whether the active conversation view is the built-in Chat view by
		* observing the session header's accessible tab ring. The chat entry is the
		* first tab (order 0, DEFAULT_VIEW_ID 'chat'); the trajectory entry is a
		* later order, so a selected index other than 0 means "not chat". With one
		* view there is no tab ring and chat is active by definition. This is the
		* only stable signal a third-party dock occupant can read: the active view id
		* lives in ui-conversation's private per-session store, not a service.
		*/
		function useActiveViewIsChat() {
			const [isChat, setIsChat] = (0, react.useState)(true);
			(0, react.useEffect)(() => {
				const read = () => {
					const tabs = Array.from(document.querySelectorAll("[role=\"tablist\"] [role=\"tab\"]"));
					if (tabs.length === 0) return true;
					return tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true") <= 0;
				};
				let latest = read();
				setIsChat(latest);
				const observer = new MutationObserver(() => {
					const next = read();
					if (next !== latest) {
						latest = next;
						setIsChat(next);
					}
				});
				observer.observe(document.body, {
					subtree: true,
					attributes: true,
					attributeFilter: ["aria-selected"]
				});
				return () => {
					observer.disconnect();
				};
			}, []);
			return isChat;
		}
		/**
		* Render the task panel.
		* @param props - composed slot props (contract/slots.ts).
		* @returns the panel element tree.
		*/
		function TaskUiPanel({ t, useStore, actions, setStatus, requestDelete, askAgent }) {
			const tasks = useStore((s) => s.tasks);
			const error = useStore((s) => s.error);
			const confirming = useStore((s) => s.confirming);
			const collapsed = useStore((s) => s.collapsed);
			const viewIsChat = useActiveViewIsChat();
			/** The floating panel that slides when the list grows or retracts. */
			const panelRef = (0, react.useRef)(null);
			/** The scrolling card list, for following the newest card. */
			const bodyRef = (0, react.useRef)(null);
			/** Measured panel height at the previous commit; null before the first. */
			const lastHeight = (0, react.useRef)(null);
			/** Row-id signature at the previous commit, to tell a list change from a resize. */
			const lastSignature = (0, react.useRef)(null);
			/** The task list committed by a previous render, for detecting removals. */
			const committedTasks = (0, react.useRef)([]);
			/** Whether the reader was parked at the newest card before this render. */
			const followsNewest = (0, react.useRef)(true);
			/** Set by the removal pass when this commit dropped a task, so the motion
			*  pass can ignore the transient height drop that the ghost row undoes in
			*  the same frame. */
			const droppedThisCommit = (0, react.useRef)(false);
			/** Tasks removed from the library that are still playing their exit. */
			const [exiting, setExiting] = (0, react.useState)(NO_EXITING);
			/** Ids whose detail region is expanded. */
			const [expandedIds, setExpandedIds] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			/** Drag-to-resize state for the panel's left edge. */
			const resize = usePanelResize(panelRef);
			const entering = (0, react.useMemo)(() => {
				const known = committedTasks.current;
				if (known.length === 0) return NO_ENTERING;
				const knownIds = new Set(known.map((task) => task.id));
				const added = /* @__PURE__ */ new Set();
				for (const task of tasks) if (!knownIds.has(task.id)) added.add(task.id);
				return added.size === 0 ? NO_ENTERING : added;
			}, [tasks]);
			const rows = (0, react.useMemo)(() => {
				if (exiting.length === 0) return tasks.map((task) => ({
					task,
					exiting: false
				}));
				return [...tasks.map((task) => ({
					task,
					exiting: false
				})), ...exiting.map((task) => ({
					task,
					exiting: true
				}))].sort((a, b) => a.task.createdAt - b.task.createdAt);
			}, [tasks, exiting]);
			const visibleRows = (0, react.useMemo)(() => {
				const ids = new Set(rows.map((row) => row.task.id));
				const children = /* @__PURE__ */ new Map();
				for (const row of rows) {
					if (row.task.parentId === null || !ids.has(row.task.parentId)) continue;
					const siblings = children.get(row.task.parentId) ?? [];
					siblings.push(row);
					children.set(row.task.parentId, siblings);
				}
				const visited = /* @__PURE__ */ new Set();
				const result = [];
				const visit = (row, depth, visible) => {
					if (visited.has(row.task.id)) return;
					visited.add(row.task.id);
					if (visible) result.push({
						...row,
						depth
					});
					for (const child of children.get(row.task.id) ?? []) visit(child, depth + 1, visible && expandedIds.has(row.task.id));
				};
				for (const row of rows) if (row.task.parentId === null || !ids.has(row.task.parentId)) visit(row, 0, true);
				for (const row of rows) if (!visited.has(row.task.id)) visit(row, 0, true);
				return result;
			}, [rows, expandedIds]);
			/** Row identity, the signature that separates a list change from a resize. */
			const rowsKey = (0, react.useMemo)(() => rows.map((row) => row.task.id).join(","), [rows]);
			/** Expansion identity, which resizes the panel without changing the list. */
			const expandedKey = (0, react.useMemo)(() => [...expandedIds].sort().join(","), [expandedIds]);
			const titleOfId = (0, react.useMemo)(() => {
				const titles = new Map(tasks.map((task) => [task.id, task.title]));
				return (id) => titles.get(id) ?? id.slice(0, 8);
			}, [tasks]);
			const childTitlesOf = (0, react.useMemo)(() => {
				const grouped = /* @__PURE__ */ new Map();
				for (const task of tasks) {
					if (task.parentId === null) continue;
					const list = grouped.get(task.parentId) ?? [];
					list.push(`${task.title} (${task.id.slice(0, 8)})`);
					grouped.set(task.parentId, list);
				}
				return (id) => grouped.get(id) ?? [];
			}, [tasks]);
			(0, react.useLayoutEffect)(() => {
				const liveIds = new Set(tasks.map((task) => task.id));
				const gone = committedTasks.current.filter((task) => !liveIds.has(task.id));
				committedTasks.current = tasks;
				droppedThisCommit.current = gone.length > 0;
				if (gone.length === 0) return;
				setExiting((previous) => {
					const known = new Set(previous.map((task) => task.id));
					return [...previous, ...gone.filter((task) => !known.has(task.id))];
				});
				const ids = new Set(gone.map((task) => task.id));
				window.setTimeout(() => {
					setExiting((previous) => previous.filter((task) => !ids.has(task.id)));
					setExpandedIds((previous) => {
						if (![...ids].some((id) => previous.has(id))) return previous;
						const next = new Set(previous);
						for (const id of ids) next.delete(id);
						return next;
					});
				}, exitDurationMs());
			}, [tasks]);
			(0, react.useLayoutEffect)(() => {
				const panel = panelRef.current;
				if (panel === null) {
					lastHeight.current = null;
					lastSignature.current = null;
					return;
				}
				if (droppedThisCommit.current) {
					droppedThisCommit.current = false;
					return;
				}
				const height = panel.offsetHeight;
				const previous = lastHeight.current;
				const listChanged = lastSignature.current !== null && lastSignature.current !== rowsKey;
				lastHeight.current = height;
				lastSignature.current = rowsKey;
				const reduced = prefersReducedMotion();
				const body = bodyRef.current;
				if (!listChanged || previous === null) {
					if (entering.size > 0 && previous !== null && body !== null && followsNewest.current) body.scrollTo({
						top: body.scrollHeight,
						behavior: reduced ? "auto" : "smooth"
					});
					return;
				}
				if (reduced) return;
				if (height > previous) {
					panel.animate([{ transform: `translateY(${height - previous}px)` }, { transform: "translateY(0)" }], panelTiming(panel));
					return;
				}
				panel.animate([{ height: `${previous}px` }, { height: `${height}px` }], panelTiming(panel));
			}, [
				rowsKey,
				entering,
				expandedKey,
				collapsed,
				viewIsChat,
				resize.width,
				resize.resizing
			]);
			(0, react.useEffect)(() => {
				const body = bodyRef.current;
				followsNewest.current = body === null || body.scrollHeight - body.scrollTop - body.clientHeight <= PINNED_SLACK_PX;
			}, [tasks]);
			(0, react.useEffect)(() => {
				if (confirming === null) return;
				const timer = window.setTimeout(() => {
					actions.setConfirming(null);
				}, CONFIRM_TIMEOUT_MS);
				return () => {
					window.clearTimeout(timer);
				};
			}, [confirming, actions]);
			const counts = (0, react.useMemo)(() => {
				const result = {
					running: 0,
					done: 0,
					blocked: 0
				};
				for (const task of tasks) if (task.status === "running") result.running += 1;
				else if (task.status === "done") result.done += 1;
				else if (task.status === "blocked") result.blocked += 1;
				return result;
			}, [tasks]);
			const toggleExpanded = (id) => {
				setExpandedIds((previous) => {
					const next = new Set(previous);
					if (next.has(id)) next.delete(id);
					else next.add(id);
					return next;
				});
			};
			if (!viewIsChat) return null;
			if (collapsed) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: TaskUiPanel_module_css_default.mini,
				"aria-label": t("panel.title"),
				onClick: () => {
					actions.setCollapsed(false);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: TaskUiPanel_module_css_default.miniDot,
						"aria-hidden": "true"
					}),
					t("panel.title"),
					tasks.length > 0 ? ` · ${tasks.length}` : ""
				]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TaskUiPanel_module_css_default.root,
				ref: panelRef,
				"data-resizing": resize.resizing ? "true" : void 0,
				style: resize.width === null ? void 0 : { width: `${resize.width}px` },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.resizer,
						role: "separator",
						"aria-orientation": "vertical",
						"aria-label": t("action.resize"),
						"aria-valuenow": resize.width ?? DEFAULT_PANEL_WIDTH,
						"aria-valuemin": MIN_PANEL_WIDTH,
						"aria-valuemax": MAX_PANEL_WIDTH,
						tabIndex: 0,
						...resize.handle
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: TaskUiPanel_module_css_default.header,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: TaskUiPanel_module_css_default.title,
								children: t("panel.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: TaskUiPanel_module_css_default.summary,
								children: t("panel.summary", counts)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: TaskUiPanel_module_css_default.collapseButton,
								onClick: () => {
									actions.setCollapsed(true);
								},
								children: t("action.collapse")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskUiPanel_module_css_default.body,
						ref: bodyRef,
						children: [error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: TaskUiPanel_module_css_default.errorBanner,
							role: "alert",
							children: t(error.code === "refresh" ? "error.refresh" : "error.operation", { detail: error.detail })
						}), rows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: TaskUiPanel_module_css_default.empty,
							children: t("panel.empty")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
							className: TaskUiPanel_module_css_default.list,
							children: visibleRows.map(({ task, exiting: isExiting, depth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskRow, {
								task,
								depth,
								confirming: confirming === task.id,
								entering: entering.has(task.id),
								exiting: isExiting,
								expanded: expandedIds.has(task.id),
								onToggle: () => {
									toggleExpanded(task.id);
								},
								titleOf: titleOfId,
								childTitles: childTitlesOf(task.id),
								t,
								setStatus,
								requestDelete,
								askAgent
							}, task.id))
						})]
					})
				]
			});
		}
		/**
		* Render one task card: status dot + title + expand + delete, the quick status
		* controls, the split action, the linked job line, the inline progress row, the
		* surface document, and — when expanded — the detail region.
		* @param props - row props.
		* @returns the card element tree.
		*/
		function TaskRow({ task, depth, confirming, entering, exiting, expanded, onToggle, titleOf, childTitles, t, setStatus, requestDelete, askAgent }) {
			const onDelete = () => {
				requestDelete(task.id, confirming);
			};
			const detailId = `task-ui-detail-${task.id}`;
			const flow = flowOf(task);
			const flowDerived = (task.steps ?? []).length === 0;
			const jobStale = task.jobStale === true;
			const onCardClick = (event) => {
				if (event.target.closest("button, summary, a, input, select, textarea, details") !== null) return;
				onToggle();
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: TaskUiPanel_module_css_default.card,
				style: { marginInlineStart: `${Math.min(depth, 8) * 12}px` },
				"data-depth": depth,
				"data-enter": entering ? "true" : void 0,
				"data-exit": exiting ? "true" : void 0,
				"data-expanded": expanded ? "true" : void 0,
				onClick: onCardClick,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskUiPanel_module_css_default.cardHeader,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `${TaskUiPanel_module_css_default.dot} ${statusDotClass[task.status]}`,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskUiPanel_module_css_default.taskTitle,
								children: task.title
							}),
							childTitles.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskUiPanel_module_css_default.childCount,
								children: t("detail.childCount", { count: childTitles.length })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: TaskUiPanel_module_css_default.expandButton,
								"aria-expanded": expanded,
								"aria-controls": detailId,
								"aria-label": t("action.toggleDetail"),
								onClick: onToggle,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: TaskUiPanel_module_css_default.chevron,
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: TaskUiPanel_module_css_default.deleteButton,
								"data-confirming": confirming || void 0,
								onClick: onDelete,
								children: t(confirming ? "action.confirmDelete" : "action.delete")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskUiPanel_module_css_default.controls,
						children: [STATUS_CONTROLS.map((status) => {
							const active = task.status === status;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: TaskUiPanel_module_css_default.statusButton,
								"data-status": status,
								"data-active": active || void 0,
								disabled: active,
								onClick: () => {
									if (!active) setStatus(task.id, status);
								},
								children: t(STATUS_LABEL_KEY[status])
							}, status);
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: TaskUiPanel_module_css_default.splitButton,
							onClick: () => {
								askAgent(task);
							},
							children: t("action.split")
						})]
					}),
					task.jobId !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: jobStale ? TaskUiPanel_module_css_default.jobLineStale : TaskUiPanel_module_css_default.jobLine,
						title: jobStale ? t("panel.jobExpired") : void 0,
						children: [t("panel.job", { id: task.jobId.slice(0, 8) }), jobStale ? ` · ${t("panel.jobExpired")}` : ""]
					}),
					task.progress !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskUiPanel_module_css_default.progressRow,
						children: [task.progress.percent !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: TaskUiPanel_module_css_default.progressTrack,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: TaskUiPanel_module_css_default.progressFill,
								style: { width: `${Math.min(100, Math.max(0, task.progress.percent))}%` }
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: TaskUiPanel_module_css_default.progressLabel,
							children: task.progress.text
						})]
					}),
					task.surface !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.surface,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SurfaceView, { surface: task.surface })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskUiPanel_module_css_default.detailWrap,
						id: detailId,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskUiPanel_module_css_default.detail,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskUiPanel_module_css_default.detailBlock,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskUiPanel_module_css_default.detailLabel,
										children: t("detail.description")
									}), task.description === "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskUiPanel_module_css_default.detailUnset,
										children: t("detail.unset")
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskUiPanel_module_css_default.detailText,
										children: task.description
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskUiPanel_module_css_default.detailBlock,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: TaskUiPanel_module_css_default.flowHeader,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: TaskUiPanel_module_css_default.detailLabel,
												children: t("detail.flow")
											}), task.progress?.percent !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: TaskUiPanel_module_css_default.detailPercent,
												children: [Math.round(task.progress.percent), "%"]
											})]
										}),
										flow.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: TaskUiPanel_module_css_default.detailUnset,
											children: t("detail.unset")
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
											className: TaskUiPanel_module_css_default.flow,
											children: flow.map((node, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
												className: TaskUiPanel_module_css_default.flowStep,
												"data-state": node.state,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: TaskUiPanel_module_css_default.flowMarker,
													"aria-hidden": "true",
													children: FLOW_STATE_GLYPH[node.state]
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: TaskUiPanel_module_css_default.flowBox,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: TaskUiPanel_module_css_default.srOnly,
														children: t(FLOW_STATE_KEY[node.state])
													}), node.text]
												})]
											}, `${node.state}-${index}`))
										}),
										flowDerived && flow.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: TaskUiPanel_module_css_default.detailNote,
											children: t("detail.flowDerived")
										})
									]
								}),
								task.dependsOn.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: TaskUiPanel_module_css_default.detailMeta,
									children: t("detail.blockedBy", { ids: task.dependsOn.map((id) => id.slice(0, 8)).join(", ") })
								}),
								task.parentId !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: TaskUiPanel_module_css_default.detailMeta,
									children: t("detail.parent", { title: titleOf(task.parentId) })
								}),
								childTitles.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: TaskUiPanel_module_css_default.detailMeta,
									children: t("detail.children", { titles: childTitles.join("、") })
								}),
								(task.evidence?.length ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskUiPanel_module_css_default.detailBlock,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskUiPanel_module_css_default.detailLabel,
										children: t("detail.evidence")
									}), (task.evidence ?? []).map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskUiPanel_module_css_default.detailText,
										children: `[${item.kind}] ${item.ref}${item.note === "" ? "" : ` — ${item.note}`}`
									}, `${item.kind}-${item.ref}-${index}`))]
								}),
								(task.history?.length ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
									className: TaskUiPanel_module_css_default.historyDisclosure,
									"data-task-history": "",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", {
										className: TaskUiPanel_module_css_default.historySummary,
										children: [
											t("history.title"),
											" (",
											task.history.length,
											")"
										]
									}), [...task.history].reverse().sort((a, b) => b.at - a.at).map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: TaskUiPanel_module_css_default.historyEntry,
										"data-history-id": entry.id,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: TaskUiPanel_module_css_default.detailMeta,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("time", {
														dateTime: new Date(entry.at).toISOString(),
														children: formatTime(entry.at)
													}),
													" · ",
													t(entry.operation === "create" ? "history.create" : "history.update"),
													" · ",
													t(`history.source.${entry.source.kind}`),
													entry.source.sessionId !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
														" · ",
														t("history.session"),
														": ",
														entry.source.sessionId
													] }),
													entry.source.eventSeq !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
														" · ",
														t("history.event"),
														": ",
														entry.source.eventSeq
													] })
												]
											}),
											entry.source.note !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: TaskUiPanel_module_css_default.detailText,
												children: entry.source.note
											}),
											entry.changes.map((change, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: TaskUiPanel_module_css_default.detailText,
												children: [
													HISTORY_FIELDS[change.field] ? t(HISTORY_FIELDS[change.field]) : change.field,
													": ",
													historyValue(change.before),
													" → ",
													historyValue(change.after)
												]
											}, `${change.field}-${index}`))
										]
									}, entry.id))]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskUiPanel_module_css_default.detailMeta,
									children: [
										t("detail.created", { time: formatTime(task.createdAt) }),
										" · ",
										t("detail.updated", { time: formatTime(task.updatedAt) })
									]
								})
							]
						})
					})
				]
			});
		}
		//#endregion
		//#region src/client/store.ts
		/**
		* Task panel store: the panel's shared viewing state (task list, last error,
		* delete-confirmation id). The plugin's apply world is the only writer —
		* polling and mutation results arrive through the bound actions; the panel
		* component reads via props.useStore. Task data itself stays on the Host
		* (the panel polls the HTTP API); the store never owns business truth.
		*/
		/**
		* Create the task panel store handle. Called once in apply and passed to the
		* `shell.overlay` registration; the framework instantiates the root-scoped
		* instance and delivers `useStore`/`actions` (and the inject factory's bound
		* actions) at materialization.
		* @returns the store handle.
		*/
		function createTaskUiStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					tasks: [],
					error: null,
					confirming: null,
					collapsed: false
				}),
				actions: {
					refresh: (draft, tasks) => {
						draft.tasks = tasks;
					},
					setError: (draft, error) => {
						draft.error = error;
					},
					setConfirming: (draft, id) => {
						draft.confirming = id;
					},
					clearError: (draft) => {
						draft.error = null;
					},
					setCollapsed: (draft, collapsed) => {
						draft.collapsed = collapsed;
					}
				}
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `task-ui` namespace dictionaries: the persistent task panel copy. */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"panel.title": "任务",
			"panel.empty": "无任务",
			"panel.summary": "进行中 {running} · 已完成 {done} · 已阻塞 {blocked}",
			"panel.job": "任务 {id}",
			"panel.jobExpired": "job 已失效，状态待确认",
			"status.pending": "待处理",
			"status.running": "进行中",
			"status.done": "已完成",
			"status.blocked": "已阻塞",
			"status.failed": "失败",
			"action.delete": "删除",
			"action.confirmDelete": "确认删除？",
			"action.split": "拆分",
			"action.collapse": "折叠",
			"action.toggleDetail": "展开或收起任务详情",
			"action.resize": "左右拖动调整面板宽度",
			"detail.description": "描述",
			"detail.flow": "流程",
			"detail.flowDerived": "未提供流程，仅显示当前进度",
			"detail.blockedBy": "等待依赖：{ids}",
			"detail.parent": "父任务：{title}",
			"detail.children": "子任务：{titles}",
			"detail.childCount": "{count} 个子任务",
			"detail.evidence": "依据索引",
			"history.title": "变更历史",
			"history.create": "创建",
			"history.update": "修改",
			"history.source.agent": "Agent",
			"history.source.panel": "面板",
			"history.source.job": "后台任务",
			"history.session": "会话",
			"history.event": "事件",
			"history.field.title": "标题",
			"history.field.status": "状态",
			"history.field.description": "描述",
			"history.field.nextStep": "下一步",
			"history.field.steps": "步骤",
			"history.field.parentId": "父任务",
			"history.field.dependsOn": "依赖任务",
			"history.field.evidence": "依据索引",
			"history.field.surface": "展示内容",
			"history.field.progress": "进度",
			"history.field.jobId": "后台任务 ID",
			"detail.created": "创建于 {time}",
			"detail.updated": "更新于 {time}",
			"detail.unset": "未填写",
			"flow.done": "已完成",
			"flow.current": "当前",
			"flow.next": "下一步",
			"flow.todo": "待办",
			"error.refresh": "刷新失败：{detail}",
			"error.operation": "操作失败：{detail}"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"panel.title": "Tasks",
			"panel.empty": "No tasks",
			"panel.summary": "{running} running · {done} done · {blocked} blocked",
			"panel.job": "job {id}",
			"panel.jobExpired": "job expired, status unverified",
			"status.pending": "Pending",
			"status.running": "Running",
			"status.done": "Done",
			"status.blocked": "Blocked",
			"status.failed": "Failed",
			"action.delete": "Delete",
			"action.confirmDelete": "Confirm delete?",
			"action.split": "Split",
			"action.collapse": "Collapse",
			"action.toggleDetail": "Expand or collapse task details",
			"action.resize": "Drag left or right to resize the panel",
			"detail.description": "Description",
			"detail.flow": "Flow",
			"detail.flowDerived": "No flow provided; showing current progress only",
			"detail.blockedBy": "Blocked by: {ids}",
			"detail.parent": "Parent: {title}",
			"detail.children": "Children: {titles}",
			"detail.childCount": "{count} subtasks",
			"detail.evidence": "Evidence index",
			"history.title": "Change history",
			"history.create": "Created",
			"history.update": "Updated",
			"history.source.agent": "Agent",
			"history.source.panel": "Panel",
			"history.source.job": "Job",
			"history.session": "Session",
			"history.event": "Event",
			"history.field.title": "Title",
			"history.field.status": "Status",
			"history.field.description": "Description",
			"history.field.nextStep": "Next step",
			"history.field.steps": "Steps",
			"history.field.parentId": "Parent task",
			"history.field.dependsOn": "Dependencies",
			"history.field.evidence": "Evidence index",
			"history.field.surface": "Surface",
			"history.field.progress": "Progress",
			"history.field.jobId": "Job ID",
			"detail.created": "Created {time}",
			"detail.updated": "Updated {time}",
			"detail.unset": "Not set",
			"flow.done": "Done",
			"flow.current": "Current",
			"flow.next": "Next",
			"flow.todo": "To do",
			"error.refresh": "Refresh failed: {detail}",
			"error.operation": "Operation failed: {detail}"
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin (panel copy). */
		const NS = "task-ui";
		/** Services required by the client plugin. */
		const inject = ["slots", "locale"];
		/** Fetch the task list from the Host API. */
		async function fetchTasks() {
			const res = await fetch("/task-ui/tasks");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const tasks = (await res.json()).tasks;
			return Array.isArray(tasks) ? tasks : [];
		}
		/** POST a JSON body to the Host API; rejects with the Host error text. */
		async function postJson(path, body) {
			const res = await fetch(path, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			if (res.ok) return;
			let detail = `HTTP ${res.status}`;
			try {
				const error = (await res.json()).error;
				if (typeof error === "string") detail = error;
			} catch {}
			throw new Error(detail);
		}
		/** Prompt handed to the master agent when the user asks to split a task. */
		function splitPrompt(title) {
			return `用户通过任务面板触发了生成式回路：请将任务「${title}」拆分为可并行推进的子任务（用 task_add 创建并用 parentId 关联），然后给出推进建议。`;
		}
		/**
		* Client plugin body: register the panel dictionaries, own the panel store,
		* subscribe to the Host's /task-ui/events SSE channel (refreshing the store
		* on each tasks-changed frame), and contribute the panel into the
		* conversation-owned `conversation.input.dock` slot (additive list entry,
		* id `task-ui`, order 30).
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "task-ui: dictionaries");
			const store = createTaskUiStore();
			const actionsBySession = /* @__PURE__ */ new Map();
			/** Fetch the task list and write it; a failure becomes an error banner. */
			const refreshWithError = (actions, code) => {
				fetchTasks().then((tasks) => {
					actions.refresh(tasks);
					actions.clearError();
				}).catch((error) => {
					actions.setError({
						code,
						detail: String(error)
					});
				});
			};
			ctx.effect(() => {
				const source = new EventSource("/task-ui/events");
				source.onmessage = () => {
					for (const actions of actionsBySession.values()) refreshWithError(actions, "refresh");
				};
				source.onerror = () => {
					for (const actions of actionsBySession.values()) refreshWithError(actions, "refresh");
				};
				return () => {
					source.close();
				};
			}, "task-ui: task list SSE subscription");
			const injected = (sessionId, actions) => {
				actionsBySession.set(sessionId, actions);
				refreshWithError(actions, "refresh");
				return {
					setStatus: (id, status) => {
						postJson("/task-ui/status", {
							id,
							status
						}).then(() => refreshWithError(actions, "operation")).catch((error) => {
							actions.setError({
								code: "operation",
								detail: String(error)
							});
						});
					},
					requestDelete: (id, confirmed) => {
						if (!confirmed) {
							actions.setConfirming(id);
							return;
						}
						actions.setConfirming(null);
						postJson("/task-ui/delete", { id }).then(() => refreshWithError(actions, "operation")).catch((error) => {
							actions.setError({
								code: "operation",
								detail: String(error)
							});
						});
					},
					askAgent: (task) => {
						actions.clearError();
						postJson("/task-ui/ask", { message: splitPrompt(task.title) }).catch((error) => {
							actions.setError({
								code: "operation",
								detail: String(error)
							});
						});
					}
				};
			};
			ctx.slots.inject("conversation.input.dock", () => ctx.slots.register({
				name: "conversation.input.dock",
				id: "task-ui",
				order: 30,
				store,
				locale: NS,
				inject: injected
			}, TaskUiPanel));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map