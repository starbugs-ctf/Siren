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
import getProblemWithExploits from "app/queries/getProblemWithExploits"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const problemQueryKey = getQueryKey(getAllProblems, null)
  await queryClient.prefetchQuery(problemQueryKey, () =>
    invokeWithMiddleware(getAllProblems, null, ctx)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

type ProblemProps = {
  problemId: number
}

const Problem = ({ problemId }: ProblemProps) => {
  const [problem] = useQuery(getProblemWithExploits, problemId)

  if (problem === null) {
    throw new NotFoundError()
  }

  return (
    <>
      <h2>{problem.name}</h2>
      <ul>
        {problem.exploits.map((exploit) => (
          <li key={exploit.id}>{exploit.name}</li>
        ))}
      </ul>
    </>
  )
}

const Problems: BlitzPage = () => {
  const [problems] = useQuery(getAllProblems, null)

  return (
    <div>
      <h1>Problems</h1>
      {problems.map((problem) => (
        <Problem key={problem.id} problemId={problem.id} />
      ))}
    </div>
  )
}

Problems.getLayout = (page) => <Layout title="Problems">{page}</Layout>

export default Problems
