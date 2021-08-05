import { useState } from "react"
import { Link, Routes, useQuery } from "blitz"
import { FlagIcon } from "@heroicons/react/outline"
import getTasksForRound from "app/queries/getTasksForRound"
import { TaskQueryReturnType } from "app/queries/getTask"
import KeywordChip from "./KeywordChip"
import TaskModal from "./TaskModal"

type TaskListProps = {
  showRound?: boolean
  tasks: TaskQueryReturnType[]
}

export const TaskList = (props: TaskListProps) => {
  const [modalState, setModalState] = useState({
    open: false,
    taskId: null,
  })
  const showModal = (taskId) => {
    setModalState({
      open: true,
      taskId,
    })
  }
  const closeModal = () => {
    setModalState({
      open: false,
      taskId: null,
    })
  }
  const { open, taskId } = modalState
  return (
    <>
      <TaskModal open={open} onClose={closeModal} taskId={taskId}></TaskModal>
      <table className="data">
        <thead>
          <tr>
            <th className="text-left">Task #</th>
            {props.showRound && <th className="text-left">Round #</th>}
            <th className="text-left">Problem</th>
            <th className="text-left">Exploit</th>
            <th className="text-left">Target</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>
                  <a onClick={(e) => showModal(task.id)}>{task.id}</a>
                </td>
                {props.showRound && (
                  <td>
                    <Link href={Routes.RoundDetail({ roundId: task.roundId })}>
                      <a>Round {task.roundId}</a>
                    </Link>
                  </td>
                )}
                <td>{task.exploit.problem.name}</td>
                <td>
                  <Link href={Routes.ExploitDetail({ exploitId: task.exploit.id })}>
                    <a>{task.exploit.name}</a>
                  </Link>
                </td>
                <td>{task.team.name}</td>
                <td>
                  {task.flagSubmission ? (
                    <KeywordChip
                      text={task.flagSubmission.submissionResult}
                      icon={<FlagIcon className="h-4 w-4 ml-1" />}
                    />
                  ) : (
                    <KeywordChip text={task.status} />
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
      <TaskList tasks={tasks} />
    </>
  )
}
