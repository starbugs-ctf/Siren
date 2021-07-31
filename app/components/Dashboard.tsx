import { ReactNode } from "react"
import { PuffLoader } from "react-spinners"
import { CheckIcon, XIcon } from "@heroicons/react/solid"
import { GetTasksForRoundReturnType } from "app/queries/getTasksForRound"

type RotatedHeaderProps = {
  children?: ReactNode
}

export const RotatedHeader = (props: RotatedHeaderProps) => {
  return (
    <th className="rotate">
      <div>
        <span>{props.children}</span>
      </div>
    </th>
  )
}

export const OkayCell = () => {
  return (
    <td className="cell okay">
      <CheckIcon className="h-5 w-5 text-green-600" />
    </td>
  )
}

export const FailCell = () => {
  return (
    <td className="cell fail">
      <XIcon className="h-5 w-5 text-red-600" />
    </td>
  )
}

export const LoadingCell = () => {
  return (
    <td className="cell">
      <PuffLoader size="20px" color="#999" />
    </td>
  )
}

export const EmptyCell = () => {
  return <td className="cell">-</td>
}

export const taskListToCell = (tasks: GetTasksForRoundReturnType, key: string) => {
  if (tasks.length === 0) {
    return <EmptyCell key={key} />
  }

  let pending = false
  for (const task of tasks) {
    if (task.flagSubmission?.submissionResult === "CORRECT") {
      return <OkayCell key={key} />
    } else if (task.status === "PENDING" || task.status === "RUNNING") {
      pending = true
    }
  }

  if (pending) {
    return <LoadingCell key={key} />
  } else {
    return <FailCell key={key} />
  }
}
