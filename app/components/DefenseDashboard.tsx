import { useQuery } from "blitz"
import getAllProblems from "app/queries/getAllProblems"
import getTasksForRoundAndTeam from "app/queries/getTasksFoRoundAndTeam"
import { TaskList } from "./TaskList"

type DefenseDashboardProps = {
  round: number
  teamId: number
}

export const DefenseDashboard = (props: DefenseDashboardProps) => {
  const [problems] = useQuery(getAllProblems, null)
  const [tasks] = useQuery(getTasksForRoundAndTeam, {
    round: props.round,
    teamId: props.teamId,
  })

  const taskMap = {}
  for (const problem of problems) {
    taskMap[problem.id] = []
  }

  for (const task of tasks) {
    taskMap[task.exploit.problemId].push(task)
  }

  if (tasks.length == 0) {
    return <p>No exploits exist.</p>
  }

  return (
    <>
      {problems.map((problem) =>
        taskMap[problem.id].length > 0 ? (
          <div key={problem.id}>
            <h2 className="mb-2 mt-1">{problem.name}</h2>
            <TaskList tasks={taskMap[problem.id]} showProblem={false} showTarget={false} />
          </div>
        ) : null
      )}
    </>
  )
}

export default DefenseDashboard
