import z from 'zod'

// const intensityScale = z.union([
//   z.object({
//     value: z.literal(1),
//     key: z.literal('very_light'),
//     label: z.literal('Very Light'),
//   }),
//   z.object({
//     value: z.literal(2),
//     key: z.literal('light'),
//     label: z.literal('Light'),
//   }),
//   z.object({
//     value: z.literal(3),
//     key: z.literal('moderate'),
//     label: z.literal('Moderate'),
//   }),
//   z.object({
//     value: z.literal(4),
//     key: z.literal('intense'),
//     label: z.literal('Intense'),
//   }),
//   z.object({
//     value: z.literal(5),
//     key: z.literal('very_intense'),
//     label: z.literal('Very Intense'),
//   }),
// ])

export const intensitySchemaV1 = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Intensity cannot be less than 1.' })
  .lte(5, { message: 'Intensity cannot be greater than 5.' })
