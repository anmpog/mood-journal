import { authedProcedure, router } from '../trpc'
import { z } from 'zod'

export const ActivityLogTitleEnum = z.enum([
  'SOCIALIZING',
  'PHYSICAL ACTIVITY',
  'OUTDOOR TIME',
  'MEDITATION/MINDFULNESS',
  'CREATIVE PURSUITS',
  'VOLUNTEERING',
  'REFLECTION/JOURNALING',
  'FAITH/SPIRITUALITY',
  'HOBBIES',
  'FAMILY TIME',
  'SCREEN TIME',
  'SUBSTANCE USE',
] as const)

const durationScaleSchema = z.union([
  z.object({
    value: z.literal(0),
    key: z.literal('none'),
    label: z.literal('None'),
  }),
  z.object({
    value: z.literal(1),
    key: z.literal('0_15'),
    label: z.literal('15 Minutes or Less'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('15_30'),
    label: z.literal('15-30 Minutes'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('30_60'),
    label: z.literal('30-60 Minutes'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('60_120'),
    label: z.literal('1-2 Hours'),
  }),
  z.object({
    value: z.literal(5),
    key: z.literal('120_plus'),
    label: z.literal('2+ hours'),
  }),
])

const intensityScaleSchema = z.union([
  z.object({
    value: z.literal(1),
    key: z.literal('very_light'),
    label: z.literal('Very Light'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('light'),
    label: z.literal('Light'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('moderate'),
    label: z.literal('Moderate'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('intense'),
    label: z.literal('Intense'),
  }),
  z.object({
    value: z.literal(5),
    key: z.literal('very_intense'),
    label: z.literal('Very Intense'),
  }),
])

const qualitativeScaleSchema = z.union([
  z.object({
    value: z.literal(1),
    key: z.literal('very_negative'),
    label: z.literal('Very Negative'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('negative'),
    label: z.literal('Negative'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('neutral'),
    label: z.literal('Neutral'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('somewhat_positive'),
    label: z.literal('Somewhat Positive'),
  }),
  z.object({
    value: z.literal(5),
    key: z.literal('very_positive'),
    label: z.literal('Very Positive'),
  }),
])

const quantitativeScaleSchema = z.union([
  z.object({
    value: z.literal(0),
    key: z.literal('none'),
    label: z.literal('None'),
  }),
  z.object({
    value: z.literal(1),
    key: z.literal('a_little'),
    label: z.literal('A Little'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('some'),
    label: z.literal('Some'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('quite_a_bit'),
    label: z.literal('Quite A Bit'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('a_lot'),
    label: z.literal('A Lot'),
  }),
])

const ActivityLogSchema = z.object({
  activityTitle: ActivityLogTitleEnum,
  durationRating: durationScaleSchema.optional(),
  intensityRating: intensityScaleSchema.optional(),
  qualitativeRating: qualitativeScaleSchema.optional(),
  quantitativeRating: quantitativeScaleSchema.optional(),
})

const MoodRatingSchema = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Mood Rating cannot be less than 1.' })
  .lte(10, { message: 'Mood Rating cannot be more than 10.' })

const StressRatingSchema = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Stress Rating cannot be less than 1.' })
  .lte(10, { message: 'Stress Rating cannot be more than 10.' })

const SleepHoursSchema = z.coerce
  .number()
  .int()
  .gte(0, { message: 'Sleep Hours cannot be less than 0.' })
  .lte(24, { message: 'Sleep Hours cannot be more than 24' })

const SleepQualitySchema = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Sleep Quality cannot be less than 1.' })
  .lte(10, { message: 'Sleep Quality cannot be more than 10.' })

export const JournalEntrySchema = z.object({
  userId: z.coerce.number().int(),
  moodRating: MoodRatingSchema,
  stressRating: StressRatingSchema,
  sleepHours: SleepHoursSchema,
  sleepQuality: SleepQualitySchema,
  activities: z.array(ActivityLogSchema),
})

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
            durationRating: durationRating?.value,
            itensityRating: intensityRating?.value,
            qualitativeRating: qualitativeRating?.value,
            quantitativeRating: quantitativeRating?.value,
          }
        }
      )

      console.log('Formatted activitiess: ', formattedActivities)

      const journalEntry = await ctx.prisma.journalEntry.create({
        data: {
          userId: input.userId,
          moodRating: input.moodRating,
          stressRating: input.stressRating,
          sleepHours: input.sleepHours,
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
