import { Ctx } from "blitz"
import db from "db"

export default async function getTeams(input: any, ctx: Ctx) {
  const teams = await db.team.findMany()
  return teams
}
