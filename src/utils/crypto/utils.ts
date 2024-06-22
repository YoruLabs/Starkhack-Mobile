import { BigNumberish } from 'starknet'

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

  return { r, s }
}

export function derPublicKeyToXandY(pubKeyHex: any): [bigint, bigint] {
  // Check if the public key starts with the DER prefix
  if (!pubKeyHex.startsWith('3059301306072a8648ce3d020106082a8648ce3d03010703420004')) {
    throw new Error('Invalid DER public key format')
  }
  // Remove the DER prefix
  const pubKey = pubKeyHex.slice(54)

  // Convert the hexadecimal strings to BigInts
  const key1 = BigInt(`0x${pubKey.slice(0, 64)}`)
  const key2 = BigInt(`0x${pubKey.slice(64)}`)

  return [key1, key2]
}

export function stringToBigIntArray(str: string): BigNumberish[] {
  const result: BigNumberish[] = []
  for (let i = 0; i < str.length; i += 31) {
    const chunk = str.slice(i, i + 31)
    const bigIntValue = BigInt('0x' + Buffer.from(chunk).toString('hex'))
    result.push(bigIntValue)
  }
  return result
}
