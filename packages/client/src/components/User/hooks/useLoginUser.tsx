import { trpc } from '@/utils/trpc'
import { useMutation } from '@tanstack/react-query'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from 'trpc-server/src/router'

export type LoginUserInput = inferRouterInputs<AppRouter>['user']['loginUser']
export type LoginuserOutput = inferRouterOutputs<AppRouter>['user']['loginUser']

export default function useLoginUserMutation() {
  const loginUserMutationOptions = trpc.user.loginUser.mutationOptions({
    onSuccess: (): void => {
      console.log('useLoginUserMutation success')
    },
    onError: (error): void => {
      console.log('useLoginUserMutation error: ', error)
    },
  })

  return useMutation(loginUserMutationOptions)
}
