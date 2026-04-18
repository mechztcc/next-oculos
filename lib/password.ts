import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

const KEY_LEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LEN)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  const [salt, keyHex] = passwordHash.split(":");
  if (!salt || !keyHex) return false;

  const derivedKey = (await scrypt(password, salt, KEY_LEN)) as Buffer;
  const expected = Buffer.from(keyHex, "hex");
  if (expected.length !== derivedKey.length) return false;
  return timingSafeEqual(expected, derivedKey);
}
