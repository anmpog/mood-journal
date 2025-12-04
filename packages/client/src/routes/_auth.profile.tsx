import { useAuth, useAuthUserData } from '@/auth/useAuth'
import CreateJournalEntry from '@/components/CreateJournalEntry'
import useGetUserProfile from '@/queries/useGetUserProfile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  loader: async ({ context: { trpc, queryClient, auth } }) => {
    if (!auth.userData) {
      throw new Error('No authenticated user')
    }

    const currentUserId = auth.userData.userId

    await queryClient.ensureQueryData(
      trpc.user.getUserProfile.queryOptions({
        userId: currentUserId,
      })
    )
    return
  },
  component: RouteComponent,
})

function RouteComponent() {
  const auth = useAuth()
  const { userId } = useAuthUserData(auth)
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: userProfileData,
  } = useGetUserProfile({ userId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>There was a problem loading the user profile: {error.message}</div>
    )
  }

  if (isSuccess) {
    const { firstName, lastName } = userProfileData.data
    return (
      <>
        <h2>
          Welcome back,
          <span className='capitalize'>
            {firstName} {lastName}
          </span>
        </h2>
        <CreateJournalEntry />
      </>
    )
  }
}
