import { trpc } from '@/utils/trpc'
import { useMutation } from '@tanstack/react-query'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from 'trpc-server/src/router'

export type CreateJournalEntryInput =
  inferRouterInputs<AppRouter>['journal']['createJournalEntry']
export type CreateJournalEntryOutput =
  inferRouterOutputs<AppRouter>['journal']['createJournalEntry']

export default function useCreateJournalEntry() {
  const createJournalEntryMutationOptions =
    trpc.journal.createJournalEntry.mutationOptions({
      onSuccess: (): void => {
        console.log('Create Journal Entry Successful')
      },
      onError: (error): void => {
        console.log('useCreateJournalEntry error: ', error)
      },
    })

  return useMutation(createJournalEntryMutationOptions)
}
