import { Ctx } from "blitz"
import db, { Prisma } from "db"

export const TASK_INCLUDE = {
  team: true,
  exploit: {
    include: {
      problem: true,
    },
  },
  flagSubmission: true,
}

export type TaskQueryReturnType = Prisma.TaskGetPayload<{
  include: typeof TASK_INCLUDE
}>

export default async function getTask(taskId: number, ctx: Ctx) {
  const tasks = await db.task.findUnique({
    where: {
      id: taskId,
    },
    include: TASK_INCLUDE,
  })

  return tasks
}
