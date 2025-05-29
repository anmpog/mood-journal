import { trpc } from '../trpc'
import { prisma } from '../prisma'
import { z } from 'zod'

export const UserRouter = trpc.router({
  getAllUsers: trpc.procedure.query(async () => {
    return await prisma.user.findMany()
  }),
  createUser: trpc.procedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts

      return await prisma.user.create({
        data: {
          ...input,
        },
      })
    }),
})
