import { z } from 'zod'

export const quantitativeScaleUIOptions = [
  {
    value: 0,
    key: 'none',
    label: 'None',
  },
  {
    value: 1,
    key: 'a_little',
    label: 'A Little',
  },
  {
    value: 2,
    key: 'some',
    label: 'Some',
  },
  {
    value: 3,
    key: 'quite_a_bit',
    label: 'Quite A Bit',
  },
  {
    value: 4,
    key: 'a_lot',
    label: 'A Lot',
  },
]

export const quantitativeScaleOptions = [
  z.object({
    value: z.literal(0),
    key: z.literal('none'),
    label: z.literal('None'),
  }),
  z.object({
    value: z.literal(1),
    key: z.literal('a_little'),
    label: z.literal('A Little'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('some'),
    label: z.literal('Some'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('quite_a_bit'),
    label: z.literal('Quite A Bit'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('a_lot'),
    label: z.literal('A Lot'),
  }),
]

export const quantitativeScaleSchema = z.union(quantitativeScaleOptions)
