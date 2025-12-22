// import { Button } from '@/components/ui/button'
import { Form, FormikProvider, useFormik } from 'formik'
import { ActivityEntrySubform } from './ActivityEntrySubform'
import { Button } from './ui/button'

import { moodRatingScaleSchema } from '@/schemas/moodRatingScaleSchema'
import { sleepDurationScaleSchema } from '@/schemas/sleepDurationScaleSchema'
import { sleepQualityScaleSchema } from '@/schemas/sleepQualityScaleSchema'
import { stressRatingScaleSchema } from '@/schemas/stressRatingScaleSchema'
import { JournalEntryDefaultValuesType } from '@/types/JournalEntryDefaultValues'
import SelectField from './form/SelectField'

/* eslint no-console: "error" */

const defaultFormValues: JournalEntryDefaultValuesType = {
  moodRating: '',
  stressRating: '',
  sleepDuration: '',
  sleepQuality: '',
  activities: [],
}

function updateArrayWithoutMutate(originalValue, valueToAdd) {
  return [...originalValue, { ...valueToAdd }]
}

export default function CreateJournalEntry() {
  const formik = useFormik({
    initialValues: {
      ...defaultFormValues,
    },
    onSubmit: (values) => {
      console.log('Parent form handle submit fire')
      alert(JSON.stringify(values, null, 2))
    },
  })

  const handleCreateActivity = (fieldName, activityValue) => {
    const activityWithId = {
      ...activityValue,
      activityId: crypto.randomUUID(),
    }
    formik.setFieldValue(
      fieldName,
      updateArrayWithoutMutate(formik.values[fieldName], activityWithId)
    )
  }

  const handleRemoveActivity = (fieldName, objectValue, identifier) => {
    const filtered = formik.values[fieldName].filter((value) => {
      return value[objectValue] !== identifier
    })

    formik.setFieldValue(fieldName, filtered)
  }

  return (
    <>
      <h2>Create A Journal Entry</h2>
      <div>
        <FormikProvider value={formik}>
          <Form>
            <SelectField
              name='moodRating'
              label='Mood Rating'
              placeholderText='Select a Mood Rating'
              optionsArr={moodRatingScaleSchema}
            />
            <SelectField
              name='stressRating'
              label='Stress Rating'
              placeholderText='Select a Stress Rating'
              optionsArr={stressRatingScaleSchema}
            />
            <SelectField
              name='sleepDuration'
              label='Sleep Duration'
              placeholderText='Select a Sleep Duration'
              optionsArr={sleepDurationScaleSchema}
            />
            <SelectField
              name='sleepQuality'
              label='Sleep Quality'
              placeholderText='Select a Sleep Quality'
              optionsArr={sleepQualityScaleSchema}
            />
            <ActivityEntrySubform
              formik={formik}
              handleAddActivity={handleCreateActivity}
              handleRemoveActivity={handleRemoveActivity}
            />
            <Button type='submit'>Record Journal Entry</Button>
          </Form>
        </FormikProvider>
      </div>
    </>
  )
}
