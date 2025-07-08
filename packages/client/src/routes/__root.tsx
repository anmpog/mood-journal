import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { queryClient } from '@/utils/trpc.ts'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className='p-2 flex gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>
        <Link to='/login' className='[&.active]:font-bold'>
          Login
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
  notFoundComponent: () => {
    return <h1>404... route not found.</h1>
  },
})
