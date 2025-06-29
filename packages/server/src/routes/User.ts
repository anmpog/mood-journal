import { trpc } from '../trpc'
import { prisma } from '../prisma'
import { z } from 'zod'
import { argon2id, hash } from 'argon2'

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
        password: z
          .string()
          .min(8, { message: 'Password must be longer than 8 characters.' })
          .max(64, { message: 'Password must be shorter than 64 characters.' }),
      })
    )
    .mutation(async (opts) => {
      const { firstName, lastName, email, password } = opts.input

      const hashedPw = await hash(password, {
        type: argon2id,
        memoryCost: 19456, // 19MiB to KiB,
        timeCost: 3,
        parallelism: 1,
      })

      return await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPw,
        },
      })
    }),
  deleteUser: trpc.procedure
    .input(
      z.object({
        id: z.coerce.number().int(),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input

      return await prisma.user.delete({
        where: {
          id: id,
        },
      })
    }),
})
