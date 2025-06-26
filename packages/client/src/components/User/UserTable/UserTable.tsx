import { columns } from './columns'
import { DataTable } from './data-table'
import useGetAllUsers from '../hooks/useGetAllUsers'

export default function UserTable() {
  const { isPending, isError, error, data: usersData } = useGetAllUsers()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>There was an error fetching the users: {error.message}</span>
  }

  return (
    <>
      <h1>Users</h1>
      <DataTable columns={columns} data={usersData} />
    </>
  )
}
