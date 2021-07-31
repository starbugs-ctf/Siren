import { Ctx } from "blitz"
import { addSeconds } from "date-fns"
import { RoundRange } from "db"

type GetRoundDurationInput = {
  roundRanges: RoundRange[]
  roundId: number
}

export interface RoundDuration {
  start: Date
  end: Date
}

export default async function getRoundDuration(
  { roundRanges, roundId }: GetRoundDurationInput,
  ctx: Ctx
): Promise<RoundDuration | null> {
  for (const roundRange of roundRanges) {
    if (roundRange.startRoundId <= roundId && roundId <= roundRange.endRoundId) {
      const roundStart = addSeconds(
        roundRange.startTime,
        roundRange.durationSeconds * (roundId - roundRange.startRoundId)
      )
      const roundEnd = addSeconds(roundStart, roundRange.durationSeconds)
      return {
        start: roundStart,
        end: roundEnd,
      }
    }
  }

  return null
}
