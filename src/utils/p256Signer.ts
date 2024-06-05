import {
  getHardwareSecurityLevel,
  fetchPublicKey,
  createKeyPair,
  sign,
  verify,
  PromptCopy,
} from '../../modules/expo-enclave'

import {
  Abi,
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
  hash,
  CallData,
  ec,
  transaction, // Import transaction module
  typedData as type,
  SignerInterface,
  ArraySignatureType,
  num,
  encode,
  V2InvocationsSignerDetails,
  V3InvocationsSignerDetails,
  V2DeployAccountSignerDetails,
  V3DeployAccountSignerDetails,
  stark,
  V2DeclareSignerDetails,
  V3DeclareSignerDetails,
} from 'starknet'
import { Buffer } from 'buffer'

// TEST VALUES
const accountName = 'exampleAccount'
const promptCopy: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}

/**
 * V_ Transaction versions HexString
 * F_ Fee Transaction Versions HexString (2 ** 128 + TRANSACTION_VERSION)
 */
enum ETransactionVersion {
  V0 = '0x0',
  V1 = '0x1',
  V2 = '0x2',
  V3 = '0x3',
  F0 = '0x100000000000000000000000000000000',
  F1 = '0x100000000000000000000000000000001',
  F2 = '0x100000000000000000000000000000002',
  F3 = '0x100000000000000000000000000000003',
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

//TODO: Need to implement formatP256Signature, check:
// https://github.com/starknet-io/starknet.js/blob/66a5c0341eccfef0dcdf1312c15627b7d4f6b675/src/signer/ethSigner.ts#L175

export class EnclaveSigner implements SignerInterface {
  protected pk: Uint8Array | string

  constructor(pk: Uint8Array) {
    this.pk = pk instanceof Uint8Array ? encode.buf2hex(pk) : num.toHex(pk)
  }

  public async getPubKey(): Promise<string> {
    return ec.starkCurve.getStarkKey(this.pk)
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

  protected async signRaw(msgHash: string): Promise<Signature> {
    // Changed to Enclave sign
    const messageHashBuffer = Buffer.from(msgHash.slice(2), 'hex').toString('hex')
    console.log('messageHashBuffer: ', messageHashBuffer)
    let signature = await sign(accountName, messageHashBuffer, promptCopy)
    console.log('signature', signature)

    return ['0x0', '0x0', '0x0', '0x0', '0x0', '0x0']
  }
}
