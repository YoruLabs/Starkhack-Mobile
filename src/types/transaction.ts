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
    address: '0x0592e877b1bd580c408849a29f0469ea8efa872f6accd2689048210ac5697a3f',
  },
  ETH: {
    name: 'Ethereum',
    code: 'ETH',
    symbol: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    address: '',
  },
  USDT: {
    name: 'Tether',
    code: 'USDT',
    symbol: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
    address: '',
  },
  USDC: {
    name: 'USD Coin',
    code: 'USDC',
    symbol: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    address: '',
  },
  STRK: {
    name: 'Starknet',
    code: 'STRK',
    symbol: 'https://assets.coingecko.com/coins/images/26433/large/starknet.png',
    address: '',
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
