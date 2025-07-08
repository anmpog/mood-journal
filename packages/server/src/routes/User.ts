import { trpc } from '../trpc'
import { z } from 'zod'
import { argon2id, hash, verify } from 'argon2'

// Argon2 options
const encryptionSettings = {
  type: argon2id,
  memoryCost: 19456, // 19MiB to KiB,
  timeCost: 3,
  parallelism: 1,
}

export const UserRouter = trpc.router({
  getAllUsers: trpc.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
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
    .mutation(async ({ input, ctx }) => {
      const { firstName, lastName, email, password } = input

      const hashedPw = await hash(password, encryptionSettings)

      return await ctx.prisma.user.create({
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
    .mutation(async ({ input, ctx }) => {
      const { id } = input

      return await ctx.prisma.user.delete({
        where: {
          id: id,
        },
      })
    }),
  loginUser: trpc.procedure
    .input(
      z.object({
        email: z.string(),
        password: z
          .string()
          .min(8, { message: 'Password must be longer than 8 characters.' })
          .max(64, { message: 'Password must be shorter than 64 characters.' }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email: providedEmail, password: providedPassword } = input
      console.log('Email: ', providedEmail)
      console.log('Password: ', providedPassword)

      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: providedEmail,
          },
        })

        if (!user) {
          return { message: 'Could not find a user with those credentials.' }
        } else if (user) {
          const passwordMatches: boolean = await verify(
            user.password,
            providedPassword
          )

          if (!passwordMatches) {
            return { message: 'Password did not match' }
          } else if (passwordMatches) {
            return { message: 'Password matched' }
          }
        }
      } catch (error) {
        console.log('There was some sort of crazy shit happening on the server')
      }

      return null
    }),
})
