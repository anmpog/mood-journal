import { isTokenExpired } from '@/auth/utils'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    console.log('__auth route before load')
    if (
      // if context isAuthenticated is false OR
      !context.auth.isAuthenticated ||
      // if token is expired:
      isTokenExpired(context.auth?.userToken)
    ) {
      context.auth.logout()
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AuthLayout,
  notFoundComponent: () => (
    <div>
      Whoops... that doesn't exist. Either authenticate... or try something
      else!
    </div>
  ),
})

function AuthLayout() {
  return (
    <div className='border-2 border-red-500 border-dotted'>
      <Outlet />
    </div>
  )
}
