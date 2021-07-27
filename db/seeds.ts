import db from "./index"

const createTeams = async () => {
  await db.team.create({
    data: {
      name: "StarBugs",
      slug: "starbugs",
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
      name: "Samurai",
      slug: "samurai",
      aux: "3",
    },
  })

  await db.team.create({
    data: {
      name: "Perfect ⚔️ Guesser",
      slug: "perfect-guesser",
      aux: "4",
    },
  })

  await db.team.create({
    data: {
      name: "r3kapig",
      slug: "r3kapig",
      aux: "5",
    },
  })

  await db.team.create({
    data: {
      name: "DiceGang",
      slug: "dicegang",
      aux: "6",
    },
  })
}

const createProblems = async () => {
  await db.problem.create({
    data: {
      name: "Baby",
      slug: "baby",
      aux: "8001",
    },
  })

  await db.problem.create({
    data: {
      name: "Easy",
      slug: "easy",
      aux: "8002",
    },
  })

  await db.problem.create({
    data: {
      name: "Hard",
      slug: "hard",
      aux: "8003",
    },
  })
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
}

export default seed
