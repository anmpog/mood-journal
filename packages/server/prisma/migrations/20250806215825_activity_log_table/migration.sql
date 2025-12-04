/*
  Warnings:

  - You are about to drop the column `activities` on the `JournalEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "activities";

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" SERIAL NOT NULL,
    "journalEntryId" INTEGER NOT NULL,
    "activityTitle" TEXT NOT NULL,
    "durationRating" INTEGER,
    "intensityRating" INTEGER,
    "qualitativeRating" INTEGER,
    "quantitativeRating" INTEGER,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
