import { initTRPC, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { prisma } from './prisma'
import { verifyJwt } from './utils/jwt'

// Expand this to add session
interface CreateInnerContextOptions
  extends Partial<trpcExpress.CreateExpressContextOptions> {
  session?: {}
}

// Inner context to make DB connection readily available to procedures
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    session: opts?.session,
  }
}

// Outer context
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
type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create()

export const publicProcedure = t.procedure
export const router = t.router

// Testing middleware for understanding
export const authedProcedure = t.procedure.use(async (opts) => {
  const token = opts.ctx.req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new TRPCError({
      message: 'Please authenticate.',
      code: 'UNAUTHORIZED',
    })
  }

  verifyJwt(token)

  return opts.next()
})
