-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "moodRating" INTEGER NOT NULL,
    "stressRating" INTEGER NOT NULL,
    "activities" TEXT[],
    "sleepHours" INTEGER NOT NULL,
    "sleepQuality" INTEGER NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
