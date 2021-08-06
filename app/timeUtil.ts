import { NotFoundError } from "blitz"
import { addSeconds } from "date-fns"
import { Round, RoundRange } from "db"

export const DATE_FORMAT = "MMM dd HH:mm:ss"

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

export type RoundData = {
  round: Round
  duration: RoundDuration
}

export type CurrentRound = {
  last: RoundData | null
  next: RoundData | null
}

export function getCurrentRound(
  rounds: Round[],
  roundRanges: RoundRange[],
  now: Date
): CurrentRound {
  const roundData = rounds.map((round) => {
    return {
      round,
      duration: getRoundDuration(roundRanges, round.id),
    }
  })

  let lastRound: null | RoundData = null
  let nextRound: null | RoundData = null

  for (const current of roundData) {
    if (current.duration.start <= now) {
      if (lastRound === null || current.duration.start >= lastRound.duration.start) {
        lastRound = current
      }
    } else {
      if (nextRound === null || current.duration.start <= nextRound.duration.start) {
        nextRound = current
      }
    }
  }

  return {
    last: lastRound,
    next: nextRound,
  }
}
