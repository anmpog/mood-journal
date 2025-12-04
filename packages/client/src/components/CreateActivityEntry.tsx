import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import {
  durationScaleSchema,
  durationScaleUIOptions,
} from '@/schemas/durationScaleSchema'
import {
  intensityScaleSchema,
  intensityScaleUIOptions,
} from '@/schemas/intensityScaleSchema'
import { qualitativeScaleUIOptions } from '@/schemas/qualitativeScaleSchema'
import { quantitativeScaleUIOptions } from '@/schemas/quantitativeScaleSchema'
import { Field, FieldProps, Form, Formik } from 'formik'
import startCase from 'lodash.startcase'
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

type ActivityTitleType = z.infer<typeof activityLogTitleEnum>
type ClientActivityTitle = undefined | ActivityTitleType

type DurationScaleType = z.infer<typeof durationScaleSchema>
type ClientDurationScale = undefined | DurationScaleType

type IntensityScaleType = z.infer<typeof intensityScaleSchema>
type ClientIntensityScale = undefined | IntensityScaleType

const activityTitleOptions = activityLogTitleEnum.options.map((option) => {
  return {
    value: option,
    label: startCase(option.toLowerCase()),
  }
})

const defaultValues: {
  activityTitle: ClientActivityTitle
  durationRating: ClientDurationScale
  intensityRating: ClientIntensityScale
} = {
  activityTitle: undefined,
  durationRating: undefined,
  intensityRating: undefined,
}

// Child form for creating journal entry, but I want it to maintain its own state
export const CreateActivityEntry = () => {
  return (
    <>
      <h3>Activity Entry UI</h3>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
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
                      {activityTitleOptions.map((opt) => {
                        return (
                          <SelectItem value={opt.value} key={opt.value}>
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
              console.log('Field value: ', field.value)
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
                      {durationScaleUIOptions.map(({ value, key, label }) => {
                        return (
                          <SelectItem value={value.toString()} key={key}>
                            {label}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name='intensityRating' id='intensityRating'>
            {({ field, form }: FieldProps) => {
              console.log('Field value: ', field.value)
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
                      {intensityScaleUIOptions.map(({ value, key, label }) => {
                        return (
                          <SelectItem value={value.toString()} key={key}>
                            {label}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </>
              )
            }}
          </Field>
          <Field name='qualitativeRating' id='qualitativeRating'>
            {({ field, form }: FieldProps) => {
              console.log('Field value: ', field.value)
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
                      {qualitativeScaleUIOptions.map(
                        ({ value, key, label }) => {
                          return (
                            <SelectItem value={value.toString()} key={key}>
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
              console.log('Field value: ', field.value)
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
                      {quantitativeScaleUIOptions.map(
                        ({ value, key, label }) => {
                          return (
                            <SelectItem value={value.toString()} key={key}>
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
          <Button type='submit'>Add Activity</Button>
        </Form>
      </Formik>
    </>
  )
}
