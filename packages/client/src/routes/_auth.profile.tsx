import { useAuth } from '@/auth/useAuth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const auth = useAuth()

  const handleLogout = () => {
    auth.logout()
  }
  return (
    <>
      <h2>Journals will go here</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
