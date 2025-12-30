/*
  Warnings:

  - You are about to drop the column `sleepHours` on the `JournalEntry` table. All the data in the column will be lost.
  - Added the required column `sleepDuration` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "sleepHours",
ADD COLUMN     "sleepDuration" INTEGER NOT NULL;
