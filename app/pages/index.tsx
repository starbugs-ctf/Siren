import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"
import { RoundTaskList } from "app/components/RoundTaskList"

const Home: BlitzPage = () => {
  return (
    <div className="flex flex-wrap flex-column gap-8">
      <div className="flex-auto">
        <div className="card">
          <div className="card-title">
            <h1>Dashboard</h1>
          </div>
          <div className="card-body">
            <RoundDashboard round={100} />
          </div>
        </div>
      </div>
      <div className="flex-auto">
        <div className="card">
          <div className="card-title">
            <h1>Tasks</h1>
          </div>
          <div className="card-body">
            <RoundTaskList round={100} />
          </div>
        </div>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Home
