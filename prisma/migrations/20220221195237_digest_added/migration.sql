/*
  Warnings:

  - Added the required column `digest` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "added" DATETIME NOT NULL,
    "digest" TEXT NOT NULL
);
INSERT INTO "new_File" ("added", "id", "path", "size") SELECT "added", "id", "path", "size" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
