/*
  Warnings:

  - You are about to drop the column `alias` on the `Round` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FlagSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "submissionTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flag" TEXT NOT NULL,
    "submissionResult" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FlagSubmission" ("flag", "id", "message", "submissionResult", "submissionTime", "taskId") SELECT "flag", "id", "message", "submissionResult", "submissionTime", "taskId" FROM "FlagSubmission";
DROP TABLE "FlagSubmission";
ALTER TABLE "new_FlagSubmission" RENAME TO "FlagSubmission";
CREATE UNIQUE INDEX "FlagSubmission_taskId_unique" ON "FlagSubmission"("taskId");
CREATE TABLE "new_Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Round" ("id") SELECT "id" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "statusMessage" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roundId" INTEGER NOT NULL,
    "stdout" TEXT,
    "stderr" TEXT,
    "exploitId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("exploitId") REFERENCES "Exploit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "exploitId", "id", "roundId", "status", "statusMessage", "stderr", "stdout", "teamId") SELECT "createdAt", "exploitId", "id", "roundId", "status", "statusMessage", "stderr", "stdout", "teamId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
