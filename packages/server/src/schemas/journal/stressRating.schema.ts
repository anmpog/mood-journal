import z from 'zod'

export const stressRatingSchemaV1 = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Stress Rating cannot be less than 1.' })
  .lte(10, { message: 'Stress Rating cannot be more than 10.' })
