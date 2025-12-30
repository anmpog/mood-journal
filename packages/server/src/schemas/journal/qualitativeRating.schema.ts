import z from 'zod'

// const qualitativeScale = z.union([
//   z.object({
//     value: z.literal(1),
//     key: z.literal('very_negative'),
//     label: z.literal('Very Negative'),
//   }),
//   z.object({
//     value: z.literal(2),
//     key: z.literal('negative'),
//     label: z.literal('Negative'),
//   }),
//   z.object({
//     value: z.literal(3),
//     key: z.literal('neutral'),
//     label: z.literal('Neutral'),
//   }),
//   z.object({
//     value: z.literal(4),
//     key: z.literal('somewhat_positive'),
//     label: z.literal('Somewhat Positive'),
//   }),
//   z.object({
//     value: z.literal(5),
//     key: z.literal('very_positive'),
//     label: z.literal('Very Positive'),
//   }),
// ])

export const qualitativeSchemaV1 = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Quality cannot be less than 1.' })
  .lte(5, { message: 'Quality cannot be greater than 5.' })
