import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({
      msg: "Method not allowed",
    })
    return
  }

  const teams = await db.team.findMany()
  res.status(200).json(teams)
}

export default handler
