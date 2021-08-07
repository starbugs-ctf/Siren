import { Ctx } from "blitz"
import db from "db"

export default async function getTeamBySlug(slug: string, ctx: Ctx) {
  const team = await db.team.findUnique({
    where: {
      slug,
    },
  })
  return team
}
