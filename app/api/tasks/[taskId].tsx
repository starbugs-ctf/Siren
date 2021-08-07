import { handleError } from "app/apiUtil"
import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"
import * as z from "zod"

const PutTaskSchema = z.object({
  status: z.enum(["RUNNING", "OKAY", "RUNTIME_ERROR", "TIMEOUT", "CANCELED"]).optional(),
  statusMessage: z.string().optional(),
  stdout: z.string().optional(),
  stderr: z.string().optional(),
})

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method !== "GET" && req.method !== "PUT") {
    res.status(405).json({
      msg: "Method not allowed",
    })
    return
  }

  try {
    if (req.query.taskId === undefined || Array.isArray(req.query.taskId)) {
      res.status(400).json({
        msg: "There should be one and only one task ID",
      })
      return
    }

    const taskId = parseInt(req.query.taskId, 10)

    if (req.method === "GET") {
      const task = await db.task.findUnique({
        where: {
          id: taskId,
        },
        include: {
          flagSubmission: true,
        },
        rejectOnNotFound: true,
      })

      res.status(200).json(task)
    } else if (req.method === "PUT") {
      const args = PutTaskSchema.parse(req.body)

      const task = await db.task.update({
        data: args,
        where: {
          id: taskId,
        },
        include: {
          flagSubmission: true,
        },
      })

      res.status(200).json(task)
    }
  } catch (err) {
    handleError(err, res)
  }
}

export default handler
