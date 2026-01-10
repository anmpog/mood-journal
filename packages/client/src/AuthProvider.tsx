import type { AuthContext as AuthContextType } from '@/types/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { AuthContext } from './auth/useAuth'
import { isTokenExpired } from './auth/utils'
import useLoginUser, { type LoginUserInput } from './mutations/useLoginUser'
import type { AuthenticatedUser } from './types/AuthenticatedUser'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null)

  const { mutateAsync: loginUser } = useLoginUser()

  const logout = (): void => {
    setAuthenticatedUser(null)
    localStorage.removeItem('userToken')
  }

  const login = async (loginUserInput: LoginUserInput): Promise<void> => {
    try {
      const loginResponse = await loginUser(loginUserInput)
      localStorage.setItem('userToken', loginResponse.data)
      const authenticatedUser = jwtDecode<AuthenticatedUser>(loginResponse.data)
      setAuthenticatedUser(authenticatedUser)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error with login: ', error)
      logout()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken')

    if (isTokenExpired(token)) {
      logout()
    }

    if (token) {
      const userDataFromToken = jwtDecode<AuthenticatedUser>(token)
      const { email, userId } = userDataFromToken
      setAuthenticatedUser({ email, userId })
    }
  }, [])

  const authContext: AuthContextType = authenticatedUser
    ? {
        isAuthenticated: true,
        authenticatedUser: authenticatedUser,
        login,
        logout,
      }
    : {
        isAuthenticated: false,
        authenticatedUser: null,
        login,
        logout,
      }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}
