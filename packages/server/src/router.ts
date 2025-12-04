import { UserRouter } from './routes/User'
import { JournalRouter } from './routes/Journal'
import { t } from './trpc'

export const appRouter = t.router({
  user: UserRouter,
  journal: JournalRouter,
})

export type AppRouter = typeof appRouter
