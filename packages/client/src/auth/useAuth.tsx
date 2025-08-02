import type {
  UserDataFromJwt,
  LoginUserInput,
} from '@/mutations/useLoginUser'
import { useContext, createContext } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  login: (mutationInput: LoginUserInput) => Promise<UserDataFromJwt>
  logout: () => void
  userToken: string | null
  userData: UserDataFromJwt | null
}

export function useAuthUserData(authContext: AuthContextType) {
  if (!authContext.userData) {
    throw new Error('User Data is not defined.')
  }

  return authContext.userData
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with an Auth Provider')
  }

  return context
}
