import { useQuery } from "blitz"
import getAllTeams from "app/queries/getAllTeams"
import { CheckIcon, XIcon } from "@heroicons/react/solid"
import { PuffLoader } from "react-spinners"

type RoundDashboardProps = {
  round: number
}

export const RoundDashboard = (props: RoundDashboardProps) => {
  const [teams] = useQuery(getAllTeams, null)

  return (
    <table className="dashboard">
      <thead>
        <tr>
          <th>Round 100</th>
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
          <th className="rotate">
            <div>
              <span>Problem</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team.slug}>
            <td className="team">{team.name}</td>
            <td className="cell okay">
              <CheckIcon className="h-5 w-5 text-green-600" />
            </td>
            <td className="cell fail">
              <XIcon className="h-5 w-5 text-red-600" />
            </td>
            <td className="cell">
              <PuffLoader size="20px" color="#999" />
            </td>
            <td className="cell">-</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RoundDashboard
