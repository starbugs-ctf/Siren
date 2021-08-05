import { BlitzPage, Link, NotFoundError, Routes, useParam, useQuery } from "blitz"
import { format } from "date-fns"
import Layout from "app/core/layouts/Layout"
import getTask from "app/queries/getTask"
import KeywordChip from "app/components/KeywordChip"
import { DATE_FORMAT } from "app/timeUtil"

type TaskViewProps = {
  taskId: number
}

export const TaskView = (props: TaskViewProps) => {
  // suspense false to prvent loading page, make modal happy
  const [task] = useQuery(getTask, props.taskId, { suspense: false })

  // before query completes, task will be null
  if (!task) return <div>loading</div>

  return (
    <div className="detail">
      <p>
        Created at {format(task.createdAt, DATE_FORMAT)}{" "}
        {task.roundId ? (
          <>
            (
            <Link href={Routes.RoundDetail({ roundId: task.roundId })}>
              <a>Round {task.roundId}</a>
            </Link>
            )
          </>
        ) : (
          ""
        )}
      </p>

      <h2 className="header">Target</h2>
      <p>
        <span className="label">Problem</span>
        {task.exploit.problem.name}
      </p>
      <p>
        <span className="label">Exploit</span>
        <Link href={Routes.ExploitDetail({ exploitId: task.exploitId })}>
          <a>{task.exploit.name}</a>
        </Link>
      </p>
      <p>
        <span className="label">Team</span>
        {task.team.name}
      </p>

      <h2 className="header">Flag</h2>
      {task.flagSubmission ? (
        <>
          <p>
            <span className="label">Flag</span>
            {task.flagSubmission.flag}
          </p>
          <p>
            <span className="label">Result</span>
            <KeywordChip text={task.flagSubmission.submissionResult} />
            <small className="side">{task.flagSubmission.message}</small>
          </p>
        </>
      ) : (
        <p>Did not generate any flag</p>
      )}

      <h2 className="header">Status</h2>
      <p>
        <span className="label">Status</span>
        <KeywordChip text={task.status} />
        <small className="side">{task.statusMessage}</small>
      </p>
      <div className="flex flex-row">
        <div className="flex-1 m-3">
          <h3 className="bg-gray-100 text-gray-700 px-3 py-1 font-semibold">stdout</h3>
          <div className="px-4 py-2 border">
            <code>{task.stdout}</code>
          </div>
        </div>
        <div className="flex-1 m-3">
          <h3 className="bg-gray-100 text-gray-700 px-3 py-1 font-semibold">stderr</h3>
          <div className="px-4 py-2 border">
            <code>{task.stderr}</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskView
