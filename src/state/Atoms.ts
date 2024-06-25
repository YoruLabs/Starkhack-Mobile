import { atom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'
import type { AuthTokens, User } from 'types/user'

import { storageForBoolean, storageForObject, storageForString } from './Storage'
import { isEmpty } from '@utils/util'
import { Balance, currencies, Currency } from 'types/transaction'

export const Atoms = {
  LoggedIn: atomWithStorage<boolean>('isLoggedIn', false, storageForBoolean),
  User: atomWithStorage<User | null>(
    'user',
    null,
    // @ts-ignore
    storageForObject,
  ),

  AuthTokens: atomWithStorage<AuthTokens | null>(
    'authTokens',
    null,
    // @ts-ignore
    storageForObject,
  ),

  AccountAddress: atomWithStorage<string>('accountAddress', '', storageForString),

  Balance: atomWithStorage<Balance[]>(
    'balance',
    [],
    // @ts-ignore
    storageForObject,
  ),

  CurrentAccount: atomWithStorage<Currency>(
    'currentAccount',
    currencies.USDT,
    // @ts-ignore
    storageForObject,
  ),
}

export const login = atom(
  null,
  (
    _get,
    set,
    user: User,
    googleAuthToken?: string,
    apiToken?: string,
    accountAddress?: string,
  ) => {
    set(Atoms.LoggedIn, true)
    set(Atoms.User, user)
    !isEmpty(accountAddress) && set(Atoms.AccountAddress, accountAddress)
    if (!isEmpty(googleAuthToken) && !isEmpty(apiToken)) {
      set(Atoms.AuthTokens, {
        googleAuthToken: googleAuthToken,
        apiToken: apiToken,
      })
    }
  },
)

export const logout = atom(null, (_get, set) => {
  set(Atoms.LoggedIn, RESET)
  set(Atoms.User, RESET)
  set(Atoms.AuthTokens, RESET)
  set(Atoms.AccountAddress, RESET)
  set(Atoms.Balance, RESET)
  set(Atoms.CurrentAccount, RESET)
})
