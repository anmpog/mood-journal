// import { Button } from '@/components/ui/button'
import { useAuthedUserData } from '@/auth/useAuth'
import useCreateJournalEntry from '@/mutations/useCreateJournalEntry'
import { DefaultJournalEntryValuesType } from '@/types/DefaultJournalEntryValues'
import { Form, FormikProvider, useFormik } from 'formik'
import { ActivityEntrySubform } from './ActivityEntrySubform'
import { MoodEntrySubform } from './MoodEntrySubform'
import { Button } from './ui/button'

const defaultJournalEntryValues: DefaultJournalEntryValuesType = {
  moodRating: '',
  stressRating: '',
  sleepDuration: '',
  sleepQuality: '',
  activities: [],
}

export default function CreateJournalEntry() {
  const authedUserData = useAuthedUserData()
  const { mutate: createJournalEntry } = useCreateJournalEntry()

  if (!authedUserData) {
    throw new Error('No authenticated user.')
  }

  const journalEntryForm = useFormik<DefaultJournalEntryValuesType>({
    initialValues: {
      ...defaultJournalEntryValues,
    },
    onSubmit: (values) => {
      // simulating long submit
      setTimeout(async () => {
        const formattedJournalEntry = {
          userId: authedUserData.userId,
          ...values,
        }
        alert(JSON.stringify(values, null, 2))

        await createJournalEntry(formattedJournalEntry)

        handleFormReset()
      }, 5000)
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
