import { BlitzPage, useQuery } from "blitz"
import { useEffect, useState } from "react"
import { format, formatDistance } from "date-fns"
import { Round } from "db"

import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"
import { RoundTaskList } from "app/components/TaskList"
import getAllRoundRanges from "app/queries/getAllRoundRanges"
import getAllRounds from "app/queries/getAllRounds"
import { getRoundDuration, RoundDuration } from "app/timeUtil"

const HOUR_FORMAT = "MMM dd HH:mm:ss"

type RoundData = {
  round: Round
  duration: RoundDuration
}

type RoundNowProps = {
  lastRound: RoundData | null
  nextRound: RoundData | null
}

const RoundNow = ({ lastRound, nextRound }: RoundNowProps) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    // Refresh every second
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const OPT = {
    addSuffix: true,
    includeSeconds: true,
  }

  if (lastRound === null && nextRound === null) {
    return (
      <div className="round-now">
        <h2>{format(now, HOUR_FORMAT)}</h2>
        Please initialize the database
      </div>
    )
  } else if (lastRound === null) {
    return (
      <div className="round-now">
        <h2>{format(now, HOUR_FORMAT)}</h2>
        Waiting for the contest to start ({formatDistance(nextRound!.duration.end, now, OPT)})
      </div>
    )
  } else {
    if (lastRound.duration.start <= now && now <= lastRound.duration.end) {
      return (
        <div className="round-now">
          <h2>{format(now, HOUR_FORMAT)}</h2>
          Round {lastRound.round.id} is running ({formatDistance(lastRound.duration.end, now, OPT)})
        </div>
      )
    } else if (nextRound) {
      return (
        <div className="round-now">
          <h2>{format(now, HOUR_FORMAT)}</h2>
          Waiting for round {nextRound.round.id} (
          {formatDistance(nextRound.duration.start, now, OPT)})
        </div>
      )
    } else {
      return (
        <div className="round-now">
          <h2>{format(now, HOUR_FORMAT)}</h2>
          The competition has finished
        </div>
      )
    }
  }
}

const Home: BlitzPage = () => {
  const [rounds] = useQuery(getAllRounds, null)
  const [roundRanges] = useQuery(getAllRoundRanges, null)

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    // Refresh every 20 seconds
    const interval = setInterval(() => setNow(new Date()), 20 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

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

  if (lastRound === null) {
    return (
      <div className="card">
        <div className="card-title">
          <h1>Dashboard</h1>
        </div>
        <div className="card-body">
          <RoundNow lastRound={lastRound} nextRound={nextRound} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap flex-column gap-8">
      <div className="flex-auto">
        <div className="card">
          <div className="card-title">
            <h1>Dashboard</h1>
          </div>
          <div className="card-body">
            <RoundNow lastRound={lastRound} nextRound={nextRound} />
            <RoundDashboard round={lastRound.round.id} />
          </div>
        </div>
      </div>
      <div className="flex-auto">
        <div className="card">
          <div className="card-title">
            <h1>Tasks</h1>
          </div>
          <div className="card-body">
            <RoundTaskList round={lastRound.round.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Home
