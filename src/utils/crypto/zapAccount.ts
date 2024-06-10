import {
  Account,
  CallData,
  Contract,
  RpcProvider,
  stark,
  ec,
  hash,
  cairo,
} from 'starknet'
import zapAccountAbi from '../abis/ZapAccount.json'
import { derPublicKeyToXandY } from './crypto_utils'
import { RPC_ENDPOINT } from './SignerConstants'

const provider = new RpcProvider({
  nodeUrl: RPC_ENDPOINT,
})

let account_address: any // Replace with your account address
const pvt_key = '0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a'

const ZAPaccountClassHash =
  '0x06bc1432bbc860dc2f930290c204495e1e76af7b1ce9d1d61d94d01479fbaffa'

export async function deployAndInitialize(enclaveDerPublicKey: string): Promise<{
  address: string
  deploymentTransactionHash: string
  intializationTransactionHash: string
}> {
  const starkKeyPub = ec.starkCurve.getStarkKey(pvt_key)

  const ZAPaccountConstructorCallData = CallData.compile({
    public_key: starkKeyPub,
  })

  account_address = hash.calculateContractAddressFromHash(
    starkKeyPub,
    ZAPaccountClassHash,
    ZAPaccountConstructorCallData,
    0,
  )

  const zapAccount = new Account(provider, account_address, pvt_key)

  console.log('Precalculated account address=', account_address)

  const { transaction_hash, contract_address } = await zapAccount.deployAccount({
    classHash: ZAPaccountClassHash,
    constructorCalldata: ZAPaccountConstructorCallData,
    addressSalt: starkKeyPub,
  })

  await provider.waitForTransaction(transaction_hash)
  console.log('✅ New Zap account created.\n   address =', contract_address)

  const [point_x, point_y] = derPublicKeyToXandY(enclaveDerPublicKey)

  const accountContract = new Contract(zapAccountAbi.abi, account_address, zapAccount)

  const initialize_res = await accountContract.initialize(
    cairo.uint256(point_x),
    cairo.uint256(point_y),
  )

  await provider.waitForTransaction(initialize_res.transaction_hash)
  console.log('✅ Zap account initialization tx_hash =', initialize_res.transaction_hash)
  console.log('-----------Initialization finished-----------------')

  return {
    address: contract_address,
    deploymentTransactionHash: transaction_hash,
    intializationTransactionHash: initialize_res.transaction_hash,
  }
}
