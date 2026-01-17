import { prisma as PrismaClient } from '../prisma'

export default async function listUserJournalEntries({
  prisma,
  userId,
  limit,
  cursor,
}: {
  prisma: typeof PrismaClient
  userId: number
  limit: number
  cursor?: string
}) {
  const userRecentEntries = await prisma.journalEntry.findMany({
    take: limit,
    where: { userId },
    orderBy: { createdAt: 'asc' },
    include: { activities: true },
  })

  const totalEntries = await prisma.journalEntry.count({ where: { userId } })

  return { totalEntries, userRecentEntries }
}
