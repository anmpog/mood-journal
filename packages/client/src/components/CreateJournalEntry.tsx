// import { Button } from '@/components/ui/button'
// import type { CreateJournalEntryInput } from '@/mutations/useCreateJournalEntry'
// import { journalEntryInputSchema } from '@/schemas/journalEntryInputSchema'
// import { NumberInput } from './form/NumberInputField'
import { CreateActivityEntry } from './CreateActivityEntry'

// const defaultValues: Omit<CreateJournalEntryInput, 'userId'> = {
//   moodRating: 1,
//   stressRating: 1,
//   sleepHours: 0,
//   sleepQuality: 1,
//   activities: [],
// }

export default function CreateJournalEntry() {
  // const printFormState = () => {
  //   console.log('Create Journal Entry Form state: ')
  // }

  return (
    <>
      <h2>Create A Journal Entry</h2>
      <div>
        <h3>Parent Form</h3>
        <CreateActivityEntry />
        {/* <Button onClick={printFormState}>Log Entry</Button> */}
        </div>
    </>
  )
}
