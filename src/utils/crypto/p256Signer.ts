import { sign, PromptCopy, fetchPublicKey } from '../../../modules/expo-enclave'

import {
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
  hash,
  CallData,
  transaction, // Import transaction module
  typedData as type,
  SignerInterface,
  V2InvocationsSignerDetails,
  V3InvocationsSignerDetails,
  V2DeployAccountSignerDetails,
  V3DeployAccountSignerDetails,
  stark,
  V2DeclareSignerDetails,
  V3DeclareSignerDetails,
  cairo,
} from 'starknet'
import { Buffer } from 'buffer'
import { parseSignature } from './utils'
import { ACCOUNT_NAME } from '@utils/constants/SignerConstants'

// TEST VALUES
const accountName = 'exampleAccount'
const promptCopy: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}

/**
 * Old Transaction Versions
 */
enum ETransactionVersion2 {
  V0 = '0x0',
  V1 = '0x1',
  V2 = '0x2',
  F0 = '0x100000000000000000000000000000000',
  F1 = '0x100000000000000000000000000000001',
  F2 = '0x100000000000000000000000000000002',
}

/**
 * V3 Transaction Versions
 */
enum ETransactionVersion3 {
  V3 = '0x3',
  F3 = '0x100000000000000000000000000000003',
}

export class EnclaveSigner implements SignerInterface {
  public async getPubKey(): Promise<string> {
    // TODO: GET ACCOUNT_NAME from Global State
    return String(await fetchPublicKey(ACCOUNT_NAME))
  }

  public async signMessage(
    typedData: TypedData,
    accountAddress: string,
  ): Promise<Signature> {
    const msgHash = type.getMessageHash(typedData, accountAddress)
    return this.signRaw(msgHash)
  }

  public async signTransaction(
    transactions: Call[],
    details: InvocationsSignerDetails,
  ): Promise<Signature> {
    const compiledCalldata = transaction.getExecuteCalldata(
      transactions,
      details.cairoVersion,
    )
    let msgHash

    // TODO: How to do generic union discriminator for all like this
    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2InvocationsSignerDetails
      msgHash = hash.calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
      })
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3InvocationsSignerDetails
      msgHash = hash.calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: stark.intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: stark.intDAM(det.feeDataAvailabilityMode),
      })
    } else {
      throw Error('unsupported signTransaction version')
    }

    return this.signRaw(msgHash as string)
  }

  public async signDeployAccountTransaction(
    details: DeployAccountSignerDetails,
  ): Promise<Signature> {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata)
    /*     const version = BigInt(details.version).toString(); */
    let msgHash

    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2DeployAccountSignerDetails
      msgHash = hash.calculateDeployAccountTransactionHash({
        ...det,
        salt: det.addressSalt,
        constructorCalldata: compiledConstructorCalldata,
        version: det.version,
      })
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3DeployAccountSignerDetails
      msgHash = hash.calculateDeployAccountTransactionHash({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: stark.intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: stark.intDAM(det.feeDataAvailabilityMode),
      })
    } else {
      throw Error('unsupported signDeployAccountTransaction version')
    }

    return this.signRaw(msgHash as string)
  }

  public async signDeclareTransaction(
    // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
    details: DeclareSignerDetails,
  ): Promise<Signature> {
    let msgHash

    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2DeclareSignerDetails
      msgHash = hash.calculateDeclareTransactionHash({
        ...det,
        version: det.version,
      })
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3DeclareSignerDetails
      msgHash = hash.calculateDeclareTransactionHash({
        ...det,
        version: det.version,
        nonceDataAvailabilityMode: stark.intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: stark.intDAM(det.feeDataAvailabilityMode),
      })
    } else {
      throw Error('unsupported signDeclareTransaction version')
    }

    return this.signRaw(msgHash as string)
  }

  // This is returning a hard coded signature
  protected async signRaw(msgHash: string): Promise<Signature> {
    let messageBuffer = Buffer.from(msgHash.slice(2), 'hex').toString('hex')
    let signature = await sign(accountName, messageBuffer, promptCopy)
    let { r, s } = parseSignature(signature)

    // Convert hex string to Uint8Array
    const messageArray = Uint8Array.from(Buffer.from(msgHash.slice(2), 'hex'))
    // Convert Uint8Array to Array<u8>
    const messageArrayU8: Array<number> = Array.from(messageArray)

    let r_uin256 = cairo.uint256(r)
    let s_uin256 = cairo.uint256(s)
    console.log('signing values', r_uin256, s_uin256, messageArrayU8)
    return [
      r_uin256.low.toString(16),
      r_uin256.high.toString(16),
      s_uin256.low.toString(16),
      s_uin256.high.toString(16),
      '0x' + messageArrayU8.length.toString(16),
      ...messageArrayU8.map((num) => '0x' + num.toString(16).padStart(2, '0')),
    ]
  }
}
