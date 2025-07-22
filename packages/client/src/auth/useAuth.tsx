import type { LoginUserInput } from '@/components/User/hooks/useLoginUser'
import { useContext, createContext } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  login: (mutationInput: LoginUserInput) => Promise<string>
  logout: () => void
  userToken: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with an Auth Provider')
  }

  return context
}
