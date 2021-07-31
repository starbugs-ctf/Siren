import { Ctx } from "blitz"
import db from "db"

export default async function getAllRoundRanges(input: any, ctx: Ctx) {
  const roundRanges = await db.roundRange.findMany()
  return roundRanges
}
