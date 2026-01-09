import { AuthActions } from './AuthActions'
import { AuthenticatedUserState } from './AuthenticatedUserState'

export type AuthContext = AuthenticatedUserState & AuthActions
