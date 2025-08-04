import { authedProcedure, publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { Success, Failure } from './User'

export const JournalRouter = router({
  createJournalEntry: authedProcedure.mutation(async ({}) => {
    return Success({ mood: 7 })
  }),
})
