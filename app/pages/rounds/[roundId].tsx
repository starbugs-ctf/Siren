import { BlitzPage, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"
import BackButton from "app/components/BackButton"

const RoundDetail: BlitzPage = () => {
  const roundId = useParam("roundId", "number")!

  return (
    <div className="card">
      <div className="card-title">
        <BackButton />
      </div>
      <div className="card-body">
        <RoundDashboard round={roundId} />
      </div>
    </div>
  )
}

RoundDetail.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default RoundDetail
