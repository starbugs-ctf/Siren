import { BlitzPage, NotFoundError, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"
import { RoundTaskList } from "app/components/TaskList"
import getTeamBySlug from "app/queries/getTeamBySlug"
import DefenseDashboard from "app/components/DefenseDashboard"

const RoundDetail: BlitzPage = () => {
  const roundId = useParam("roundId", "number")!
  const [ourTeam] = useQuery(getTeamBySlug, "starbugs")

  if (!ourTeam) {
    throw new NotFoundError("Team starbugs not found in DB")
  }

  return (
    <div>
      <div className="card mb-8">
        <div className="card-title">
          <h1>Dashboard</h1>
        </div>
        <div className="card-body">
          <RoundDashboard round={roundId} />
        </div>
      </div>
      <div className="w-full flex flex-wrap flex-row gap-8">
        <div className="flex-auto">
          <div className="card">
            <div className="card-title">
              <h1>Patch Testing</h1>
            </div>
            <div className="card-body">
              <DefenseDashboard round={roundId} teamId={ourTeam.id} />
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="card">
            <div className="card-title">
              <h1>Tasks</h1>
            </div>
            <div className="card-body">
              <RoundTaskList round={roundId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

RoundDetail.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default RoundDetail
