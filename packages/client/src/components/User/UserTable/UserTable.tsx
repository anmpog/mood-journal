import useGetAllUsers from '@/queries/useGetAllUsers'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function UserTable() {
  const {
    isPending,
    isError,
    error,
    isSuccess,
    data: usersData,
  } = useGetAllUsers()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>There was an error fetching the users: {error.message}</span>
  }

  if (isSuccess) {
    return (
      <>
        <h1>Users</h1>
        <DataTable columns={columns} data={usersData} />
      </>
    )
  }
}
