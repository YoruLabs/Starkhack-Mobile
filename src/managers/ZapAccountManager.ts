import { Account, CallData, Contract, RpcProvider, ec, hash, cairo } from 'starknet'
import zapAccountAbi from '../utils/abis/ZapAccount.json'
import { derPublicKeyToXandY } from '../utils/crypto/utils'
import { RPC_ENDPOINT, ZAP_ACCOUNT_CLASS_HASH } from '../utils/constants/Constants'

class ZapAccountManager {
  private provider: RpcProvider
  private accountAddress: string | undefined
  private privateKey: string
  private ZAPaccountClassHash: string

  constructor(privateKey: string) {
    this.provider = new RpcProvider({
      nodeUrl: RPC_ENDPOINT,
    })
    this.privateKey = privateKey
    this.ZAPaccountClassHash = ZAP_ACCOUNT_CLASS_HASH
  }

  public async deployAndInitialize(enclaveDerPublicKey: string): Promise<{
    address: string
    deploymentTransactionHash: string
    intializationTransactionHash: string
  }> {
    const starkKeyPub = ec.starkCurve.getStarkKey(this.privateKey)

    const ZAPaccountConstructorCallData = CallData.compile({
      public_key: starkKeyPub,
    })

    this.accountAddress = hash.calculateContractAddressFromHash(
      starkKeyPub,
      this.ZAPaccountClassHash,
      ZAPaccountConstructorCallData,
      0,
    )

    const zapAccount = new Account(this.provider, this.accountAddress, this.privateKey)

    console.log('Precalculated account address=', this.accountAddress)

    const { transaction_hash, contract_address } = await zapAccount.deployAccount({
      classHash: this.ZAPaccountClassHash,
      constructorCalldata: ZAPaccountConstructorCallData,
      addressSalt: starkKeyPub,
    })

    await this.provider.waitForTransaction(transaction_hash)
    console.log('✅ New Zap account created.\n   address =', contract_address)

    const [point_x, point_y] = derPublicKeyToXandY(enclaveDerPublicKey)

    const accountContract = new Contract(
      zapAccountAbi.abi,
      this.accountAddress,
      zapAccount,
    )

    const initialize_res = await accountContract.initialize(
      cairo.uint256(point_x),
      cairo.uint256(point_y),
    )

    await this.provider.waitForTransaction(initialize_res.transaction_hash)
    console.log(
      '✅ Zap account initialization tx_hash =',
      initialize_res.transaction_hash,
    )
    console.log('-----------Initialization finished-----------------')

    return {
      address: contract_address,
      deploymentTransactionHash: transaction_hash,
      intializationTransactionHash: initialize_res.transaction_hash,
    }
  }
}

export default ZapAccountManager
