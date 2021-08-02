import { addDays, addHours, addSeconds, subDays } from "date-fns"
import chance from "chance"
import Prob from "prob.js"
import db, { Round } from "./index"

const TOTAL_DAYS = 3

const START_HOUR = 8
const END_HOUR = 18

const dayToRoundDurationSeconds = (day) => {
  if (day === TOTAL_DAYS - 1) {
    // Last day: 5 minutes
    return 5 * 60
  } else {
    // Other days: 10 minutes
    return 10 * 60
  }
}

const Chance = chance()

const TASK_STATUS = [
  "OKAY",
  "OKAY",
  "OKAY",
  "OKAY",
  "PENDING",
  "RUNNING",
  "RUNTIME_ERROR",
  "TIMEOUT",
]
const FLAG_STATUS = [
  "CORRECT",
  "CORRECT",
  "CORRECT",
  "CORRECT",
  "CORRECT",
  "DUPLICATE",
  "WRONG",
  "EXPIRED",
  "SKIPPED",
  "UNKNOWN_ERROR",
]

const createTeams = async () => {
  await db.team.create({
    data: {
      name: "A*0*E",
      slug: "a0e",
      aux: "1",
    },
  })

  await db.team.create({
    data: {
      name: "PPP",
      slug: "ppp",
      aux: "2",
    },
  })

  await db.team.create({
    data: {
      name: "HITCON ⚔ Balsn",
      slug: "hitcon-balsn",
      aux: "3",
    },
  })

  await db.team.create({
    data: {
      name: "Tea Deliverers",
      slug: "tea-deliverers",
      aux: "4",
    },
  })

  await db.team.create({
    data: {
      name: "More Bush Smoked Whackers",
      slug: "more-bush-smoked-whackers",
      aux: "5",
    },
  })

  await db.team.create({
    data: {
      name: "侍",
      slug: "samurai",
      aux: "6",
    },
  })

  await db.team.create({
    data: {
      name: "Shellphish",
      slug: "shellphish",
      aux: "7",
    },
  })

  await db.team.create({
    data: {
      name: "CyKor",
      slug: "cykor",
      aux: "8",
    },
  })

  await db.team.create({
    data: {
      name: "/bin/tw",
      slug: "bin-tw",
      aux: "9",
    },
  })

  await db.team.create({
    data: {
      name: "NorseCode",
      slug: "norse-code",
      aux: "10",
    },
  })

  await db.team.create({
    data: {
      name: "Star-Bugs",
      slug: "starbugs",
      aux: "11",
    },
  })

  await db.team.create({
    data: {
      name: "koreanbadass",
      slug: "koreanbadass",
      aux: "12",
    },
  })

  await db.team.create({
    data: {
      name: "mhackeroni",
      slug: "mhackeroni",
      aux: "13",
    },
  })

  await db.team.create({
    data: {
      name: "r3kapig",
      slug: "r3kapig",
      aux: "14",
    },
  })

  await db.team.create({
    data: {
      name: "RPISEC",
      slug: "rpisec",
      aux: "15",
    },
  })

  await db.team.create({
    data: {
      name: "pasten",
      slug: "pasten",
      aux: "16",
    },
  })
}

const createProblems = async () => {
  await db.problem.create({
    data: {
      name: "parallel-af",
      slug: "parallel-af",
      aux: "8001",
    },
  })

  await db.problem.create({
    data: {
      name: "rorschach",
      slug: "rorschach",
      aux: "8002",
    },
  })

  await db.problem.create({
    data: {
      name: "rhg",
      slug: "rhg",
      aux: "8003",
    },
  })

  await db.problem.create({
    data: {
      name: "nooode",
      slug: "nooode",
      aux: "8004",
    },
  })

  await db.problem.create({
    data: {
      name: "bdooos",
      slug: "bdooos",
      aux: "8005",
    },
  })

  await db.problem.create({
    data: {
      name: "sloootmachine",
      slug: "sloootmachine",
      aux: "8006",
    },
  })

  await db.problem.create({
    data: {
      name: "gameboooy",
      slug: "gameboooy",
      aux: "8007",
    },
  })
}

const createRounds = async () => {
  const firstDayStart = subDays(new Date().setHours(START_HOUR, 0, 0, 0), 1)

  for (let dayOffset = 0; dayOffset < TOTAL_DAYS; dayOffset++) {
    const todayStart = addDays(firstDayStart, dayOffset)
    const todayEnd = addHours(todayStart, END_HOUR - START_HOUR)

    const roundDurationSeconds = dayToRoundDurationSeconds(dayOffset)

    let rounds: Round[] = []
    for (let now = todayStart; now < todayEnd; now = addSeconds(now, roundDurationSeconds)) {
      rounds.push(await db.round.create({ data: {} }))
    }
    await db.roundRange.create({
      data: {
        startRoundId: rounds[0]!.id,
        endRoundId: rounds[rounds.length - 1]!.id,
        durationSeconds: roundDurationSeconds,
        startTime: todayStart,
      },
    })
  }
}

const createExploits = async () => {
  const problems = await db.problem.findMany()

  for (let problem of problems) {
    const exploitCount = Chance.integer({ min: 1, max: 3 })
    for (let i = 0; i < exploitCount; i++) {
      const exploitName = Chance.word()
      const hashLike = Math.floor(Math.random() * 0x1000000000000).toString(16)

      await db.exploit.create({
        data: {
          name: exploitName,
          key: `${exploitName}-${hashLike}`,
          problemId: problem.id,
        },
      })
    }
  }
}

const createTasks = async () => {
  const round = await db.round.findMany()
  const roundRanges = await db.roundRange.findMany()
  const problems = await db.problem.findMany()
  const teams = await db.team.findMany()

  const randNumTask = Prob.poisson(2)

  for (const roundRange of roundRanges) {
    let roundStart = roundRange.startTime
    let roundEnd = addSeconds(roundStart, roundRange.durationSeconds)

    for (let roundId = roundRange.startRoundId; roundId <= roundRange.endRoundId; roundId++) {
      console.log(`Round ${roundId} / ${round.length}`)

      for (const problem of problems) {
        const exploits = await db.exploit.findMany({
          where: {
            problemId: problem.id,
          },
        })

        for (const team of teams) {
          const taskCount: number = randNumTask()

          for (let taskId = 0; taskId < taskCount; taskId++) {
            let exploit = Chance.pickone(exploits)
            let taskStatus = Chance.pickone(TASK_STATUS)

            const taskTime = addSeconds(
              roundStart,
              Chance.integer({ min: 0, max: roundRange.durationSeconds - 1 })
            )

            let task = await db.task.create({
              data: {
                status: taskStatus,
                statusMessage: "this is a sample task message",
                createdAt: taskTime,
                roundId: roundId,
                stdout: Chance.paragraph(),
                stderr: Chance.paragraph(),
                exploitId: exploit.id,
                teamId: team.id,
              },
            })

            if (taskStatus === "OKAY") {
              await db.flagSubmission.create({
                data: {
                  flag: Chance.word(),
                  submissionResult: Chance.pickone(FLAG_STATUS),
                  message: "this is a sample flag submission message",
                  taskId: task.id,
                },
              })
            }
          }
        }
      }

      roundStart = roundEnd
      roundEnd = addSeconds(roundStart, roundRange.durationSeconds)
    }
  }
}

// Use `blitz prisma migrate reset -f && blitz db seed` to quickly setup test DB

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await createTeams()
  await createProblems()

  await createRounds()
  await createExploits()
  await createTasks()
}

export default seed
