import { RpcProvider, Contract, Account, cairo } from 'starknet'
import { EnclaveSigner } from './p256Signer'
import erc20Abi from '../abis/ERC20.json'
import { ACCOUNT_ADDRESS, ERC20_ADDRESS, RPC_ENDPOINT } from './SignerConstants'
import { Buffer } from 'buffer'
global.Buffer = Buffer

const provider = new RpcProvider({
  nodeUrl: RPC_ENDPOINT,
})

const account_address = ACCOUNT_ADDRESS // Replace with your account address
const contract_address = ERC20_ADDRESS // Replace with your contract address
let pvt_key: any = '0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a'

let enclaveSigner = new EnclaveSigner(pvt_key)

const zapAccount = new Account(provider, account_address, enclaveSigner)

const myTestContract = new Contract(erc20Abi.abi, contract_address, zapAccount)

// Function to get the balance of a given address
export async function getBalance(address: any): Promise<{ balance: string }> {
  try {
    const balance = await myTestContract.balanceOf(address)
    return { balance: balance.toString() }
  } catch (error) {
    console.error('Get balance error:', error)
    throw error
  }
}

// Function to get the allowance between two addresses
export async function getAllowance(
  owner: any,
  spender: any,
): Promise<{ allowance: string }> {
  try {
    const allowance = await myTestContract.allowance(owner, spender)
    return { allowance: allowance.toString() }
  } catch (error) {
    console.error('Get allowance error:', error)
    throw error
  }
}

// Function to approve a spender for a certain amount
export async function approve(spender: any, amount: number): Promise<string> {
  try {
    const approve_tx = await myTestContract.approve(spender, cairo.uint256(amount))
    await provider.waitForTransaction(approve_tx.transaction_hash)

    return approve_tx.transaction_hash
  } catch (error) {
    console.error('Approve function error:', error)
    throw error
  }
}

// Function to mint new tokens to a certain address
export async function mint(address: any, amount: number): Promise<string> {
  try {
    const mint_tx = await myTestContract.mint(address, amount)
    await provider.waitForTransaction(mint_tx.transaction_hash)
    return mint_tx.transaction_hash
  } catch (error) {
    console.error('Mint function error:', error)
    throw error
  }
}

// Function to transfer tokens from one address to another
export async function transfer(to: any, amount: number): Promise<string> {
  try {
    const transfer_tx = await myTestContract.transfer(to, amount)
    await provider.waitForTransaction(transfer_tx.transaction_hash)
    return transfer_tx.transaction_hash
  } catch (error) {
    console.error('Transfer function error:', error)
    throw error
  }
}
