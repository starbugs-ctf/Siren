import { useQuery } from "blitz"
import getTasksForRound from "app/queries/getTasksForRound"

type RoundTaskListProps = {
  round: number
}

export const RoundTaskList = (props: RoundTaskListProps) => {
  const [tasks] = useQuery(getTasksForRound, props.round)

  tasks.sort((first, second) => {
    if (first.exploit.problemId != second.exploit.problemId) {
      return first.exploit.problemId - second.exploit.problemId
    }
    return first.createdAt.getTime() - second.createdAt.getTime()
  })

  return (
    <>
      <h2 className="mb-4">Tasks for Round {props.round}</h2>
      <table className="data">
        <thead>
          <tr>
            <th className="text-left">Task #</th>
            <th className="text-left">Problem</th>
            <th className="text-left">Target</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.exploit.problem.name}</td>
                <td>{task.team.name}</td>
                <td>{task.flagSubmission?.submissionResult || task.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
