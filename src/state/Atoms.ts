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

// TODO: Update this
export const login = atom(null, (_get, set, data: any) => {
  set(Atoms.AuthToken, data.accessToken)
  if (!isEmpty(data.accessToken)) {
    set(Atoms.LoggedIn, true)
    set(Atoms.User, data.user)
  }
})

export const logout = atom(null, (_get, set) => {
  set(Atoms.LoggedIn, RESET)
  set(Atoms.User, RESET)
  set(Atoms.AuthToken, RESET)
})
