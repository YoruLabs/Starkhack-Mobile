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
]
