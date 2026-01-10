import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated === false) {
      throw redirect({
        to: '/login',
      })
    }

    return { auth: context.auth }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className='border-2 border-blue-500 border-dotted'>
      <Outlet />
    </div>
  )
}
