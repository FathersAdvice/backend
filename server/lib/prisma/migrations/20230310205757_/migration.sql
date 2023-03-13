-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "Advice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "describe" TEXT NOT NULL,
    "date_time_create" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_time_update" BIGINT NOT NULL,
    CONSTRAINT "Advice_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);