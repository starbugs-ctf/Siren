import { ReactNode } from "react"
import { PuffLoader } from "react-spinners"
import { CheckIcon, XIcon } from "@heroicons/react/solid"
import { GetTasksForRoundReturnType } from "app/queries/getTasksForRound"

type RotatedHeaderProps = {
  children?: ReactNode
  disabled?: boolean
}

export const RotatedHeader = (props: RotatedHeaderProps) => {
  return (
    <th className="rotate">
      <div>
        <span className={props.disabled ? "text-gray-300" : ""}>{props.children}</span>
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
  let all_canceled = true
  for (const task of tasks) {
    if (task.flagSubmission?.submissionResult === "CORRECT") {
      return <OkayCell key={key} />
    } else if (task.status === "PENDING" || task.status === "RUNNING") {
      pending = true
    }

    if (task.status !== "CANCELED") {
      all_canceled = false
    }
  }

  if (pending) {
    return <LoadingCell key={key} />
  } else if (all_canceled) {
    return <EmptyCell key={key} />
  } else {
    return <FailCell key={key} />
  }
}
