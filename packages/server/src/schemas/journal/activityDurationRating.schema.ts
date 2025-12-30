import z from 'zod'

// Activity Duration Scale
// const activityDurationScaleSchema = z.union([
//   z.object({
//     value: z.literal(0),
//     key: z.literal('none'),
//     label: z.literal('None'),
//   }),
//   z.object({
//     value: z.literal(1),
//     key: z.literal('0_15'),
//     label: z.literal('15 Minutes or Less'),
//   }),
//   z.object({
//     value: z.literal(2),
//     key: z.literal('15_30'),
//     label: z.literal('15-30 Minutes'),
//   }),
//   z.object({
//     value: z.literal(3),
//     key: z.literal('30_60'),
//     label: z.literal('30-60 Minutes'),
//   }),
//   z.object({
//     value: z.literal(4),
//     key: z.literal('60_120'),
//     label: z.literal('1-2 Hours'),
//   }),
//   z.object({
//     value: z.literal(5),
//     key: z.literal('120_plus'),
//     label: z.literal('2+ hours'),
//   }),
// ])

export const activityDurationSchemaV1 = z.coerce
  .number()
  .int()
  .gte(0, { message: 'Activity Duration cannot be less than 0.' })
  .lte(5, { message: 'Activity Duration cannot be greater than 5.' })
