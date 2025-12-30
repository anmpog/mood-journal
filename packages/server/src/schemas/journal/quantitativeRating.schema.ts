import z from 'zod'

// const quantitativeScale = z.union([
//   z.object({
//     value: z.literal(0),
//     key: z.literal('none'),
//     label: z.literal('None'),
//   }),
//   z.object({
//     value: z.literal(1),
//     key: z.literal('a_little'),
//     label: z.literal('A Little'),
//   }),
//   z.object({
//     value: z.literal(2),
//     key: z.literal('some'),
//     label: z.literal('Some'),
//   }),
//   z.object({
//     value: z.literal(3),
//     key: z.literal('quite_a_bit'),
//     label: z.literal('Quite A Bit'),
//   }),
//   z.object({
//     value: z.literal(4),
//     key: z.literal('a_lot'),
//     label: z.literal('A Lot'),
//   }),
// ])

export const quantitativeSchemaV1 = z.coerce
  .number()
  .int()
  .gte(0, { message: 'Quantity cannot be less than 0.' })
  .lte(4, { message: 'Quantity cannot be more than 4.' })
