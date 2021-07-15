import BN from 'bn.js';
import { isHexString, padToEven, stripHexPrefix, intToBuffer, addHexPrefix } from '../internal/hex';

export type ToBufferInput = BN | string | number | Buffer | Uint8Array | undefined | null;
export function toBuffer(v: ToBufferInput) {
  if (v === null || v === undefined) {
    return Buffer.allocUnsafe(0);
  }
  if (Buffer.isBuffer(v)) {
    return Buffer.from(v);
  }
  if (Array.isArray(v) || v instanceof Uint8Array) {
    return Buffer.from(v);
  }
  if (typeof v === 'string') {
    if (!isHexString(v)) {
      throw new Error(`Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${v}`);
    }
    return Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
  }
  if (typeof v === 'number') {
    return intToBuffer(v);
  }
  if (BN.isBN(v)) {
    return v.toArrayLike(Buffer);
  }

  throw new Error('invalid type');
}

export function bufferToHex(buf: Buffer) {
  buf = toBuffer(buf);
  return addHexPrefix(buf.toString('hex'));
}
