import { useQuery } from "blitz"
import getAllTeams from "app/queries/getAllTeams"

type RoundDashboardProps = {
  round: number
}

export const RoundDashboard = (props: RoundDashboardProps) => {
  const [teams] = useQuery(getAllTeams, null)

  return (
    <>
      <h1>Round {props.round}</h1>
      <table className="dashboard">
        <thead>
          <tr>
            <th></th>
            <th className="rotate">
              <div>
                <span>Long column 1</span>
              </div>
            </th>
            <th className="rotate">
              <div>
                <span>Long column 2</span>
              </div>
            </th>
            <th className="rotate">
              <div>
                <span>Short</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.slug}>
              <td className="team">{team.name}</td>
              <td className="cell">A</td>
              <td className="cell">B</td>
              <td className="cell">C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default RoundDashboard
