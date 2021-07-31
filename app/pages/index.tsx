import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"

const Home: BlitzPage = () => {
  return (
    <div className="card">
      <h1 className="card-title">Dashboard</h1>
      <div className="card-body">
        <RoundDashboard round={100} />
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
