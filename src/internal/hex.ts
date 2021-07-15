import { HEX_PREFIX as PREFIX } from './const';

export function isHexPrefixed(str: string): boolean {
  return str.slice(0, 2) === PREFIX;
}

export function stripHexPrefix(str: string): string {
  return isHexPrefixed(str) ? str.slice(2) : str;
}

export function addHexPrefix(str: string): string {
  return isHexPrefixed(str) ? str : PREFIX + str;
}

export function padToEven(str: string): string {
  if (str.length % 2) {
    str = `0${str}`;
  }
  return str;
}

export function intToHex(v: number, toEven = false) {
  let hex = v.toString(16);
  if (toEven) {
    hex = padToEven(hex);
  }
  return PREFIX + hex;
}

export function intToBuffer(v: number): Buffer {
  const hex = intToHex(v, true);
  return Buffer.from(hex, 'hex');
}

export function toUtf8(str: string): Buffer {
  let hex = stripHexPrefix(str);
  hex = hex.replace(/^0+|0+$/g, '');
  hex = padToEven(hex);
  return Buffer.from(hex, 'hex');
}

export function isHexString(v: string) {
  if (typeof v !== 'string') return false;
  if (!/^0x[0-9A-Fa-f]*$/.test(v)) return false;
  return true;
}
