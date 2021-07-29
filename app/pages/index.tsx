import {
  BlitzPage,
  GetServerSidePropsContext,
  QueryClient,
  getQueryKey,
  invokeWithMiddleware,
  dehydrate,
  useQuery,
  NotFoundError,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getAllProblems from "app/queries/getAllProblems"
import getAllTeams from "app/queries/getAllTeams"

// TODO: should use output from crawler instead

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const problemQueryKey = getQueryKey(getAllProblems, null)
  await queryClient.prefetchQuery(problemQueryKey, () =>
    invokeWithMiddleware(getAllProblems, null, ctx)
  )

  const teamQueryKey = getQueryKey(getAllTeams, null)
  await queryClient.prefetchQuery(teamQueryKey, () => invokeWithMiddleware(getAllTeams, null, ctx))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

// https://css-tricks.com/rotated-table-column-headers/
const Home: BlitzPage = () => {
  const [problems] = useQuery(getAllProblems, null)
  const [teams] = useQuery(getAllTeams, null)

  return (
    <div className="flex flex-col">
      <style global jsx>
        {`
          div.dashboard {
            margin-top: 100px;
          }
        `}
      </style>

      <style jsx>
        {`
          div.container {
            white-space: nowrap;
          }
          div.container > div.rotate {
            transform: rotate(-45deg);
            margin: 0px auto;
            position: relative;
          }
        `}
      </style>

      <div className="flex flex-row border  odd:bg-gray-100 even:bg-white dashboard">
        <div className="border w-10"> rank </div>
        <div className="border w-40">team</div>
        <div className="border w-16">pts</div>
        {problems.map((problem) => (
          <div key={problem.id} className="border w-10 container">
            <div className="rotate">{problem.name}</div>
          </div>
        ))}
      </div>
      {teams.map((team, index) => (
        <div className="flex flex-row border odd:bg-gray-100 even:bg-white" key={team.id}>
          <div className="border w-10">{index}</div>
          <div className="border w-40">{team.name}</div>
          <div className="border w-16">100</div>
          {problems.map((problem) => (
            <div key={problem.id} className="border w-10">
              {100 + problem.id + team.id}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
