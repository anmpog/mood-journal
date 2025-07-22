import { isTokenExpired } from '@/auth/utils'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (
      // if context isAuthenticated is false OR
      !context.auth.isAuthenticated ||
      // if token is expired:
      isTokenExpired(context.auth?.userToken)
    ) {
      context.auth.logout()
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <>
      <h3>Authenticated Route!</h3>
      <Outlet />
    </>
  )
}
