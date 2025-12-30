import type { LoginUserInput, UserDataFromJwt } from '@/mutations/useLoginUser'
import { createContext, useContext } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  login: (mutationInput: LoginUserInput) => Promise<UserDataFromJwt>
  logout: () => void
  userToken: string | null
  userData: UserDataFromJwt | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with an Auth Provider')
  }

  return context
}

export function useAuthedUserData(): UserDataFromJwt {
  const authContext = useAuth()

  if (!authContext.userData) {
    throw new Error('Invalid user.')
  }

  return authContext.userData
}
