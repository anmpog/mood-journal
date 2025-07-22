import { jwtDecode, type JwtPayload } from 'jwt-decode'

export function getUserToken(tokenKey: string = 'userToken'): string | null {
  return localStorage.getItem(tokenKey)
}

export function setStoredUser(
  token: string | null,
  tokenKey: string = 'userToken'
): void {
  if (token) {
    localStorage.setItem(tokenKey, token)
  } else {
    localStorage.removeItem(tokenKey)
  }
}

export function decodeToken(token: string | null): JwtPayload | null {
  if (token) {
    const decoded = jwtDecode(token)

    return decoded
  }

  return null
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) {
    // No token provided is same as expired token
    return true
  } else {
    const { exp } = jwtDecode<{ exp: number }>(token)

    return Date.now() >= exp * 1000
  }
}
