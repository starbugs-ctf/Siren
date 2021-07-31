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
import getAllRounds from "app/queries/getAllRounds"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const queryKey = getQueryKey(getAllRounds, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getAllRounds, null, ctx))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Rounds: BlitzPage = () => {
  const [rounds] = useQuery(getAllRounds, null)

  return (
    <div className="card">
      <h1 className="card-title">Rounds</h1>
      <div className="card-body">
        <ul>
          {rounds.map((round) => (
            <li key={round.id}>{round.alias || round.id}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Rounds.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default Rounds
