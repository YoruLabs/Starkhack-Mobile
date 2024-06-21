import { User } from './user'

export type Transaction = {
  id: string
  date: Date
  type?: TransactionType // Determined locally based on sender and receiver ids
  mode: TransactionMode
  sender: User
  receiver: User
  fromCurrency?: Currency // undefined for 'send' transactions
  toCurrency: Currency
  fromAmount?: number // undefined for 'send' transactions
  toAmount: number
}

export type TransactionType = 'send' | 'receive'
export type TransactionMode = 'exchange' | 'send'

export type Currency = {
  name: string
  code: CurrencyCode
  symbol: string
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

export type CurrencyCode = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'STRK'

// This data is temporary and will be fetched from backend
export const currencies: Record<CurrencyCode, Currency> = {
  BTC: {
    name: 'Bitcoin',
    code: 'BTC',
    symbol: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  ETH: {
    name: 'Ethereum',
    code: 'ETH',
    symbol: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  USDT: {
    name: 'Tether',
    code: 'USDT',
    symbol: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
  },
  USDC: {
    name: 'USD Coin',
    code: 'USDC',
    symbol: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  },
  STRK: {
    name: 'Starknet',
    code: 'STRK',
    symbol: 'https://assets.coingecko.com/coins/images/26433/large/starknet.png',
  },
}

// Iterate through the currencies and make a list of code
export const currencyCodes: CurrencyCode[] = Object.keys(currencies) as CurrencyCode[]

// Sample Data
export const transactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2022-01-01'),
    mode: 'send',
    toCurrency: currencies.BTC,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    receiver: {
      id: '3',
      name: 'Mike Doe',
      email: 'mike@yahoo.com',
    },
    toAmount: 0.38,
  },
  {
    id: '2',
    date: new Date('2022-01-02'),
    mode: 'send',
    toCurrency: currencies.USDT,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    receiver: {
      id: '4',
      name: 'Lovish Jain',
      email: 'lovish@gmail.com',
    },
    toAmount: 100,
  },
  {
    id: '3',
    date: new Date('2022-01-05'),
    mode: 'send',
    toCurrency: currencies.USDC,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    receiver: {
      id: '6',
      name: 'Tom',
      email: 'tom@gmail.com',
    },
    toAmount: 120,
  },
  {
    id: '4',
    date: new Date('2022-01-06'),
    mode: 'send',
    toCurrency: currencies.ETH,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    receiver: {
      id: '5',
      name: 'John Kim',
      email: 'john@gmail.com',
    },
    toAmount: 120,
  },
  {
    id: '5',
    date: new Date('2022-01-08'),
    mode: 'send',
    toCurrency: currencies.STRK,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    receiver: {
      id: '6',
      name: 'Tom',
      email: 'tom@gmail.com',
    },
    toAmount: 800,
  },
]
