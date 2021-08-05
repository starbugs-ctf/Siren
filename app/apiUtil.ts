import { BlitzApiResponse } from "blitz"
import { Prisma } from "db"
import * as z from "zod"

export const handleError = (err: any, res: BlitzApiResponse) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      msg: "Invalid input",
      meta: err.issues,
    })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      msg: "DB error: " + err.message,
      code: err.code,
      meta: err.meta,
    })
  } else {
    console.log(err)
    res.status(500).json({
      msg: "Unknown error",
    })
  }
}
