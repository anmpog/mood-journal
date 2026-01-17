import z from 'zod'
import { ActivityLogSchema } from './activityLog.schema'
import {
  moodRatingSchemaV1,
  sleepDurationSchemaV1,
  sleepQualitySchemaV1,
  stressRatingSchemaV1,
} from './index'

export const JournalEntrySchema = z.object({
  userId: z.coerce.number().int(),
  moodRating: moodRatingSchemaV1,
  stressRating: stressRatingSchemaV1,
  sleepDuration: sleepDurationSchemaV1,
  sleepQuality: sleepQualitySchemaV1,
  activities: z.array(ActivityLogSchema),
})
