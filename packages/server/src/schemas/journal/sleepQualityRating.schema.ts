import z from 'zod'

export const sleepQualitySchemaV1 = z.coerce
  .number()
  .int()
  .gte(1, { message: 'Sleep Quality cannot be less than 1.' })
  .lte(10, { message: 'Sleep Quality cannot be more than 10.' })
