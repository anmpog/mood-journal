import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import { durationScaleUIOptions } from '@/schemas/durationScaleSchema'
import { intensityScaleUIOptions } from '@/schemas/intensityScaleSchema'
import { qualitativeScaleUIOptions } from '@/schemas/qualitativeScaleSchema'
import { quantitativeScaleUIOptions } from '@/schemas/quantitativeScaleSchema'
import { useFormik } from 'formik'
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

const activityTitleOptions = activityLogTitleEnum.options.map((option) => {
  return {
    value: option,
    label: startCase(option.toLowerCase()),
  }
})

const initialValues = {
  activityTitle: undefined,
  durationRating: undefined,
  intensityRating: undefined,
  qualitativeRating: undefined,
  quantitativeRating: undefined,
}

type ClientActivityEntry = {
  activityTitle: string | undefined
  durationRating: string | undefined
  intensityRating: string | undefined
  qualitativeRating: string | undefined
  quantitativeRating: string | undefined
}

const Activity = ({ activity }: { activity: ClientActivityEntry }) => {
  return (
    <div className='p-2 border-1 border-gray-600 rounded-2xl flex flex-col w-auto'>
      <h4>{activity.activityTitle}</h4>
      <p>Duration: {activity.durationRating}</p>
      <p>Intensity: {activity.intensityRating}</p>
      <p>Quality: {activity.qualitativeRating}</p>
      <p>Quantity: {activity.quantitativeRating}</p>
    </div>
  )
}

// Child form for creating journal entry, but I want it to maintain its own state
export const CreateActivityEntry = () => {
  const [activities, setActivities] = useState<ClientActivityEntry[]>([])

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (values) {
        setActivities([
          ...activities,
          {
            ...values,
          },
        ])
      }
    },
  })

  return (
    <>
      <h3>Activity Entry UI</h3>
      <>
        <div className=' outline-1 outline-blue-400 p-3'>
          {activities.length > 0 ? (
            <>
              {activities.map((activity, index) => {
                return <Activity activity={activity} key={index} />
              })}
            </>
          ) : (
            <div>No activities in state</div>
          )}
        </div>
      </>
      <form onSubmit={formik.handleSubmit}>
        <Label htmlFor={'activityTitle'}>Activity Title</Label>
        <Select
          value={formik.values.activityTitle}
          onValueChange={(value: string) => {
            formik.setFieldValue('activityTitle', value)
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

        <Label htmlFor={'durationRating'}>Duration Rating</Label>
        <Select
          value={formik.values.durationRating}
          onValueChange={(value) => {
            formik.setFieldValue('durationRating', value)
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

        <Label htmlFor={'intensityRating'}>Intensity Rating</Label>
        <Select
          value={formik.values.intensityRating}
          onValueChange={(value) => {
            formik.setFieldValue('intensityRating', value)
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

        <Label htmlFor={'qualitativeRating'}>Qualitative Rating</Label>
        <Select
          value={formik.values.qualitativeRating}
          onValueChange={(value) => {
            formik.setFieldValue('qualitativeRating', value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a Quality' />
          </SelectTrigger>
          <SelectContent>
            {qualitativeScaleUIOptions.map(({ value, key, label }) => {
              return (
                <SelectItem value={value.toString()} key={key}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Label htmlFor={'quantitativeRating'}>Quantity Rating</Label>
        <Select
          value={formik.values.quantitativeRating}
          onValueChange={(value) => {
            formik.setFieldValue('quantitativeRating', value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a Quantity' />
          </SelectTrigger>
          <SelectContent>
            {quantitativeScaleUIOptions.map(({ value, key, label }) => {
              return (
                <SelectItem value={value.toString()} key={key}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button type='submit' disabled={!formik.dirty}>
          Add Activity
        </Button>
      </form>
    </>
  )
}
