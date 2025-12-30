import z from 'zod'

export const moodRatingSchemaV1 = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Mood Rating cannot be less than 1.' })
  .lte(10, { message: 'Mood Rating cannot be more than 10.' })
