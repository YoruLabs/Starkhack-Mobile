// import { PromptCopy } from '../../modules/expo-enclave'

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
//import { derPublicKeyToXandY, parseSignature } from '../utils/crypto/utils'
//import { COM_ZAP_API } from '@config/api-urls'
import axios from 'axios'

const COM_ZAP_API = "http://localhost:4001/"

// // TEST VALUES
// const promptCopy: PromptCopy = {
//   usageMessage: 'Please authenticate to continue.',
//   androidTitle: 'Authentication Required',
// }

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

export function parseSignature(signature: any): { r: bigint; s: bigint } {
  const signatureBuffer = Buffer.from(signature, 'hex')
  const signatureBytes = new Uint8Array(signatureBuffer)

  // Assume the signature is in the DER format (0x30 || length || 0x02 || r_length || r || 0x02 || s_length || s)
  if (signatureBytes.length < 4) {
    throw new Error('Invalid signature format')
  }

  const rLength: any = signatureBytes[3]
  const r = signatureBytes
    .slice(4, 4 + rLength)
    .reduce((acc, val) => (acc << 8n) + BigInt(val), 0n)

  const sLength = signatureBytes[4 + rLength + 1]
  const sStart = 4 + rLength + 2
  const sEnd = sStart + sLength
  const s = signatureBytes
    .slice(sStart, sEnd)
    .reduce((acc, val) => (acc << 8n) + BigInt(val), 0n)

  return { r: r, s: s }
}

export class EnclaveSigner implements SignerInterface {
  private accountName: string

  constructor(accountName: string) {
    this.accountName = accountName
  }
  public async getPubKey(): Promise<string> {
    return String(this.accountName)
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
        compiledCalldata: compiledCalldata,
        version: det.version,
      })
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3InvocationsSignerDetails
      msgHash = hash.calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata: compiledCalldata,
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
        compiledConstructorCalldata: compiledConstructorCalldata,
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

  protected async createNewPendingSignature(msgHash: string): Promise<string | null>{
    try{
      const url = `${COM_ZAP_API}mobile/new/signature`
      const response = await axios.post(url, {
        message: msgHash,
      })
      return response.data.uuid
    } catch(Err){
      console.log('Error', Err)
      return null
    }
  }

  protected async tryGetSignedMessage(uuid: string): Promise<{signature: string, status: string} | null> {
    try {

      const url = `${COM_ZAP_API}mobile/signature/${uuid}`

      const response = await axios.get(url);

      const status = response.data.status;

      const signature = response.data.signature;

      return {
        signature,
        status
      }
      
    } catch (e) {
      return null
    }
  }


  protected async getSignatureFromUser(msgHash: string){

    const uuid = await this.createNewPendingSignature(msgHash)

    const MAXIMUM_ATTEMPTS = 10

    let amounts = 0

    while(amounts < MAXIMUM_ATTEMPTS){
      const signedMessage = await this.tryGetSignedMessage(uuid as string) 

      const signature = signedMessage?.signature
      const status = signedMessage?.status

      amounts += 1;
      if(status === 'signed'){
        return signature
      } else {

        setTimeout(() => {}, 3000);
      }
    }


  }

  // This is returning a hard coded signature
  protected async signRaw(msgHash: string): Promise<Signature> {
    //console.log('Signer AccountName', this.accountName)
    //const pubKey = await fetchPublicKey(this.accountName)
    // console.log('Signer PubKey', pubKey)
    // const [x, y] = derPublicKeyToXandY(pubKey)
    // console.log('Signer x', x, 'y', y)

    //const messageBuffer = Buffer.from(msgHash.slice(2), 'hex').toString('hex')

    const signature = await this.getSignatureFromUser(msgHash);

    const { r, s } = parseSignature(signature)

    // Convert hex string to Uint8Array
    const messageArray = Uint8Array.from(Buffer.from(msgHash.slice(2), 'hex'))
    // Convert Uint8Array to Array<u8>
    const messageArrayU8: Array<number> = Array.from(messageArray)

    const r_uin256 = cairo.uint256(r)
    const s_uin256 = cairo.uint256(s)
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
