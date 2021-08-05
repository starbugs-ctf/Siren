import {
  BlitzPage,
  GetServerSidePropsContext,
  QueryClient,
  getQueryKey,
  invokeWithMiddleware,
  dehydrate,
  useQuery,
  Link,
  Routes,
} from "blitz"
import { format } from "date-fns"
import Layout from "app/core/layouts/Layout"
import getAllRounds from "app/queries/getAllRounds"
import getAllRoundRanges from "app/queries/getAllRoundRanges"
import { DATE_FORMAT, getRoundDuration } from "app/timeUtil"

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

const RoundTable = () => {
  const [rounds] = useQuery(getAllRounds, null)
  const [roundRanges] = useQuery(getAllRoundRanges, null)

  return (
    <table className="data">
      <thead>
        <tr>
          <th className="text-left">Round</th>
          <th className="text-center">From</th>
          <th className="text-center">To</th>
        </tr>
      </thead>
      <tbody>
        {rounds.map((round) => {
          const roundDuration = getRoundDuration(roundRanges, round.id)
          return (
            <tr key={round.id}>
              <td>
                <Link href={Routes.RoundDetail({ roundId: round.id })}>
                  <a>Round {round.id}</a>
                </Link>
              </td>
              <td>{format(roundDuration.start, DATE_FORMAT)}</td>
              <td>{format(roundDuration.end, DATE_FORMAT)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Rounds: BlitzPage = () => {
  return (
    <div className="card">
      <div className="card-title">
        <h1>Rounds</h1>
      </div>
      <div className="card-body">
        <RoundTable />
      </div>
    </div>
  )
}

Rounds.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default Rounds
