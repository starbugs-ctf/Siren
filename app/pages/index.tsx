import { BlitzPage, NotFoundError, useQuery } from "blitz"
import { useEffect, useState } from "react"
import { format, formatDistance } from "date-fns"
import { Round } from "db"

import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"
import { RoundTaskList } from "app/components/TaskList"
import getAllRoundRanges from "app/queries/getAllRoundRanges"
import getAllRounds from "app/queries/getAllRounds"
import { CurrentRound, getCurrentRound, getRoundDuration, RoundDuration } from "app/timeUtil"
import DefenseDashboard from "app/components/DefenseDashboard"
import getTeamBySlug from "app/queries/getTeamBySlug"

const HOUR_FORMAT = "MMM dd HH:mm:ss"

type RoundNowProps = {
  currentRound: CurrentRound
}

const RoundNow = ({ currentRound }: RoundNowProps) => {
  const lastRound = currentRound.last
  const nextRound = currentRound.next

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
        Waiting for the contest to start ({formatDistance(nextRound!.duration.start, now, OPT)})
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
  const [ourTeam] = useQuery(getTeamBySlug, "starbugs")

  const [rounds] = useQuery(getAllRounds, null)
  const [roundRanges] = useQuery(getAllRoundRanges, null)

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    // Refresh every 10 seconds
    const interval = setInterval(() => setNow(new Date()), 10 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!ourTeam) {
    throw new NotFoundError("Team starbugs not found in DB")
  }

  const currentRound = getCurrentRound(rounds, roundRanges, now)

  if (currentRound.last === null) {
    return (
      <div className="card">
        <div className="card-title">
          <h1>Dashboard</h1>
        </div>
        <div className="card-body">
          <RoundNow currentRound={currentRound} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="card mb-8">
        <div className="card-title">
          <h1>Dashboard</h1>
        </div>
        <div className="card-body">
          <RoundNow currentRound={currentRound} />
          <RoundDashboard round={currentRound.last.round.id} />
        </div>
      </div>
      <div className="w-full flex flex-wrap flex-row gap-8">
        <div className="flex-auto">
          <div className="card">
            <div className="card-title">
              <h1>Patch Testing</h1>
            </div>
            <div className="card-body">
              <DefenseDashboard round={currentRound.last.round.id} teamId={ourTeam.id} />
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="card">
            <div className="card-title">
              <h1>Tasks</h1>
            </div>
            <div className="card-body">
              <RoundTaskList round={currentRound.last.round.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Home
