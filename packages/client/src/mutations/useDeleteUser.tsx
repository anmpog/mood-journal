import { trpc } from '@/utils/trpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type inferRouterInputs } from '@trpc/server'
import type { AppRouter } from 'trpc-server/src/router'
import { getAllUsersQueryKey } from '../queries/useGetAllUsers'

export type DeleteUserInput = inferRouterInputs<AppRouter>['user']['deleteUser']

export default function useDeleteUser() {
  const queryClient = useQueryClient()

  const deleteUserMutationOptions = trpc.user.deleteUser.mutationOptions({
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey })
    },
    onError: (error): void => {
      console.log('useDeleteUser error: ', error)
    },
  })

  return useMutation(deleteUserMutationOptions)
}
