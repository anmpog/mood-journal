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
import { JournalEntryDefaultValuesType } from '@/types/JournalEntryDefaultValues'
import addValueToArray from '@/utils/addValueToArray'
import filterValueFromArray from '@/utils/filterValueFromArray'
import { CreatedActivityEntry } from './CreatedActivityEntry'
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
export const ActivityEntrySubform = () => {
  const [activityDialogOpen, setActivityDialogOpen] = useState<boolean>(false)

  const activityEntryForm = useFormik({
    initialValues: activityEntryDefaultFormValues,
    // Formik doesn't allow you to opt out of onSubmit, not using a <form> so
    // this is useless for this particular bit of UI.
    onSubmit: () => {},
  })

  // Parent form context so we can modify activity state on parent
  const {
    values: { activities },
    initialValues: { activities: activitiesInitialState },
    setFieldValue,
  } = useFormikContext<JournalEntryDefaultValuesType>()

  const handleAddActivityEntry = (value: ClientActivityEntryType) => {
    setFieldValue('activities', addValueToArray(activities, value))
  }

  const handleRemoveActivityEntry = (activityId: string) => {
    const filtered = filterValueFromArray(activities, 'activityId', activityId)

    setFieldValue('activities', filtered)
  }

  const handleResetActivityEntries = () => {
    setFieldValue('activities', activitiesInitialState)
  }

  const handleCloseActivityDialog = (): void => {
    handleResetForm()
    setActivityDialogOpen(false)
  }

  const handleResetForm = (): void => {
    activityEntryForm.resetForm()
  }

  const handleToggleDialog = (): void => {
    setActivityDialogOpen(!activityDialogOpen)
    handleResetForm()
  }

  const createActivityWithId = (activity: ActivityEntryDefaultValuesType) => {
    const id = crypto.randomUUID()
    return {
      ...activity,
      activityId: id,
    }
  }

  return (
    <>
      <h3>Activity Entries</h3>
      <div className='flex flex-wrap'>
        {activities.length === 0 ? (
          <p>Use the Add Activity form to add activities to track!</p>
        ) : (
          activities.map((activity: ClientActivityEntryType) => (
            <CreatedActivityEntry
              key={activity.activityId}
              activity={activity}
              handleRemoveActivity={handleRemoveActivityEntry}
            />
          ))
        )}
      </div>
      <Dialog open={activityDialogOpen} onOpenChange={handleToggleDialog}>
        <div className='flex gap-2 mt-5'>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Activity</Button>
          </DialogTrigger>
          <Button
            type='button'
            variant='destructive'
            onClick={() => handleResetActivityEntries()}
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
                  handleAddActivityEntry(
                    createActivityWithId(activityEntryForm.values)
                  )
                  handleResetForm()
                  handleCloseActivityDialog()
                }}
              >
                Add Activity
              </Button>
              <Button
                type='reset'
                variant='destructive'
                onClick={handleResetForm}
              >
                Reset Fields
              </Button>
            </div>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
