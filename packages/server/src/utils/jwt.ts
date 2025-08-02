import jwt, { SignOptions } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRY = process.env.JWT_EXPIRY!

export function signJwt(payload: jwt.JwtPayload, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    ...options,
    expiresIn: JWT_EXPIRY || '7hours',
  } as SignOptions)
}

export function verifyJwt(payload: string, options?: jwt.VerifyOptions) {
  return jwt.verify(payload, JWT_SECRET, {
    ...options,
  } as jwt.VerifyOptions)
}
