import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"
import { getCurrentRound } from "app/timeUtil"

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({
      msg: "Method not allowed",
    })
    return
  }

  const rounds = await db.round.findMany()
  const roundRanges = await db.roundRange.findMany()

  const now = new Date()

  const currentRound = getCurrentRound(rounds, roundRanges, now)

  res.status(200).json({
    round: currentRound.last?.round.id,
  })
}

export default handler
