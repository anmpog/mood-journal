import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { prisma } from './prisma'

// Expand this to add session
interface CreateInnerContextOptions
  extends Partial<trpcExpress.CreateExpressContextOptions> {
  session?: {}
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    session: opts?.session,
  }
}

export async function createContext(
  opts: trpcExpress.CreateExpressContextOptions
) {
  const contextInner = await createContextInner()

  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  }
}

// Docs say to infer type of inner context since it's always available
type Context = Awaited<ReturnType<typeof createContextInner>>

export const trpc = initTRPC.context<Context>().create()
