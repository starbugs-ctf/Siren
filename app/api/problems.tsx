import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({
      msg: "Method not allowed",
    })
    return
  }

  const problems = await db.problem.findMany()
  res.status(200).json(problems)
}

export default handler
