import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { durationScaleUISchema } from '@/schemas/durationScaleSchema'
import { intensityScaleUISchema } from '@/schemas/intensityScaleSchema'
import { qualitativeScaleUISchema } from '@/schemas/qualitativeScaleSchema'
import { quantitativeScaleUISchema } from '@/schemas/quantitativeScaleSchema'
import { Field, FieldProps, Form, Formik } from 'formik'
import startCase from 'lodash.startcase'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type ActivityTitleType = z.infer<typeof activityLogTitleEnum>

const activityTitleOptions = activityLogTitleEnum.options.map((option) => {
  return {
    value: option,
    label: startCase(option.toLowerCase()),
  }
})

interface ClientDefaultValuesType {
  activityTitle: ActivityTitleType | ''
  durationRating: string
  intensityRating: string
  qualitativeRating: string
  quantitativeRating: string
}

interface ClientActivityEntryType extends ClientDefaultValuesType {
  activityId: string
}

const defaultFormValues: ClientDefaultValuesType = {
  activityTitle: '',
  durationRating: '',
  intensityRating: '',
  qualitativeRating: '',
  quantitativeRating: '',
}

const ActivityEntry = ({
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
  handleRemoveActivity: (activityId: string) => void
}) => {
  return (
    <Card className='basis-1/3 relative'>
      <Button
        variant='ghost'
        size='icon-sm'
        className='rounded-full absolute top-2 right-2'
        onClick={() => handleRemoveActivity(activityId)}
      >
        <X />
      </Button>
      <CardHeader>
        <CardTitle>Activity Title: {activityTitle}</CardTitle>
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

// Child form for creating journal entry, but I want it to maintain its own state
export const CreateActivityEntry = () => {
  const [activities, setActivities] = useState<ClientActivityEntryType[]>([])

  const handleAddActivity = (activity: ClientDefaultValuesType) => {
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
  ) => {
    setActivities(activities.filter((a) => a.activityId !== activityId))
  }

  return (
    <>
      <h3>Activity Entry UI</h3>
      {activities.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {activities.map((activity) => (
            <ActivityEntry
              activity={activity}
              handleRemoveActivity={handleRemoveActivity}
              key={activity.activityId}
            />
          ))}
        </div>
      ) : (
        <p>There are no activity entries</p>
      )}
      <Formik
        initialValues={defaultFormValues}
        onSubmit={(values, { resetForm }) => {
          handleAddActivity(values)
          resetForm()
        }}
      >
        {(formik) => {
          const validTitle = formik.values.activityTitle.length > 0
          // can submit if there is a valid title AND formik dirty
          const canSubmit = validTitle && formik.dirty
          return (
            <Form>
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
                          {activityTitleOptions.map((opt, index) => {
                            return (
                              <SelectItem value={opt.value} key={index}>
                                {opt.label}
                              </SelectItem>
                            )
                          })}
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
                          {durationScaleUISchema.map(
                            ({ value, label }, index) => {
                              return (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
                                  {label}
                                </SelectItem>
                              )
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </>
                  )
                }}
              </Field>
              <Field name='intensityRating' id='intensityRating'>
                {({ field, form }: FieldProps) => {
                  return (
                    <>
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
                            ({ value, label }, index) => {
                              return (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
                                  {label}
                                </SelectItem>
                              )
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </>
                  )
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
                            ({ value, label }, index) => {
                              return (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
                                  {label}
                                </SelectItem>
                              )
                            }
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
                            ({ value, label }, index) => {
                              return (
                                <SelectItem
                                  value={value?.toString()}
                                  key={index}
                                >
                                  {label}
                                </SelectItem>
                              )
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </>
                  )
                }}
              </Field>
              <Button type='submit' disabled={!canSubmit}>
                Add Activity
              </Button>
              <Button type='reset'>Reset Form</Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
