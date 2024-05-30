export type User = {
  id: string
  email: string
  name?: string
}

export type LoginArgs = {
  email: string
  code: number
}
