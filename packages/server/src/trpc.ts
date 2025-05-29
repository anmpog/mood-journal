import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

type Context = Awaited<ReturnType<typeof createContext>>

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({})

export const trpc = initTRPC.context<Context>().create()
