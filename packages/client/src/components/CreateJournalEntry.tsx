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

const defaultJournalEntryValues: JournalEntryDefaultValuesType = {
  moodRating: '',
  stressRating: '',
  sleepDuration: '',
  sleepQuality: '',
  activities: [],
}

export default function CreateJournalEntry() {
  const formik = useFormik<JournalEntryDefaultValuesType>({
    initialValues: {
      ...defaultJournalEntryValues,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

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
            <ActivityEntrySubform />
            <Button type='submit'>Record Journal Entry</Button>
          </Form>
        </FormikProvider>
      </div>
    </>
  )
}
