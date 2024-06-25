import { ZapAPI } from '@config/ZapAPI'
import { Transaction } from 'types/transaction'
import { AddressResponse } from 'types/user'

const GET_ADDRESS = '/get_address'
const TRANSACTION_LIST = '/transactions'

export const getAddress = (email: string): Promise<AddressResponse> =>
  ZapAPI.get(GET_ADDRESS, { params: { email: email } })

export const getTransactions = (key: string): Promise<Transaction[]> =>
  ZapAPI.get(`${TRANSACTION_LIST}/${key}`)
