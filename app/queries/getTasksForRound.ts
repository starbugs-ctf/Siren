import { Ctx } from "blitz"
import db, { Prisma } from "db"

export type GetTasksForRoundReturnType = Array<
  Prisma.TaskGetPayload<{
    include: {
      team: true
      exploit: {
        include: {
          problem: true
        }
      }
      flagSubmission: true
    }
  }>
>

export default async function getTasksForRound(round: number, ctx: Ctx) {
  const tasks = await db.task.findMany({
    where: {
      roundId: round,
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
