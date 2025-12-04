import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useAuth } from './auth/useAuth'
import { AuthProvider } from './AuthProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/trpc'
import { trpc } from './utils/trpc'

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
    trpc,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  )
}
