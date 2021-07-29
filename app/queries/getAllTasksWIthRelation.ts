import { Ctx } from "blitz"
import db from "db"

export default async function getAllTasksWithRelation(input: any, ctx: Ctx) {
  const tasks = await db.task.findMany({
    include: {
      team: true,
      exploit: {
        include: {
          problem: true,
        },
      },
    },
  })
  return tasks
}
