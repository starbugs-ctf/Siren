import { handleError } from "app/apiUtil"
import { BlitzApiRequest, BlitzApiResponse, BlitzApiHandler } from "blitz"
import db from "db"
import * as z from "zod"

const EndpointSchema = z.object({
  teamId: z.number(),
  problemId: z.number(),
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
    const args = EndpointSchema.parse(req.body)

    const team = await db.team.findUnique({
      where: {
        id: args.teamId,
      },
      rejectOnNotFound: true,
    })
    const problem = await db.problem.findUnique({
      where: {
        id: args.problemId,
      },
      rejectOnNotFound: true,
    })

    // This part needs to be CTF-specific
    // We hardcode it for now
    res.status(200).json({
      host: `10.13.37.${team.aux}`,
      port: problem.aux,
    })
  } catch (err) {
    handleError(err, res)
  }
}

export default handler
