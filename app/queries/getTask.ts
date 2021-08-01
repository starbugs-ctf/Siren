import { Ctx } from "blitz"
import db from "db"

export default async function getTask(taskId: number, ctx: Ctx) {
  const tasks = await db.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      team: true,
      exploit: {
        include: {
          problem: true,
        },
      },
      flagSubmission: true,
    },
  })

  return tasks
}
