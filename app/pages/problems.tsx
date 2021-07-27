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
import getProblems from "app/queries/getProblems"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const queryKey = getQueryKey(getProblems, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getProblems, null, ctx))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Problems: BlitzPage = () => {
  const [problems] = useQuery(getProblems, null)

  return (
    <div>
      <h1>Problems</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.slug}>{problem.name}</li>
        ))}
      </ul>
    </div>
  )
}

Problems.getLayout = (page) => <Layout title="Problems">{page}</Layout>

export default Problems
