import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface CreatedActivityEntryProps {
  activity: {
    activityTitle: string
    activityId: string
    durationRating: string
    intensityRating: string
    qualitativeRating: string
    quantitativeRating: string
  }
  handleRemoveActivity: (activityId: string) => void
}

export const CreatedActivityEntry = ({
  activity,
  handleRemoveActivity,
}: CreatedActivityEntryProps) => {
  const {
    activityTitle,
    activityId,
    durationRating,
    intensityRating,
    qualitativeRating,
    quantitativeRating,
  } = activity
  return (
    <Card className='relative basis-1/3'>
      <Button
        type='button'
        variant='ghost'
        size='icon-sm'
        className='absolute top-2 right-2 rounded-full'
        onClick={() => handleRemoveActivity(activityId)}
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
