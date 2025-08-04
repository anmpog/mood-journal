import { useEffect, useState } from 'react'
import { AuthContext } from './auth/useAuth'
import { getUserDataFromJwt, getUserToken, storeUserJwt } from './auth/utils'
import useLoginUser, {
  type LoginUserInput,
  type UserDataFromJwt,
} from './mutations/useLoginUser'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(getUserToken())
  // Trying to store user data in derived state so that it updates whenever userToken changes
  let userData = null

  if (userToken) {
    userData = getUserDataFromJwt(userToken)
  }

  const isAuthenticated = Boolean(userToken)
  const { mutateAsync } = useLoginUser()

  const logout = (): void => {
    storeUserJwt(null)
    setUserToken(null)
  }

  const login = async (
    mutationInput: LoginUserInput
  ): Promise<UserDataFromJwt> => {
    const response = await mutateAsync(mutationInput)
    if (!response.success) {
      throw new Error('Login failed: no token returned from server.')
    }

    const token = response.data

    storeUserJwt(token)
    setUserToken(token)

    return getUserDataFromJwt(token)
  }

  useEffect(() => {
    setUserToken(getUserToken())
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userToken, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
