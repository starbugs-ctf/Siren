import { useQuery } from "blitz"
import getAllTeams from "app/queries/getAllTeams"
import getAllProblems from "app/queries/getAllProblems"
import getTasksForRound from "app/queries/getTasksForRound"

import { RotatedHeader, taskListToCell } from "./Dashboard"
import { RoundDisplay } from "./RoundDisplay"

type RoundDashboardProps = {
  round: number
}

export const RoundDashboard = (props: RoundDashboardProps) => {
  const [teams] = useQuery(getAllTeams, null)
  const [problems] = useQuery(getAllProblems, null)
  const [tasks] = useQuery(getTasksForRound, props.round)

  const taskMap = {}
  for (const team of teams) {
    taskMap[team.id] = {}
    for (const problem of problems) {
      taskMap[team.id][problem.id] = []
    }
  }

  for (const task of tasks) {
    taskMap[task.team.id][task.exploit.problemId].push(task)
  }

  return (
    <table className="dashboard">
      <thead>
        <tr>
          <th className="border border-gray-400">
            <RoundDisplay round={props.round} />
          </th>
          {problems.map((problem) => (
            <RotatedHeader key={problem.slug} disabled={!problem.enabled}>
              {problem.name}
            </RotatedHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team.slug}>
            <td className="team">{team.name}</td>
            {problems.map((problem) =>
              taskListToCell(taskMap[team.id][problem.id], `${team.id}-${problem.id}`)
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RoundDashboard
