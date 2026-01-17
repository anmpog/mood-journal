import { JournalEntrySchema } from 'src/schemas/journal/journalEntry.schema'
import { authedProcedure, router } from '../trpc'

export const JournalRouter = router({
  createJournalEntry: authedProcedure
    .input(JournalEntrySchema)
    .mutation(async ({ input, ctx }) => {
      console.log('Input to mutation: ', input)
      console.log('Activities: ', input.activities)

      const formattedActivities = input.activities.map(
        ({
          activityTitle,
          durationRating,
          intensityRating,
          qualitativeRating,
          quantitativeRating,
        }) => {
          return {
            activityTitle,
            durationRating: durationRating,
            intensityRating: intensityRating,
            qualitativeRating: qualitativeRating,
            quantitativeRating: quantitativeRating,
          }
        }
      )

      console.log('Formatted activitiess: ', formattedActivities)

      const journalEntry = await ctx.prisma.journalEntry.create({
        data: {
          userId: input.userId,
          moodRating: input.moodRating,
          stressRating: input.stressRating,
          sleepDuration: input.sleepDuration,
          sleepQuality: input.sleepQuality,
          activities: {
            create: [...formattedActivities],
          },
        },
        include: {
          activities: true,
        },
      })

      return journalEntry
    }),
})

