/** Task revisions are stored with current state so one durable write commits both. */
import { isDeepStrictEqual } from 'node:util'
import z from 'zod'

export const TASK_HISTORY_SCHEMA = z.array(z.object({
  id: z.string(), at: z.number(), operation: z.enum(['create', 'update']),
  source: z.object({
    kind: z.enum(['agent', 'panel', 'job']), sessionId: z.string().nullable(),
    eventSeq: z.number().nullable(), note: z.string(),
  }),
  changes: z.array(z.object({ field: z.string(), before: z.unknown(), after: z.unknown() })),
})).default([])
export type TaskHistoryEntry = z.infer<typeof TASK_HISTORY_SCHEMA>[number]
export type TaskHistorySource = TaskHistoryEntry['source']

/** Compare task fields, ignoring bookkeeping; same-value writes create no revision. */
export function withTaskHistory<T extends { history: TaskHistoryEntry[]; updatedAt: number }>(
  previous: T | undefined, next: T, source: TaskHistorySource, at: number, revisionId: string,
): T {
  const old = new Map(Object.entries(previous ?? {}))
  const changes: TaskHistoryEntry['changes'] = []
  for (const [field, after] of Object.entries(next)) {
    if (['history', 'createdAt', 'updatedAt'].includes(field)) continue
    const before = old.get(field) ?? null
    if (!isDeepStrictEqual(before, after ?? null)) changes.push({ field, before, after: after ?? null })
  }
  if (changes.length === 0 && previous !== undefined) return previous
  return {
    ...next, updatedAt: at,
    history: [...(previous?.history ?? []), { id: revisionId, at, operation: previous ? 'update' : 'create', source, changes }],
  }
}
