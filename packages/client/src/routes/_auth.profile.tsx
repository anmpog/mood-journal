import CreateJournalEntry from '@/components/CreateJournalEntry'
import OffsetPagination from '@/components/OffsetPagination'
import { ProfileBadge } from '@/components/ProfileBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useGetUserProfile from '@/queries/useGetUserProfile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  loader: async ({ context: { trpc, queryClient, auth } }) => {
    await queryClient.ensureQueryData(
      trpc.user.getUserProfile.queryOptions({
        userId: auth.authenticatedUser.userId,
      }),
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {
    auth: {
      authenticatedUser: { userId },
    },
  } = Route.useRouteContext()
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: userData,
  } = useGetUserProfile({
    userId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>There was a problem loading the user profile: {error.message}</div>
    )
  }

  if (isSuccess) {
    const userName = `${userData.data.firstName} ${userData.data.lastName}`
    const userRecentEntries = userData.data.userRecentEntries
    const cursor = userRecentEntries[userRecentEntries.length - 1].id
    const totalUserEntries = userData.data.totalEntries
    console.log('Cursor: ', cursor)
    console.log('Total entries: ', totalUserEntries)

    return (
      <>
        <ProfileBadge userName={userName} />
        <div>
          <h2>Recent Entries</h2>
          <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-4'>
            {userRecentEntries.map((entry) => {
              return (
                <Card
                  className='rounded-xl border-1 border-gray-700'
                  key={entry.createdAt}
                >
                  <CardHeader className='outline outline-red-400'>
                    <CardTitle>
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-col'>
                      <div
                        title='Mood Entry Data'
                        className='outline outline-red-400'
                      >
                        Mood Entry Data
                      </div>
                      <div
                        title='Activity Entry Data'
                        className='outline outline-red-400'
                      >
                        Activity Entry Data
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <OffsetPagination
            totalRecords={totalUserEntries}
            recordsPerPage={4}
            name={'Recent Journal Entries pagination'}
          />
        </div>

        <CreateJournalEntry userId={userId} />
      </>
    )
  }
}
