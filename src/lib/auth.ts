
import { compare, hash } from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { JwtUserPayload } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed);
}

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): JwtUserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded && 'role' in decoded) {
      return decoded as JwtUserPayload;
    }
    return null;
  } catch {
    return null;
  }
}
