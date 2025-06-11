import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/trpc'
import UserList from './components/Users.tsx'
import CreateUser from './components/CreateUser.tsx'

function App() {
  return (
    <div className='min-w-xs max-w-5xl mx-auto p-4'>
      <QueryClientProvider client={queryClient}>
        <h1>Mood Journal</h1>
        <UserList />
        <CreateUser />
      </QueryClientProvider>
    </div>
  )
}

export default App
