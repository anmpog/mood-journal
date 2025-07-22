import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import type { AuthContextType } from '@/auth/useAuth'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface RouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='border-2 border-red-500 max-w-6xl mx-auto'>
      <div className='p-2 flex gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>
        <Link to='/login' className='[&.active]:font-bold'>
          Login
        </Link>
        <Link to='/profile' className='[&.active]:font-bold'>
          Profile
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
  notFoundComponent: () => {
    return <h1>404... route not found.</h1>
  },
})
