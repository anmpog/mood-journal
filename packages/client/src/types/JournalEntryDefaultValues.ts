import { ClientActivityEntryType } from './ClientActivityEntry'

export interface JournalEntryDefaultValuesType {
  moodRating: string
  stressRating: string
  sleepDuration: string
  sleepQuality: string
  activities: ClientActivityEntryType[]
}
