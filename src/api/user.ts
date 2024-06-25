import { ZapAPI } from '@config/ZapAPI'
import { AuthResponse, AuthArgs } from 'types/user'

const SIGNUP = '/signup_or_signin'

export const authenticateUser = (args: AuthArgs): Promise<AuthResponse> =>
  ZapAPI.post(SIGNUP, { ...args })
