import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token: string | null): boolean {
  if (!token) {
    // No token provided is same as expired token
    return true
  } else {
    const { exp } = jwtDecode<{ exp: number }>(token)

    return Date.now() >= exp * 1000
  }
}
