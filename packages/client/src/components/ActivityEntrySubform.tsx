import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { Field, useFormik } from 'formik'
import startCase from 'lodash.startcase'
import { useState } from 'react'
import { Button } from './ui/button'

import { ActivityEntryDefaultValuesType } from '@/types/ActivityEntryDefaultValues'
import type { FieldProps } from 'formik'
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
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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
export const ActivityEntrySubform = ({ handleAddActivity }) => {
  // console.log('ON add to activity entry subform: ', handleAddActivity)
  const activityEntryForm = useFormik({
    initialValues: activityEntryDefaultFormValues,
    onSubmit: () => console.log('Activity Entry SubForm Submit'),
  })
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
      <Dialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
        <div className='flex gap-2 mt-5'>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Activity</Button>
          </DialogTrigger>
          <Button
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
          <Field name={'activityTitle'} id={'activityTitle'}>
            {({ field }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Activity Title</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      activityEntryForm.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an Activity' />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTitleOptions.map(({ value, label }, index) => (
                        <SelectItem value={value} key={index}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name={'durationRating'} id={'durationRating'}>
            {({ field }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Activity Duration</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      activityEntryForm.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an Activity' />
                    </SelectTrigger>
                    <SelectContent>
                      {activityDurationScaleUISchema.map(
                        ({ value, label }, index) => (
                          <SelectItem value={value.toString()} key={index}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name={'intensityRating'} id={'intensityRating'}>
            {({ field }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Intensity Rating</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      activityEntryForm.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an Activity' />
                    </SelectTrigger>
                    <SelectContent>
                      {intensityScaleUISchema.map(({ value, label }, index) => (
                        <SelectItem value={value.toString()} key={index}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name={'qualitativeRating'} id={'intensityRating'}>
            {({ field }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Qualitative Rating</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      activityEntryForm.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an Activity' />
                    </SelectTrigger>
                    <SelectContent>
                      {qualitativeScaleUISchema.map(
                        ({ value, label }, index) => (
                          <SelectItem value={value.toString()} key={index}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name={'quantitativeRating'} id={'quantitativeRating'}>
            {({ field }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Quantitative Rating</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      activityEntryForm.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an Activity' />
                    </SelectTrigger>
                    <SelectContent>
                      {quantitativeScaleUISchema.map(
                        ({ value, label }, index) => (
                          <SelectItem value={value.toString()} key={index}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <div className='flex gap-2 mt-5 justify-end'>
            <Button
              type='button'
              onClick={() => {
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
        </DialogContent>
      </Dialog>
    </>
  )
}
