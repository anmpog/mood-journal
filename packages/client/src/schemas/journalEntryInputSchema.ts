import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { z } from 'zod'
import { activityDurationScale } from '../scales/activityDurationScale'
import { intensityScale } from '../scales/intensityScale'
import { qualitativeScale } from '../scales/qualitativeScale'
import {
  quantitativeScale
} from '../scales/quantitativeScale'

export const activityEntrySchema = z.object({
  activityTitle: activityLogTitleEnum,
  durationRating: activityDurationScale,
  intensityRating: intensityScale,
  qualitativeRating: qualitativeScale,
  quantitativeRating: quantitativeScale,
})

export const journalEntryInputSchema = z.object({
  moodRating: z
    .number()
    .int()
    .gte(1, { message: 'Mood Rating cannot be less than 1.' })
    .lte(10, { message: 'Mood Rating cannot be more than 10.' }),
  stressRating: z
    .number()
    .int()
    .gte(1, { message: 'Stress Rating cannot be less than 1.' })
    .lte(10, { message: 'Stress Rating cannot be more than 10.' }),
  sleepDuration: z
    .number()
    .int()
    .gte(0, { message: 'Sleep Hours cannot be less than 0.' })
    .lte(24, { message: 'Sleep Hours cannot be more than 24' }),
  sleepQuality: z
    .number()
    .int()
    .gte(1, { message: 'Sleep Quality cannot be less than 1.' })
    .lte(10, { message: 'Sleep Quality cannot be more than 10.' }),
  activities: z.array(activityEntrySchema),
})
