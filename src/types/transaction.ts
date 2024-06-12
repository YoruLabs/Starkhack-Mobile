export type Transaction = {
  id: string
  date: Date
  type: TransactionType
  receiverName?: string
  fromCurrency?: string
  toCurrency: string
  fromAmount?: number
  toAmount: number
  fromCurrencySymbol?: string
  toCurrencySymbol: string
}

export type TransactionType = 'exchange' | 'send'

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

// Bitcoin, Eth, USDT, USDC, Stark
export const currencies: Currency[] = [
  {
    name: 'Bitcoin',
    code: 'BTC',
    symbol: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    name: 'Ethereum',
    code: 'ETH',
    symbol: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    name: 'Tether',
    code: 'USDT',
    symbol: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
  },
  {
    name: 'USD Coin',
    code: 'USDC',
    symbol: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  },
  {
    name: 'Starknet',
    code: 'STRK',
    symbol: 'https://assets.coingecko.com/coins/images/26433/large/starknet.png',
  },
]

// Sample Data
export const transactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2022-01-01'),
    type: 'exchange',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    fromAmount: 420,
    toAmount: 386,
    fromCurrencySymbol: '$',
    toCurrencySymbol: '€',
  },
  {
    id: '2',
    date: new Date('2022-01-02'),
    type: 'send',
    toCurrency: 'INR',
    receiverName: 'Lovish Jain',
    toAmount: 10000,
    toCurrencySymbol: '₹',
  },
  {
    id: '3',
    date: new Date('2022-01-03'),
    type: 'exchange',
    fromCurrency: 'EUR',
    toCurrency: 'USD',
    fromAmount: 100,
    toAmount: 120,
    fromCurrencySymbol: '€',
    toCurrencySymbol: '$',
  },
  {
    id: '4',
    date: new Date('2022-01-02'),
    type: 'send',
    toCurrency: 'USD',
    receiverName: 'Mike Doe',
    toAmount: 320,
    toCurrencySymbol: '$',
  },
]
