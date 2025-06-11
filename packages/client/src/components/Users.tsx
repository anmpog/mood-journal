import { useQuery } from '@tanstack/react-query'
import { trpc } from '../utils/trpc'

export default function UserList() {
  const getUsers = useQuery(trpc.user.getAllUsers.queryOptions())

  return (
    <>
      <h1>Users</h1>
      <table className='outline-1 outline-gray-800 text-left border-collapse'>
        <thead className='font-bold bg-gray-400 *:border-2  *:px-2'>
          <tr>
            <th>ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className='*:border-2'>
          {getUsers?.data?.map((user) => {
            return (
              <tr key={user.id} className='*:border-2 *:px-2'>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
