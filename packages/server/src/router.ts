import { initTRPC } from '@trpc/server'
import { UserRouter } from './routes/User'

export const t = initTRPC.create()

export const appRouter = t.router({
  user: UserRouter,
})

export type AppRouter = typeof appRouter
