import { RpcProvider, Contract, Account } from 'starknet'
import { EnclaveSigner } from '@utils/crypto/p256Signer'
import { ERC20 } from './setup.json'
import ERC20SierraCode from '../abis/ERC20.json'
import { ERC20_ADDRESS, RPC_ENDPOINT } from './SignerConstants'

// const provider = new RpcProvider(); // Sepolia
// 1. Connect to StarkNet
const provider = new RpcProvider({
  nodeUrl: RPC_ENDPOINT,
})

// KATANA_PRIVATE_KEY
let pvt_key: any = '0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a'

export default async function sendTransaction(
  token: string,
  amount: number,
  to: string,
  accountAddress: string,
) {
  // TODO: FETCH ACCOUNT ADDRESS FROM ABI
  console.log('inside send transaction')
  try {
    // 1. Initialize Enclave Signer
    // TODO: CHANGE ENCLAVE TO DONT EXPECT ANY KEY
    const enclaveSigner = new EnclaveSigner(pvt_key)

    // 2.  Create Account with EnclaveSigner
    const zapAccount = new Account(provider, accountAddress, enclaveSigner)

    let erc20Abi = ERC20SierraCode.abi

    // TODO check if it is another token
    const myTestContract = new Contract(erc20Abi, ERC20_ADDRESS, zapAccount)
    console.log('Before calling')

    // 4. Send Transaction
    let transferTransction = await myTestContract.transfer(to, amount)
    await provider.waitForTransaction(transferTransction.transaction_hash)

    return transferTransction.transaction_hash
  } catch (error) {
    console.error('Transaction error:', error)
  }
}
