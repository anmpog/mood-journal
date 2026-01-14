import { ClientActivityEntry } from '@/types/ClientActivityEntry'
import { DefaultActivityEntryValues } from '@/types/DefaultActivityEntryValues'
import { DefaultJournalEntryValues } from '@/types/DefaultJournalEntryValues'
import addValueToArray from '@/utils/addValueToArray'
import filterValueFromArray from '@/utils/filterValueFromArray'
import { useFormik, useFormikContext } from 'formik'

function useJournalActivities(
  defaultActivityEntryFormValues: DefaultActivityEntryValues,
) {
  const activityEntriesForm = useFormik({
    initialValues: defaultActivityEntryFormValues,
    onSubmit: () => {},
  })

  // access to parent form state field that we want to modify
  const {
    values: { activities },
    initialValues: { activities: activitiesInitialValues },
    setFieldValue,
  } = useFormikContext<DefaultJournalEntryValues>()

  const handleAddActivityEntry = (value: ClientActivityEntry) => {
    setFieldValue('activities', addValueToArray(activities, value))
  }

  const handleRemoveActivityEntry = (activityId: string) => {
    const filtered = filterValueFromArray(activities, 'activityId', activityId)

    setFieldValue('activities', filtered)
  }

  const handleResetActivityEntries = () => {
    setFieldValue('activities', activitiesInitialValues)
  }

  const handleResetActivityEntryForm = (): void => {
    activityEntriesForm.resetForm()
  }

  return {
    activities,
    activityEntriesForm,
    handleAddActivityEntry,
    handleRemoveActivityEntry,
    handleResetActivityEntries,
    handleResetActivityEntryForm,
  }
}

export default useJournalActivities
