import { atom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'
import type { AuthTokens, User } from 'types/user'

import { storageForBoolean, storageForObject, storageForString } from './Storage'
import { isEmpty } from '@utils/util'
import { Balance, currenciesCrypto, Currency, CurrencyCodeCrypto } from 'types/transaction'
import { setHeaders } from '@config/ZapAPI'
import ERC20Manager from 'managers/ERC20Manager'

export const Atoms = {
  LoggedIn: atomWithStorage<boolean>('isLoggedIn', false, storageForBoolean),
  User: atomWithStorage<User | null>(
    'user',
    null,
    // @ts-ignore
    storageForObject,
  ),

  AuthTokens: atomWithStorage<AuthTokens>(
    'authTokens',
    { googleAuthToken: '', apiToken: '' },
    // @ts-ignore
    storageForObject,
  ),

  AccountAddress: atomWithStorage<string>('accountAddress', '', storageForString),

  Balance: atomWithStorage<Balance[]>(
    'balance',
    [{ currencyCode: 'EUR', amount: 0}, { currencyCode: 'BTC', amount: 0}, { currencyCode: 'ETH', amount: 0}, { currencyCode: 'USDT', amount: 0}, { currencyCode: 'USDC', amount: 0}, { currencyCode: 'STRK', amount: 0}],
    // @ts-ignore
    storageForObject,
  ),

  CurrentAccount: atomWithStorage<Currency>(
    'currentAccount',
    currenciesCrypto.USDT,
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
      // Set Auth headers for rest of the API's
      setHeaders({ googleAuthToken: googleAuthToken, apiToken: apiToken })
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


export const updateBalance = atom(null, async (_get, set, balances: Balance[], accountAddress: string, user: User | null) => {
  console.log('🪐', 'Update Balance', balances, accountAddress, user);
  if (isEmpty(user)) return;
  const newBalance: Promise<Balance[]> = Promise.all(
    balances.map(async (b) => {
      const code = b.currencyCode as CurrencyCodeCrypto;

      const tokenAddress = currenciesCrypto[code].address;

      const erc20Manager = new ERC20Manager(accountAddress, tokenAddress, user.email);

      const newBalance = await erc20Manager.getBalance(accountAddress);

      return {
        currencyCode: code,
        amount: Number((Number(newBalance.balance)/(10**18)).toFixed(6)),
      };
    }),
  );

  set(Atoms.Balance, newBalance);
})
