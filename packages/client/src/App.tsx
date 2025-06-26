import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/trpc'
import UserTable from './components/User/UserTable/UserTable.tsx'
import CreateUser from './components/User/CreateUser.tsx'

function App() {
  return (
    <div className='min-w-xs max-w-5xl mx-auto p-4'>
      <QueryClientProvider client={queryClient}>
        <h1>Mood Journal</h1>
        <UserTable />
        <CreateUser />
      </QueryClientProvider>
    </div>
  )
}

export default App
