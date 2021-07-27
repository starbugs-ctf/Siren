-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT
);

-- CreateTable
CREATE TABLE "RoundRange" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startRoundId" INTEGER NOT NULL,
    "endRoundId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "durationSeconds" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aux" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aux" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exploit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "alias" TEXT,
    "problemId" INTEGER NOT NULL,
    FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "statusMessage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roundId" INTEGER,
    "stdout" TEXT,
    "stderr" TEXT,
    "exploitId" INTEGER NOT NULL,
    "teamId" INTEGER,
    FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("exploitId") REFERENCES "Exploit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlagSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "submissionTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flag" TEXT NOT NULL,
    "submissionResult" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Team.slug_unique" ON "Team"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Problem.slug_unique" ON "Problem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FlagSubmission_taskId_unique" ON "FlagSubmission"("taskId");
