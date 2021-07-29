/*
  Warnings:

  - Made the column `teamId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "statusMessage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roundId" INTEGER,
    "stdout" TEXT,
    "stderr" TEXT,
    "exploitId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("exploitId") REFERENCES "Exploit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "exploitId", "id", "roundId", "status", "statusMessage", "stderr", "stdout", "teamId") SELECT "createdAt", "exploitId", "id", "roundId", "status", "statusMessage", "stderr", "stdout", "teamId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
