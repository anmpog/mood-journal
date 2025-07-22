import { createFileRoute } from '@tanstack/react-router'
import UserTable from '@/components/User/UserTable/UserTable.tsx'
import CreateUser from '@/components/User/CreateUser.tsx'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <h1>Mood Journal</h1>
      <UserTable />
      <CreateUser />
    </>
  )
}

export default Index
