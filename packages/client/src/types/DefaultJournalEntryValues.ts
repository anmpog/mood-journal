import { ClientActivityEntryType } from './ClientActivityEntry'

export interface DefaultJournalEntryValuesType {
  moodRating: string
  stressRating: string
  sleepDuration: string
  sleepQuality: string
  activities: ClientActivityEntryType[]
}
