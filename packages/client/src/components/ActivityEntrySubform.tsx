import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { FormikProvider, useFormik, useFormikContext } from 'formik'
import startCase from 'lodash.startcase'
import { useState } from 'react'
import { Button } from './ui/button'

import { ActivityEntryDefaultValuesType } from '@/types/ActivityEntryDefaultValues'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import { activityDurationScaleUISchema } from '@/schemas/activityDurationScaleSchema'
import { intensityScaleUISchema } from '@/schemas/intensityScaleSchema'
import { qualitativeScaleUISchema } from '@/schemas/qualitativeScaleSchema'
import { quantitativeScaleUISchema } from '@/schemas/quantitativeScaleSchema'
import { ClientActivityEntryType } from '@/types/ClientActivityEntry'
import { ActivityEntry } from './ActivityEntry'
import SelectField from './form/SelectField'

const activityTitleOptions = activityLogTitleEnum.options.map((option) => {
  return {
    value: option,
    label: startCase(option.toLowerCase()),
  }
})

const activityEntryDefaultFormValues: ActivityEntryDefaultValuesType = {
  activityTitle: '',
  durationRating: '',
  intensityRating: '',
  qualitativeRating: '',
  quantitativeRating: '',
}

// Child form for creating journal entry, but I want it to maintain its own state
export const ActivityEntrySubform = ({
  handleAddActivity,
  handleRemoveActivity,
}) => {
  // Instantiate individual formik instance to handle the state of this part of
  // the UI.
  const activityEntryForm = useFormik({
    initialValues: activityEntryDefaultFormValues,
    onSubmit: () => console.log('Activity Entry SubForm Submit'),
  })

  // Parent form's context so we can see/modify parent state more intuitively
  const {
    values: { activities: parentActivitiesState },
  } = useFormikContext()

  console.log('Parent form activities: ', parentActivitiesState)

  // Dialog controls are local to this component
  const [activityDialogOpen, setActivityDialogOpen] = useState<boolean>(false)

  const handleCloseActivityDialog = (): void => {
    setActivityDialogOpen(false)
  }

  const handleResetForm = (): void => {
    activityEntryForm.resetForm()
  }

  return (
    <>
      <h3>Activity Entries</h3>
      <div className='flex flex-wrap'>
        {parentActivitiesState.length === 0 ? (
          <p>Use the Add Activity form to add activities to track!</p>
        ) : (
          parentActivitiesState.map((activity: ClientActivityEntryType) => (
            <ActivityEntry
              key={activity.activityId}
              activity={activity}
              handleRemoveActivity={handleRemoveActivity}
            />
          ))
        )}
      </div>
      <Dialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
        <div className='flex gap-2 mt-5'>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Activity</Button>
          </DialogTrigger>
          <Button
            type='button'
            variant='destructive'
            onClick={() => console.log('Clear Activities')}
          >
            Clear Activities
          </Button>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add an Activity</DialogTitle>
            <DialogDescription>
              Add an activity to your journal entry to track its effect on your
              mood over time. Select the options that best describe the activity
              you want to track.
            </DialogDescription>
          </DialogHeader>
          <FormikProvider value={activityEntryForm}>
            <SelectField
              name='activityTitle'
              label='Activity Title'
              placeholderText='Select an Activity'
              optionsArr={activityTitleOptions}
            />
            <SelectField
              name='durationRating'
              label='Duration'
              placeholderText='Select a Duration'
              optionsArr={activityDurationScaleUISchema}
            />
            <SelectField
              name='intensityRating'
              label='Intensity'
              placeholderText='Select an Intensity'
              optionsArr={intensityScaleUISchema}
            />
            <SelectField
              name='qualitativeRating'
              label='Qualitative Rating'
              placeholderText='Select a Quality'
              optionsArr={qualitativeScaleUISchema}
            />
            <SelectField
              name={'quantitativeRating'}
              label='Quantity'
              placeholderText='Select a Quantity'
              optionsArr={quantitativeScaleUISchema}
            />
            <div className='flex gap-2 mt-5 justify-end'>
              <Button
                type='button'
                onClick={() => {
                  console.log(
                    'Activity entry form values at submit click: ',
                    activityEntryForm.values
                  )
                  handleAddActivity('activities', activityEntryForm.values)
                  handleResetForm()
                  handleCloseActivityDialog()
                }}
              >
                Add Activity
              </Button>
              <Button type='reset' variant='destructive'>
                Reset Fields
              </Button>
            </div>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
