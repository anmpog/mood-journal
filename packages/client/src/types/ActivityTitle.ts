import { activityLogTitleEnum } from '@/enums/activityLogTitleEnum'
import z from 'zod'

export type ActivityTitleType = z.infer<typeof activityLogTitleEnum>
