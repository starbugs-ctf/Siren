import {
  BlitzPage,
  GetServerSidePropsContext,
  QueryClient,
  getQueryKey,
  invokeWithMiddleware,
  dehydrate,
  useQuery,
  NotFoundError,
  Link,
  Routes,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getAllProblems from "app/queries/getAllProblems"
import getProblemWithExploits from "app/queries/getProblemWithExploits"
import KeywordChip from "app/components/KeywordChip"

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
      {problem.enabled ? (
        <h2>{problem.name}</h2>
      ) : (
        <h2>
          <span className="text-gray-300 mr-2">{problem.name}</span>
          <KeywordChip text="DISABLED" />
        </h2>
      )}

      <ul className="mb-4">
        {problem.exploits.map((exploit) => (
          <li key={exploit.id}>
            <Link href={Routes.ExploitDetail({ exploitId: exploit.id })}>
              <a>{exploit.name}</a>
            </Link>
            <small className="side">{exploit.key}</small>
          </li>
        ))}
      </ul>
    </>
  )
}

const Problems: BlitzPage = () => {
  const [problems] = useQuery(getAllProblems, null)

  return (
    <div className="card">
      <div className="card-title">
        <h1>Problems & Exploits</h1>
      </div>
      <div className="card-body">
        {problems.map((problem) => (
          <Problem key={problem.id} problemId={problem.id} />
        ))}
      </div>
    </div>
  )
}

Problems.getLayout = (page) => <Layout title="Problems & Exploits">{page}</Layout>

export default Problems
