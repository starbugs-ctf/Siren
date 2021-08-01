import { Link, Routes, useQuery } from "blitz"
import getTasksForRound from "app/queries/getTasksForRound"
import { FlagIcon } from "@heroicons/react/outline"

type RoundTaskListProps = {
  round: number
}

export const RoundTaskList = (props: RoundTaskListProps) => {
  const [tasks] = useQuery(getTasksForRound, props.round)

  tasks.sort((first, second) => {
    if (first.exploit.problemId != second.exploit.problemId) {
      return first.exploit.problemId - second.exploit.problemId
    }
    if (first.exploitId != second.exploitId) {
      return first.exploitId - second.exploitId
    }
    if (first.teamId != second.teamId) {
      return first.teamId - second.teamId
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
            <th className="text-left">Exploit</th>
            <th className="text-left">Target</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>
                  <Link href={Routes.TaskDetail({ taskId: task.id })}>
                    <a>{task.id}</a>
                  </Link>
                </td>
                <td>{task.exploit.problem.name}</td>
                <td>{task.exploit.name}</td>
                <td>{task.team.name}</td>
                <td className="text-center">
                  {task.flagSubmission ? (
                    <span className="inline-flex items-center">
                      {task.flagSubmission.submissionResult} <FlagIcon className="h-4 w-4 ml-1" />
                    </span>
                  ) : (
                    task.status
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
