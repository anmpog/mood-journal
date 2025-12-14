import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { intensityScaleUISchema } from '@/schemas/intensityScaleSchema'
import { qualitativeScaleUISchema } from '@/schemas/qualitativeScaleSchema'
import { quantitativeScaleUISchema } from '@/schemas/quantitativeScaleSchema'
import { Field, FieldProps, Formik } from 'formik'
import startCase from 'lodash.startcase'
import { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { activityDurationScaleUISchema } from '@/schemas/activityDurationScaleSchema'
import { ActivityEntryDefaultValuesType } from '@/types/ActivityEntryDefaultValues'
import { ClientActivityEntryType } from '@/types/ClientActivityEntry'
import { ActivityEntry } from './ActivityEntry'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

const activityTitleOptions = activityLogTitleEnum.options.map((option) => {
  return {
    value: option,
    label: startCase(option.toLowerCase()),
  }
})

const defaultFormValues: ActivityEntryDefaultValuesType = {
  activityTitle: '',
  durationRating: '',
  intensityRating: '',
  qualitativeRating: '',
  quantitativeRating: '',
}

// Child form for creating journal entry, but I want it to maintain its own state
export const CreateActivityEntry = () => {
  const [activities, setActivities] = useState<ClientActivityEntryType[]>([])
  const [activityDialogOpen, setActivityDialogOpen] = useState<boolean>(false)

  const handleAddActivity = (activity: ActivityEntryDefaultValuesType) => {
    const activityId = crypto.randomUUID()
    setActivities([
      ...activities,
      {
        ...activity,
        activityId: activityId,
      },
    ])
  }

  const handleRemoveActivity = (
    activityId: ClientActivityEntryType['activityId']
  ): void => {
    setActivities(activities.filter((a) => a.activityId !== activityId))
  }

  const handleResetActivities = (): void => {
    setActivities([])
  }

  const handleCloseActivityDialog = (): void => {
    setActivityDialogOpen(false)
  }

  return (
    <>
      <h3>Activity Entries</h3>
      {activities.length > 0 ? (
        <div className='grid grid-cols-3 gap-2'>
          {activities.map((activity) => (
            <ActivityEntry
              activity={activity}
              handleRemoveActivity={handleRemoveActivity}
              key={activity.activityId}
            />
          ))}
        </div>
      ) : (
        <p>There are no activity entries yet.</p>
      )}
      <Formik
        initialValues={defaultFormValues}
        onSubmit={(values, { resetForm }) => {
          console.log('Form values: ', values)
          handleAddActivity(values)
          resetForm()
          handleCloseActivityDialog()
        }}
      >
        {(formik) => {
          const validTitle = formik.values.activityTitle.length > 0
          // can submit if there is a valid title AND formik dirty
          const canSubmit = validTitle && formik.dirty
          return (
            <Dialog
              open={activityDialogOpen}
              onOpenChange={setActivityDialogOpen}
            >
              <div className='flex gap-2 mt-5'>
                <DialogTrigger asChild>
                  <Button variant='outline'>Add Activity</Button>
                </DialogTrigger>
                <Button
                  variant='destructive'
                  disabled={!activities.length}
                  onClick={handleResetActivities}
                >
                  Clear Activities
                </Button>
              </div>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an Activity</DialogTitle>
                  <DialogDescription>
                    Add an activity to your journal entry to track its effect on
                    your mood over time. Select the options that best describe
                    the activity you want to track.
                  </DialogDescription>
                </DialogHeader>
                {/* <Form> */}
                <Field name='activityTitle' id='activityTitle'>
                  {({ field, form }: FieldProps) => {
                    return (
                      <>
                        <Label htmlFor={field.name}>Activity Title</Label>
                        <Select
                          value={field.value}
                          onValueChange={(value: string) => {
                            form.setFieldValue(field.name, value)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select an Activity' />
                          </SelectTrigger>
                          <SelectContent>
                            {activityTitleOptions.map(
                              ({ value, label }, index) => (
                                <SelectItem value={value} key={index}>
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
                <Field name='durationRating' id='durationRating'>
                  {({ field, form }: FieldProps) => {
                    return (
                      <>
                        <Label htmlFor={field.name}>Duration Rating</Label>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            form.setFieldValue(field.name, value)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a Duration' />
                          </SelectTrigger>
                          <SelectContent>
                            {activityDurationScaleUISchema.map(
                              ({ value, label }, index) => (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
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
                <Field name='intensityRating' id='intensityRating'>
                  {({ field, form }: FieldProps) => {
                    ;<>
                      <Label htmlFor={field.name}>Intensity Rating</Label>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue(field.name, value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select an Intensity' />
                        </SelectTrigger>
                        <SelectContent>
                          {intensityScaleUISchema.map(
                            ({ value, label }, index) => (
                              <SelectItem value={value?.toString()} key={index}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </>
                  }}
                </Field>
                <Field name='qualitativeRating' id='qualitativeRating'>
                  {({ field, form }: FieldProps) => {
                    return (
                      <>
                        <Label htmlFor={field.name}>Qualitative Rating</Label>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            form.setFieldValue(field.name, value)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a Quality' />
                          </SelectTrigger>
                          <SelectContent>
                            {qualitativeScaleUISchema.map(
                              ({ value, label }, index) => (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
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
                <Field name='quantitativeRating' id='quantitativeRating'>
                  {({ field, form }: FieldProps) => {
                    return (
                      <>
                        <Label htmlFor={field.name}>Quantity Rating</Label>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            form.setFieldValue(field.name, value)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a Quantity' />
                          </SelectTrigger>
                          <SelectContent>
                            {quantitativeScaleUISchema.map(
                              ({ value, label }, index) => (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
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
                    onClick={() => formik.handleSubmit()}
                    disabled={!canSubmit}
                  >
                    Add Activity
                  </Button>
                  <Button type='reset' variant='destructive'>
                    Reset Fields
                  </Button>
                </div>
                {/* </Form> */}
              </DialogContent>
            </Dialog>
          )
        }}
      </Formik>
    </>
  )
}
