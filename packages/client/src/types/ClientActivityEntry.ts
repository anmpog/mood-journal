import { DefaultActivityEntryValuesType } from './DefaultActivityEntryValues'

export interface ClientActivityEntryType
  extends DefaultActivityEntryValuesType {
  activityId: string
}
