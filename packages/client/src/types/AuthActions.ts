import { LoginUserInput } from '@/mutations/useLoginUser'

export type AuthActions = {
  login: (loginUserInput: LoginUserInput) => Promise<void>
  logout: () => void
}
