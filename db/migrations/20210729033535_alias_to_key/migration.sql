/*
  Warnings:

  - You are about to drop the column `alias` on the `Exploit` table. All the data in the column will be lost.
  - Added the required column `key` to the `Exploit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exploit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exploit" ("id", "name", "problemId") SELECT "id", "name", "problemId" FROM "Exploit";
DROP TABLE "Exploit";
ALTER TABLE "new_Exploit" RENAME TO "Exploit";
CREATE UNIQUE INDEX "Exploit.key_unique" ON "Exploit"("key");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
