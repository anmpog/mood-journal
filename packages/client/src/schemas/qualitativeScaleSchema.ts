import { z } from 'zod'

export const qualitativeScaleUIOptions = [
  {
    value: 1,
    key: 'very_negative',
    label: 'Very Negative',
  },
  {
    value: 2,
    key: 'negative',
    label: 'Negative',
  },
  {
    value: 3,
    key: 'neutral',
    label: 'Neutral',
  },
  {
    value: 4,
    key: 'somewhat_positive',
    label: 'Somewhat Positive',
  },
  {
    value: 5,
    key: 'very_positive',
    label: 'Very Positive',
  },
]

export const qualitativeScaleOptions = [
  z.object({
    value: z.literal(1),
    key: z.literal('very_negative'),
    label: z.literal('Very Negative'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('negative'),
    label: z.literal('Negative'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('neutral'),
    label: z.literal('Neutral'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('somewhat_positive'),
    label: z.literal('Somewhat Positive'),
  }),
  z.object({
    value: z.literal(5),
    key: z.literal('very_positive'),
    label: z.literal('Very Positive'),
  }),
]

export const qualitativeScaleSchema = z.union(qualitativeScaleOptions)
