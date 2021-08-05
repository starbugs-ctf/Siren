import { handleError } from "app/apiUtil"
import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"
import * as z from "zod"

// TODO: flag submission cannot be modified through API right now

const CreateFlagSchema = z.object({
  taskId: z.number(),
  submissionTime: z.date().optional(),
  flag: z.string(),
  submissionResult: z.enum([
    "CORRECT",
    "DUPLICATE",
    "WRONG",
    "EXPIRED",
    "SKIPPED",
    "UNKNOWN_ERROR",
  ]),
  message: z.string().optional(),
})

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({
      msg: "Method not allowed",
    })
    return
  }

  // Create a new task
  try {
    const args = CreateFlagSchema.parse(req.body)

    const flag = await db.flagSubmission.create({
      data: {
        ...args,
      },
    })

    res.status(200).json(flag)
  } catch (err) {
    handleError(err, res)
  }
}

export default handler
