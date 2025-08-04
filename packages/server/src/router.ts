import { initTRPC } from '@trpc/server'
import { UserRouter } from './routes/User'
import { JournalRouter } from './routes/Journal'

export const t = initTRPC.create()

export const appRouter = t.router({
  user: UserRouter,
  journal: JournalRouter,
})

export type AppRouter = typeof appRouter
