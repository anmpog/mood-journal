// import { Button } from '@/components/ui/button'
import { Select } from '@radix-ui/react-select'
import { Field, FieldProps, FormikProvider, useFormik } from 'formik'
import { ActivityEntrySubform } from './ActivityEntrySubform'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { moodRatingScaleSchema } from '@/schemas/moodRatingScaleSchema'
import { sleepDurationScaleSchema } from '@/schemas/sleepDurationScaleSchema'
import { sleepQualityScaleSchema } from '@/schemas/sleepQualityScaleSchema'
import { stressRatingScaleSchema } from '@/schemas/stressRatingScaleSchema'
import { ClientActivityEntryType } from '@/types/ClientActivityEntry'

export interface JournalEntryDefaultValuesType {
  moodRating: string
  stressRating: string
  sleepDuration: string
  sleepQuality: string
  activities: ClientActivityEntryType[]
}

const defaultFormValues: JournalEntryDefaultValuesType = {
  moodRating: '',
  stressRating: '',
  sleepDuration: '',
  sleepQuality: '',
  activities: [],
}

export default function CreateJournalEntry() {
  const formik = useFormik({
    initialValues: {
      ...defaultFormValues,
    },
    onSubmit: (values) => {
      console.log('Use formik handle submit fire')
      alert(JSON.stringify(values, null, 2))
    },
  })

  const handleAddActivityToActivitiesArray = (arrayField, value) => {
    console.log('handleAddActivityToActivityArray: ', arrayField, value)
    // set field value should validate needs to end up as true
    // formik.setFieldValue('activities', value, false)
    formik.values.activities.push(value)
    console.log('Formik state: ', formik)
  }

  console.log('Parent formik instance: ', formik)

  return (
    <>
      <h2>Create A Journal Entry</h2>
      <div>
        <FormikProvider value={formik}>
          <Field name='moodRating' id='moodRating'>
            {({ field, form }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Mood Rating</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      form.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select A Mood Rating' />
                    </SelectTrigger>
                    <SelectContent>
                      {moodRatingScaleSchema.map(({ value, label }, index) => (
                        <SelectItem value={value?.toString()} key={index}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name='stressRating' id='stressRating'>
            {({ field, form }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Stress Rating</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      form.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select A Stress Rating' />
                    </SelectTrigger>
                    <SelectContent>
                      {stressRatingScaleSchema.map(
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
          <Field name='sleepDuration' id='sleepDuration'>
            {({ field, form }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Sleep Duration</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      form.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select A Sleep Amount' />
                    </SelectTrigger>
                    <SelectContent>
                      {sleepDurationScaleSchema.map(
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
          <Field name='sleepQuality' id='sleepQuality'>
            {({ field, form }: FieldProps) => {
              return (
                <>
                  <Label htmlFor={field.name}>Sleep Quality</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      form.setFieldValue(field.name, value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select A Sleep Quality' />
                    </SelectTrigger>
                    <SelectContent>
                      {sleepQualityScaleSchema.map(
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
          <ActivityEntrySubform
            formik={formik}
            handleAddActivity={handleAddActivityToActivitiesArray}
          />
          <Button type='submit'>Record Journal Entry</Button>
        </FormikProvider>
      </div>
    </>
  )
}
