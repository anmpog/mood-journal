import { trpc } from '@/utils/trpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from 'trpc-server/src/router'
import { getAllUsersQueryKey } from './useGetAllUsers'

export type CreateUserInput = inferRouterInputs<AppRouter>['user']['createUser']
export type CreateUserOutput =
  inferRouterOutputs<AppRouter>['user']['createUser']

export default function useCreateUserMutation() {
  const queryClient = useQueryClient()

  const createUserMutationOptions = trpc.user.createUser.mutationOptions({
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey })
    },
    onError: (error): void => {
      console.log('useCreateUserMutation error: ', error)
    },
  })

  return useMutation(createUserMutationOptions)
}
