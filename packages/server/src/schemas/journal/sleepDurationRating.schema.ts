import z from 'zod'

export const sleepDurationSchemaV1 = z.coerce
  .number()
  .int()
  .gte(0, { message: 'Sleep Hours cannot be less than 0.' })
  .lte(24, { message: 'Sleep Hours cannot be more than 24' })
