import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from 'trpc-server/src/router'

export type GetUserProfileInput =
  inferRouterInputs<AppRouter>['user']['getUserProfile']
export type GetUserProfileOutput =
  inferRouterOutputs<AppRouter>['user']['getUserProfile']

export const getUserProfileQueryKey = trpc.user.getUserProfile.queryKey()

export default function useGetUserProfile(queryInput: GetUserProfileInput) {
  const getUserProfileQueryOptions = trpc.user.getUserProfile.queryOptions(
    queryInput,
    {},
  )

  return useQuery(getUserProfileQueryOptions)
}
