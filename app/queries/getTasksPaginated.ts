import { Ctx, paginate } from "blitz"
import db, { Prisma } from "db"
import { TASK_INCLUDE } from "./getTask"

interface GetPaginatedTasksInput
  extends Pick<Prisma.TaskFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function getPaginatedTasks(
  { where, orderBy, skip = 0, take = 50 }: GetPaginatedTasksInput,
  ctx: Ctx
) {
  const {
    items: tasks,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.task.count({ where }),
    query: (paginateArgs) =>
      db.task.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: TASK_INCLUDE,
      }),
  })

  return {
    tasks,
    nextPage,
    hasMore,
    count,
  }
}
