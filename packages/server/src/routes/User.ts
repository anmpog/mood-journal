import { authedProcedure, publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { argon2id, hash, verify } from 'argon2'
import { TRPCError } from '@trpc/server'
import { signJwt } from '../utils/jwt'

// Argon2 options
const encryptionSettings = {
  type: argon2id,
  memoryCost: 19456, // 19MiB to KiB,
  timeCost: 3,
  parallelism: 1,
}

// Experimenting with my own response types
export type SuccessResponse<T> = { success: true; data: T }
export type FailureResponse = { success: false; message: string }

export function Success<T>(data: T): SuccessResponse<T> {
  return { success: true, data }
}

export function Failure(message: string): FailureResponse {
  return { success: false, message }
}

export const UserRouter = router({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),
  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        email: z
          .string()
          .email({
            message: 'Please provide a propertly formatted email address.',
          })
          .trim(),
        password: z
          .string()
          .min(8, { message: 'Password must be longer than 8 characters.' })
          .max(64, { message: 'Password must be shorter than 64 characters.' }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { firstName, lastName, email, password } = input

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        })
      } else if (!existingUser) {
        const hashedPw = await hash(password, encryptionSettings)

        return await ctx.prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPw,
          },
        })
      }
    }),
  deleteUser: publicProcedure
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
  loginUser: publicProcedure
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

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: providedEmail,
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Username or password is incorrect.',
        })
      }

      const passwordMatches: boolean = await verify(
        user.password,
        providedPassword
      )

      if (!passwordMatches) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Username or password is incorrect.',
        })
      }
      const payload = {
        userId: user.id,
        email: user.email,
      }

      const token = signJwt(payload)

      return Success(token)
    }),
  getUserProfile: authedProcedure
    .input(z.object({ userId: z.number().int() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const { firstName, lastName } = user

      return Success({ firstName, lastName })
    }),
})
