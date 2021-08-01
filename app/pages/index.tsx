import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"

const Home: BlitzPage = () => {
  return (
    <div className="card">
      <div className="card-title">
        <h1>Dashboard</h1>
      </div>
      <div className="card-body">
        <RoundDashboard round={100} />
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Home
