import { BlitzPage, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"
import BackButton from "app/components/BackButton"
import { RoundTaskList } from "app/components/RoundTaskList"

const RoundDetail: BlitzPage = () => {
  const roundId = useParam("roundId", "number")!

  return (
    <div className="flex flex-wrap flex-column gap-x-12 gap-y-8">
      <div className="flex-auto">
        <div className="card">
          <div className="card-title">
            <BackButton />
          </div>
          <div className="card-body">
            <RoundDashboard round={roundId} />
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
  )
}

RoundDetail.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default RoundDetail
