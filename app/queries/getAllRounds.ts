import { Ctx } from "blitz"
import db from "db"

export default async function getAllRounds(input: any, ctx: Ctx) {
  const rounds = await db.round.findMany()
  return rounds
}
