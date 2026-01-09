import { trpc } from '@/utils/trpc'
import { useMutation } from '@tanstack/react-query'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from 'trpc-server/src/router'

export type LoginUserInput = inferRouterInputs<AppRouter>['user']['loginUser']
export type LoginUserOutput = inferRouterOutputs<AppRouter>['user']['loginUser']

export default function useLoginUser() {
  const loginUserMutationOptions = trpc.user.loginUser.mutationOptions({
    onSuccess: (data) => {
      if (!data) {
        return null
      }

      return data
    },
    onError: (error): void => {
      console.error('useLoginUserMutation error: ', error)
    },
  })

  return useMutation(loginUserMutationOptions)
}
