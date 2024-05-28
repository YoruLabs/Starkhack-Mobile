import { ZapAPI } from '@config/ZapAPI'
import { LoginArgs as SignupArgs, User } from 'types/user'

const SIGNUP = '/auth/login'

export const authenticateUser = (args: SignupArgs): Promise<User> =>
  ZapAPI.post(SIGNUP, { ...args })
