import { z } from 'zod'

export const intensityScaleUIOptions = [
  {
    value: 1,
    key: 'very_light',
    label: 'Very Light',
  },
  {
    value: 2,
    key: 'light',
    label: 'Light',
  },
  {
    value: 3,
    key: 'moderate',
    label: 'Moderate',
  },
  {
    value: 4,
    key: 'intense',
    label: 'Intense',
  },
  {
    value: 5,
    key: 'very_intense',
    label: 'Very Intense',
  },
]

export const intensityScaleOptions = [
  z.object({
    value: z.literal(1),
    key: z.literal('very_light'),
    label: z.literal('Very Light'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('light'),
    label: z.literal('Light'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('moderate'),
    label: z.literal('Moderate'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('intense'),
    label: z.literal('Intense'),
  }),
  z.object({
    value: z.literal(5),
    key: z.literal('very_intense'),
    label: z.literal('Very Intense'),
  }),
]

export const intensityScaleSchema = z.union(intensityScaleOptions)
