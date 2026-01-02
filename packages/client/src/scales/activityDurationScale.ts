// Not sure the best way to make this value track the values expected by the
// server.

export const activityDurationScale = [
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
