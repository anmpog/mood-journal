import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { FormikProvider } from 'formik'
import startCase from 'lodash.startcase'
import { useState } from 'react'
import { Button } from './ui/button'

import { DefaultActivityEntryValuesType } from '@/types/DefaultActivityEntryValues'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import useJournalActivities from '@/hooks/useJournalActivities'
import { activityDurationScale } from '@/scales/activityDurationScale'
import { intensityScale } from '@/scales/intensityScale'
import { qualitativeScale } from '@/scales/qualitativeScale'
import { quantitativeScale } from '@/scales/quantitativeScale'
import { ClientActivityEntryType } from '@/types/ClientActivityEntry'
import { nanoid } from 'nanoid'
import { CreatedActivityEntry } from './CreatedActivityEntry'
import SelectField from './form/SelectField'

const activityTitleOptions = activityLogTitleEnum.options.map((option) => {
  return {
    value: option,
    label: startCase(option.toLowerCase()),
  }
})

const defaultActivityEntryFormValues: DefaultActivityEntryValuesType = {
  activityTitle: '',
  durationRating: '',
  intensityRating: '',
  qualitativeRating: '',
  quantitativeRating: '',
}

export const ActivityEntrySubform = () => {
  const [activityDialogOpen, setActivityDialogOpen] = useState<boolean>(false)

  const {
    activities,
    activityEntriesForm,
    handleAddActivityEntry,
    handleRemoveActivityEntry,
    handleResetActivityEntries,
    handleResetActivityEntryForm,
  } = useJournalActivities(defaultActivityEntryFormValues)

  const handleCloseActivityDialog = (): void => {
    handleResetActivityEntryForm()
    setActivityDialogOpen(false)
  }

  const handleToggleActivityDialog = (): void => {
    setActivityDialogOpen(!activityDialogOpen)
    handleResetActivityEntryForm()
  }

  const createActivityWithId = (activity: DefaultActivityEntryValuesType) => {
    return {
      ...activity,
      activityId: nanoid(),
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
      <Dialog
        open={activityDialogOpen}
        onOpenChange={handleToggleActivityDialog}
      >
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
          <FormikProvider value={activityEntriesForm}>
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
              optionsArr={activityDurationScale}
            />
            <SelectField
              name='intensityRating'
              label='Intensity'
              placeholderText='Select an Intensity'
              optionsArr={intensityScale}
            />
            <SelectField
              name='qualitativeRating'
              label='Qualitative Rating'
              placeholderText='Select a Quality'
              optionsArr={qualitativeScale}
            />
            <SelectField
              name={'quantitativeRating'}
              label='Quantity'
              placeholderText='Select a Quantity'
              optionsArr={quantitativeScale}
            />
            <div className='flex gap-2 mt-5 justify-end'>
              <Button
                type='button'
                onClick={() => {
                  handleAddActivityEntry(
                    createActivityWithId(activityEntriesForm.values)
                  )
                  handleResetActivityEntryForm()
                  handleCloseActivityDialog()
                }}
              >
                Add Activity
              </Button>
              <Button
                type='reset'
                variant='destructive'
                onClick={handleResetActivityEntryForm}
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
