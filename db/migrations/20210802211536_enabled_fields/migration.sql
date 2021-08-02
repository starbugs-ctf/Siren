-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aux" TEXT NOT NULL
);
INSERT INTO "new_Problem" ("aux", "id", "name", "slug") SELECT "aux", "id", "name", "slug" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
CREATE UNIQUE INDEX "Problem.slug_unique" ON "Problem"("slug");
CREATE TABLE "new_Exploit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exploit" ("createdAt", "id", "key", "name", "problemId") SELECT "createdAt", "id", "key", "name", "problemId" FROM "Exploit";
DROP TABLE "Exploit";
ALTER TABLE "new_Exploit" RENAME TO "Exploit";
CREATE UNIQUE INDEX "Exploit.key_unique" ON "Exploit"("key");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
