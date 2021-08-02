import { BlitzPage, useRouter, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPaginatedTasks from "app/queries/getTasksPaginated"
import { TaskList } from "app/components/TaskList"

const ITEMS_PER_PAGE = 50

const Tasks: BlitzPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tasks, hasMore }] = usePaginatedQuery(getPaginatedTasks, {
    orderBy: {
      id: "desc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="card">
      <div className="card-title">
        <h1>Tasks</h1>
      </div>
      <div className="card-body">
        <div className="inline-block">
          <TaskList tasks={tasks} showRound={true} />
          <div className="inline-flex flex-row items-center w-full mt-2">
            <button disabled={page === 0} className="btn flex-grow-0" onClick={goToPreviousPage}>
              Previous
            </button>
            <span className="flex-grow text-center">Page {page}</span>
            <button disabled={!hasMore} className="btn flex-grow-0" onClick={goToNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Tasks.getLayout = (page) => <Layout title="Rounds">{page}</Layout>

export default Tasks
