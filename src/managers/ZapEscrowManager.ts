import {
  RpcProvider,
  Contract,
  Account,
  cairo,
  hash,
  ec,
  WeierstrassSignatureType,
  BigNumberish,
} from 'starknet'
import { EnclaveSigner } from './p256Signer'
import ZapEscrowAbi from '../utils/abis/zap_contracts_ZapEscrow.contract_class.json'
import { Buffer } from 'buffer'
import { RPC_ENDPOINT } from '../utils/constants/SignerConstants'

global.Buffer = Buffer

class EscrowManager {
  private provider: RpcProvider
  private contract: Contract
  private account: Account

  constructor(
    private accountAddress: string,
    private contractAddress: string,
    private accountName: string,
  ) {
    this.provider = new RpcProvider({
      nodeUrl: RPC_ENDPOINT,
    })
    this.account = new Account(
      this.provider,
      this.accountAddress,
      new EnclaveSigner(accountName),
    )
    this.contract = new Contract(ZapEscrowAbi.abi, this.contractAddress, this.account)
  }

  public async deposit(amount: BigNumberish, tokenId: number): Promise<string> {
    try {
      console.log('amount on deposit', amount)
      const deposit_tx = await this.contract.deposit(amount, tokenId)
      await this.provider.waitForTransaction(deposit_tx.transaction_hash)
      return deposit_tx.transaction_hash
    } catch (error) {
      console.error('Deposit function error:', error)
      throw error
    }
  }

  public async getUserHash(): Promise<string> {
    try {
      const userHash = await this.contract.get_user_hash()
      return userHash.toString()
    } catch (error) {
      console.error('Get user hash error:', error)
      throw error
    }
  }
}

export default EscrowManager
