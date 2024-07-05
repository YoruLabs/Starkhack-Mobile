export type User = {
  id: string
  email: string
  name?: string
  photo?: string
}

export type AuthTokens = {
  googleAuthToken: string
  apiToken: string
}

export type AuthArgs = {
  name?: string
  email: string
  publicKeyHex: string
  googleAuthToken: string
}

export type AuthResponse = {
  blockchain_address: string
  token: string
}

export type AddressResponse = {
  blockchain_address: string
}

