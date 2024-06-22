import { RpcProvider, Contract, Account, cairo, RPC } from 'starknet'
import { EnclaveSigner } from './p256Signer'
import erc20Abi from '../utils/abis/ERC20.json'
import { Buffer } from 'buffer'
import { RPC_ENDPOINT } from '../utils/constants/SignerConstants'
import { useAtomValue } from 'jotai'
import { Atoms } from '@state/Atoms'
global.Buffer = Buffer

class ERC20Manager {
  private provider: RpcProvider
  private contract: Contract
  private account: Account

  constructor(
    private accountAddress: string,
    private contractAddress: string,
    private accountName: string,
  ) {
    this.provider = new RpcProvider({
      // TODO: change for .env variable
      nodeUrl: RPC_ENDPOINT,
    })
    const enclaveSigner = new EnclaveSigner(accountName)
    this.account = new Account(this.provider, this.accountAddress, enclaveSigner)
    this.contract = new Contract(erc20Abi.abi, this.contractAddress, this.account)
  }

  public async getBalance(address: string): Promise<{ balance: string }> {
    try {
      const balance = await this.contract.balanceOf(address)
      return { balance: balance.toString() }
    } catch (error) {
      console.error('Get balance error:', error)
      throw error
    }
  }

  public async getAllowance(
    owner: string,
    spender: string,
  ): Promise<{ allowance: string }> {
    try {
      const allowance = await this.contract.allowance(owner, spender)
      return { allowance: allowance.toString() }
    } catch (error) {
      console.error('Get allowance error:', error)
      throw error
    }
  }

  public async approve(spender: string, amount: number): Promise<string> {
    try {
      const approve_tx = await this.contract.approve(spender, cairo.uint256(amount))
      await this.provider.waitForTransaction(approve_tx.transaction_hash)
      return approve_tx.transaction_hash
    } catch (error) {
      console.error('Approve function error:', error)
      throw error
    }
  }

  public async mint(address: string, amount: number): Promise<string> {
    try {
      const mint_tx = await this.contract.mint(address, amount)
      await this.provider.waitForTransaction(mint_tx.transaction_hash)
      return mint_tx.transaction_hash
    } catch (error) {
      console.error('Mint function error:', error)
      throw error
    }
  }

  public async transfer(to: string, amount: number): Promise<string> {
    try {
      console.log('CONTRACT ADDRESS: ', this.accountAddress)
      console.log('ZAP ACCOUNT: ', this.account)
      const transfer_tx = await this.contract.transfer(to, amount)
      await this.provider.waitForTransaction(transfer_tx.transaction_hash)
      return transfer_tx.transaction_hash
    } catch (error) {
      console.error('Transfer function error:', error)
      throw error
    }
  }
}

export default ERC20Manager
