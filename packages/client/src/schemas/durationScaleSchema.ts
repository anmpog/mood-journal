import { z } from 'zod'

export const durationScaleUIOptions = [
  {
    value: 0,
    key: 'none',
    label: 'None',
  },
  {
    value: 1,
    key: '0_15',
    label: '15 Minutes or Less',
  },
  {
    value: 2,
    key: '15_30',
    label: '15-30 Minutes',
  },
  {
    value: 3,
    key: '30_60',
    label: '30-60 Minutes',
  },
  {
    value: 4,
    key: '60_120',
    label: '1-2 Hours',
  },
  {
    value: 5,
    key: '120_plus',
    label: '2+ hours',
  },
]

const durationScaleOptions = [
  z.object({
    value: z.literal(0),
    key: z.literal('none'),
    label: z.literal('None'),
  }),
  z.object({
    value: z.literal(1),
    key: z.literal('0_15'),
    label: z.literal('15 Minutes or Less'),
  }),
  z.object({
    value: z.literal(2),
    key: z.literal('15_30'),
    label: z.literal('15-30 Minutes'),
  }),
  z.object({
    value: z.literal(3),
    key: z.literal('30_60'),
    label: z.literal('30-60 Minutes'),
  }),
  z.object({
    value: z.literal(4),
    key: z.literal('60_120'),
    label: z.literal('1-2 Hours'),
  }),
  z.object({
    value: z.literal(5),
    key: z.literal('120_plus'),
    label: z.literal('2+ hours'),
  }),
]

export const durationScaleSchema = z.union(durationScaleOptions)
