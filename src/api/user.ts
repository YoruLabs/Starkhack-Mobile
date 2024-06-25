import { ZapAPI } from '@config/ZapAPI'
import { AddressResponse, AuthResponse, AuthArgs as SignupArgs } from 'types/user'

const SIGNUP = '/signup_or_signin'
const GET_ADDRESS = '/get_address'

export const authenticateUser = (args: SignupArgs): Promise<AuthResponse> =>
  ZapAPI.post(SIGNUP, { ...args })

export const getAddress = (email: string): Promise<AddressResponse> =>
  ZapAPI.get(GET_ADDRESS, { params: { email: email } })
