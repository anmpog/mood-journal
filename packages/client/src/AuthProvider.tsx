import { useState, useEffect } from 'react'
import { getUserToken, setStoredUser } from './auth/utils'
import { AuthContext } from './auth/useAuth'
import useLoginUser, {
  type LoginUserInput,
} from './components/User/hooks/useLoginUser'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(getUserToken())
  const isAuthenticated = Boolean(userToken)
  const { mutateAsync } = useLoginUser()

  const logout = (): void => {
    setStoredUser(null)
    setUserToken(null)
  }

  const login = async (mutationInput: LoginUserInput): Promise<string> => {
    const { token } = await mutateAsync(mutationInput)

    if (!token) {
      throw new Error('Login failed: no token returned from server.')
    }

    setStoredUser(token)
    setUserToken(token)

    return token
  }

  useEffect(() => {
    setUserToken(getUserToken())
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
