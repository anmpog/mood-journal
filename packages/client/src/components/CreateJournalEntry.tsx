import useCreateJournalEntry from '@/mutations/useCreateJournalEntry'
import { DefaultJournalEntryValues } from '@/types/DefaultJournalEntryValues'
import { Form, FormikProvider, useFormik } from 'formik'
import { ActivityEntrySubform } from './ActivityEntrySubform'
import { MoodEntrySubform } from './MoodEntrySubform'
import { Button } from './ui/button'

const defaultJournalEntryValues: DefaultJournalEntryValues = {
  moodRating: '',
  stressRating: '',
  sleepDuration: '',
  sleepQuality: '',
  activities: [],
}

interface CreateJournalEntryProps {
  userId: number
}

export default function CreateJournalEntry({
  userId,
}: CreateJournalEntryProps) {
  const { mutate: createJournalEntry } = useCreateJournalEntry()

  const journalEntryForm = useFormik<DefaultJournalEntryValues>({
    initialValues: {
      ...defaultJournalEntryValues,
    },
    onSubmit: async (values) => {
      const formattedJournalEntry = {
        userId: userId,
        ...values,
      }

      alert(JSON.stringify(values, null, 2))

      await createJournalEntry(formattedJournalEntry)

      handleFormReset()
    },
  })

  const disableSubmitButton =
    journalEntryForm.isSubmitting && !journalEntryForm.isValidating

  const handleFormReset = () => {
    journalEntryForm.resetForm()
  }

  return (
    <>
      <h2>Create A Journal Entry</h2>
      <FormikProvider value={journalEntryForm}>
        <Form>
          <MoodEntrySubform />
          <ActivityEntrySubform />
          <Button type='submit' disabled={disableSubmitButton}>
            Record Journal Entry
          </Button>
          <Button type='reset' variant='destructive'>
            Reset Journal Entry
          </Button>
        </Form>
      </FormikProvider>
    </>
  )
}
