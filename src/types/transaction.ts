import { User } from './user'

export type Transaction = {
  id: number
  date: number // Timestamp
  type?: TransactionType // Determined locally based on sender and receiver email
  mode: TransactionMode // TODO: Backend
  fromAddress?: string
  toAddress?: string
  tokenAddress?: string
  sender: User // TODO: Backend
  receiver: User // TODO: Backend
  fromCurrency?: Currency // undefined for 'send' transactions
  toCurrency?: Currency // TODO: Backend
  fromAmount?: number // undefined for 'send' transactions
  toAmount: number
}

export const transactions: Transaction[] = [
  {
    date: 1720126205,
    fromAddress: '0x0000000000000000000000000000000000000000000000000000000000',
    id: 32849565,
    mode: 'send',
    receiver: {
      email: 'whale.finance.blockchain@gmail.com',
      name: 'Whale Finance',
    },
    sender: {
      email: 'whale.finance.blockchain@gmail.com',
      id: '0x0000000000000000000000000000000000000000000000000000000000',
      name: 'Whale Finance',
    },
    toAddress: '0x3fa7118690969ed49db388a3a2a290e7e27885ccfc7c9c4fe1d24eb6939b9f1',
    tokenAddress: '0x02cea124210d515b81d470a4a4b385f0f4a516172ecc726e02b578b2378c2408',
    toAmount: 100,
  },
]

export type TransactionType = 'send' | 'receive'
export type TransactionMode = 'exchange' | 'send'

export type Currency = {
  name: string
  code: CurrencyCode
  symbol: string
  address: string
}

export type Balance = {
  currencyCode: CurrencyCode
  amount: number
}

export type SendDetails = {
  recipientEmail: string
  amount: number
  currency: Currency
}

export type CurrencyCodeCrypto = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'STRK' | 'EUR'
export type CurrencyCodeFiat = 'EUR' | 'BRL'
export type CurrencyCode = CurrencyCodeCrypto | CurrencyCodeFiat

export const currenciesCrypto: Record<CurrencyCodeCrypto, Currency> = {
  BTC: {
    name: 'Bitcoin',
    code: 'BTC',
    symbol: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    address: '0x7e219e3a16ea835ce0ea2c92963eab1234ab954ea3f4052ccb46896d5e41458',
  },
  ETH: {
    name: 'Ethereum',
    code: 'ETH',
    symbol: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    address: '0x2ac7f02a1848616b315e8d5db888f665ea09afa24f45134fc3e826480f94045',
  },
  USDT: {
    name: 'Tether',
    code: 'USDT',
    symbol: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
    address: '0x1acc610b225ba150297eae6234471d2da0331031d753ebec7d54c1c285a5118',
  },
  USDC: {
    name: 'USD Coin',
    code: 'USDC',
    symbol: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    address: '0x3132835d7641b22315a468675af1606bb447c940985003365d81ae31c7e2142',
  },
  STRK: {
    name: 'Starknet',
    code: 'STRK',
    symbol: 'https://assets.coingecko.com/coins/images/26433/large/starknet.png',
    address: '0x15f6e43f328943b0c5eb2b34f44a0ca6859ee6ff244b12619f2b3b23d2167f6',
  },
  EUR: {
    name: 'Euro',
    code: 'EUR',
    symbol: 'https://assets.coingecko.com/coins/images/23354/standard/eur.png',
    address: '0x02cea124210d515b81d470a4a4b385f0f4a516172ecc726e02b578b2378c2408',
  },
}

export const currenciesFiat: Record<CurrencyCodeFiat, Currency> = {
  EUR: {
    name: 'Euro',
    code: 'EUR',
    symbol: 'https://cdn-icons-png.flaticon.com/512/16168/16168005.png',
    address: '',
  },
  BRL: {
    name: 'Brazillian Real',
    code: 'BRL',
    symbol: 'https://cdn-icons-png.flaticon.com/512/14563/14563644.png',
    address: '',
  },
}

export const currencies: Record<CurrencyCode, Currency> = {
  ...currenciesCrypto,
  ...currenciesFiat,
}

// Iterate through the currencies and make a list of code
export const currencyCodesCrypto: CurrencyCodeCrypto[] = Object.keys(
  currenciesCrypto,
) as CurrencyCodeCrypto[]
export const currencyCodesFiat: CurrencyCodeFiat[] = Object.keys(
  currenciesFiat,
) as CurrencyCodeFiat[]
export const currencyCodes: CurrencyCode[] = [
  ...currencyCodesCrypto,
  ...currencyCodesFiat,
]
