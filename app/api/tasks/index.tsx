import { handleError } from "app/apiUtil"
import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"
import * as z from "zod"

const CreateTaskSchema = z.object({
  createdAt: z.date().optional(),
  roundId: z.number(),
  exploitId: z.number(),
  teamId: z.number(),
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
    const args = CreateTaskSchema.parse(req.body)

    // ensure round exists
    await db.round.upsert({
      where: {
        id: args.roundId,
      },
      update: {},
      create: {
        id: args.roundId,
      },
    })

    const task = await db.task.create({
      data: {
        status: "PENDING",
        statusMessage: "",
        ...args,
      },
      include: {
        flagSubmission: true,
      },
    })

    res.status(200).json(task)
  } catch (err) {
    handleError(err, res)
  }
}

export default handler
