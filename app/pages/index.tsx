import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import RoundDashboard from "app/components/RoundDashboard"

const Home: BlitzPage = () => {
  return (
    <div>
      <RoundDashboard round={100} />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
