import { ActivityLogTitleEnumV1 } from 'src/enums'
import z from 'zod'
import {
  activityDurationSchemaV1,
  intensitySchemaV1,
  qualitativeSchemaV1,
  quantitativeSchemaV1,
} from './index'

export const ActivityLogSchema = z.object({
  activityTitle: ActivityLogTitleEnumV1,
  durationRating: activityDurationSchemaV1.optional(),
  intensityRating: intensitySchemaV1.optional(),
  qualitativeRating: qualitativeSchemaV1.optional(),
  quantitativeRating: quantitativeSchemaV1.optional(),
})
