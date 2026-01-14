import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'

export const getAllUsersQueryKey = trpc.user.getAllUsers.queryKey()

export default function useGetAllUsers() {
  const getAllUsersQueryOptions = trpc.user.getAllUsers.queryOptions(
    undefined,
    {},
  )

  return useQuery(getAllUsersQueryOptions)
}
