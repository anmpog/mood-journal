import type { AuthContext as AuthContextType } from '@/types/AuthContext'
import { createContext, useContext } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with an Auth Provider')
  }

  return context
}
