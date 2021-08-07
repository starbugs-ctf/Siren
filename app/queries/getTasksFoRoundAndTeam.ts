import { Ctx } from "blitz"
import db, { Prisma } from "db"
import { TASK_INCLUDE } from "./getTask"

type getTasksForRoundAndTeamArgs = {
  round: number
  teamId: number
}

export default async function getTasksForRoundAndTeam(
  { round, teamId }: getTasksForRoundAndTeamArgs,
  ctx: Ctx
) {
  const tasks = await db.task.findMany({
    where: {
      roundId: round,
      teamId,
    },
    include: TASK_INCLUDE,
  })

  return tasks
}
