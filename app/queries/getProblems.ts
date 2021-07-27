import { Ctx } from "blitz"
import db from "db"

export default async function getProblems(input: any, ctx: Ctx) {
  const problems = await db.problem.findMany()
  return problems
}
