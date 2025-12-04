import { type AuthContextType } from '@/auth/useAuth'
import Logo from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { AppRouter } from 'trpc-server/src/router'

export interface RouterContext {
  auth: AuthContextType
  queryClient: QueryClient
  trpc: TRPCOptionsProxy<AppRouter>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='border-2 border-red-500 max-w-6xl mx-auto flex flex-col min-h-screen'>
      <header className='flex justify-between mb-6'>
        <Logo />
        <Navigation />
      </header>
      <main className='flex flex-col grow'>
        <Outlet />
      </main>
      <footer>Footer Content here</footer>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
  notFoundComponent: () => {
    return <h1>404... route not found. (Global not found route)</h1>
  },
})
