import { AuthenticatedUser } from './AuthenticatedUser'

export type AuthenticatedUserState =
  | {
      isAuthenticated: true
      authenticatedUser: AuthenticatedUser
    }
  | {
      isAuthenticated: false
      authenticatedUser: null
    }
