import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { trpc } from './utils/trpc'

function UserList() {
  const getUsers = useQuery(trpc.user.getAllUsers.queryOptions())
  console.log('Get users result: ', getUsers?.data)
  return <div>User List</div>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Mood Journal</h1>
      <UserList />
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </QueryClientProvider>
  )
}

export default App
