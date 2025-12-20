import { ClientActivityEntryType } from '@/types/ClientActivityEntry'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export const ActivityEntry = ({
  activity: {
    activityTitle,
    durationRating,
    intensityRating,
    qualitativeRating,
    quantitativeRating,
    activityId,
  },
  handleRemoveActivity,
}: {
  activity: ClientActivityEntryType
  handleRemoveActivity: (
    fieldName: string,
    objectValue: string,
    identifier: string
  ) => void
}) => {
  return (
    <Card className='basis-1/3 relative'>
      <Button
        variant='ghost'
        size='icon-sm'
        className='rounded-full absolute top-2 right-2'
        onClick={() =>
          handleRemoveActivity('activities', 'activityId', activityId)
        }
      >
        <X />
      </Button>
      <CardHeader>
        <CardTitle>Activity: {activityTitle}</CardTitle>
        <small>{activityId}</small>
      </CardHeader>
      <CardContent>
        <p>Duration: {durationRating}</p>
        <p>Intensity: {intensityRating}</p>
        <p>Quality: {qualitativeRating}</p>
        <p>Quantity: {quantitativeRating}</p>
      </CardContent>
    </Card>
  )
}
