import {
  BlitzPage,
  GetServerSidePropsContext,
  QueryClient,
  getQueryKey,
  invokeWithMiddleware,
  dehydrate,
  useQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getTeams from "app/queries/getTeams"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const queryKey = getQueryKey(getTeams, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getTeams, null, ctx))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Teams: BlitzPage = () => {
  const [teams] = useQuery(getTeams, null)

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.slug}>{team.name}</li>
        ))}
      </ul>
    </div>
  )
}

Teams.getLayout = (page) => <Layout title="Teams">{page}</Layout>

export default Teams
