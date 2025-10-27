import { z } from 'zod'
import { ActivityLogTitleEnum } from '../enums/ActivityLogTitle'

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
    key: z.literal('30-60'),
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

export const qualitativeScaleSchema = z.union([
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

export const quantitativeScaleSchema = z.union([
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

export const JournalEntrySchema = z.object({
  userId: z.coerce.number().int(),
  moodRating: z
    .number()
    .int()
    .min(1, { error: 'Mood Rating cannot be less than 1.' })
    .max(10, { error: 'Mood Rating cannot be more than 10.' }),
  stressRating: z
    .number()
    .int()
    .min(1, { error: 'Stress Rating cannot be less than 1.' })
    .max(10, { error: 'Stress Rating cannot be more than 10.' }),
  sleepHours: z
    .number()
    .int()
    .min(0, { error: 'Sleep Hours cannot be less than 0.' })
    .max(24, { error: 'Sleep Hours cannot be more than 24' }),
  sleepQuality: z
    .number()
    .int()
    .min(1, { error: 'Sleep Quality cannot be less than 1.' })
    .max(10, { error: 'Sleep Quality cannot be more than 10.' }),
  activities: z.array(ActivityLogSchema),
})
