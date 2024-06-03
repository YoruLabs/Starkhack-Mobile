import { atom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'
import type { User } from 'types/user'

import { storageForBoolean, storageForObject, storageForString } from './Storage'
import { isEmpty } from '@utils/util'

export const Atoms = {
  LoggedIn: atomWithStorage<boolean>('isLoggedIn', false, storageForBoolean),
  User: atomWithStorage<User | null>(
    'user',
    null,
    // @ts-ignore
    storageForObject,
  ),
  AuthToken: atomWithStorage<string>('authToken', '', storageForString),
}

export const login = atom(null, (_get, set, user: User, token?: string) => {
  if (!isEmpty(token)) {
    set(Atoms.AuthToken, token)
  }

  set(Atoms.LoggedIn, true)
  set(Atoms.User, user)
})

export const logout = atom(null, (_get, set) => {
  set(Atoms.LoggedIn, RESET)
  set(Atoms.User, RESET)
  set(Atoms.AuthToken, RESET)
})
