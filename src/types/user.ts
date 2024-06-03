export type User = {
  id: string
  email: string
  name?: string
  photo?: string
}

export type LoginArgs = {
  email: string
  code: number
}
