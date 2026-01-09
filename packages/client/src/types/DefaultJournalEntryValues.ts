import { ClientActivityEntry } from './ClientActivityEntry'

export interface DefaultJournalEntryValues {
  moodRating: string
  stressRating: string
  sleepDuration: string
  sleepQuality: string
  activities: ClientActivityEntry[]
}
