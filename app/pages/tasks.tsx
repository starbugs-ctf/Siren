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
import getAllTasksWithRelation from "app/queries/getAllTasksWIthRelation"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  const queryKey = getQueryKey(getAllTasksWithRelation, null)
  await queryClient.prefetchQuery(queryKey, () =>
    invokeWithMiddleware(getAllTasksWithRelation, null, ctx)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Tasks: BlitzPage = () => {
  const [tasks] = useQuery(getAllTasksWithRelation, null)

  return (
    <div className="card">
      <div className="card-title">
        <h1>Tasks</h1>
      </div>
      <div className="card-body">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              Task {task.id} {task.exploit.problem.slug} {task.team.slug}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Tasks.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default Tasks
