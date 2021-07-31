import { NotFoundError } from "blitz"
import { addSeconds } from "date-fns"
import { RoundRange } from "db"

export interface RoundDuration {
  start: Date
  end: Date
}

export function getRoundDuration(roundRanges: RoundRange[], roundId: number): RoundDuration {
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

  throw new NotFoundError("Round not found in round ranges")
}
