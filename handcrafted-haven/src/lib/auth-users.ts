// src/lib/auth-users.ts
// Mock user store — replace with real DB queries (Prisma/Drizzle) when ready.
//
// To swap for a real database:
//   getUserByEmail(email)  → prisma.user.findUnique({ where: { email } })
//   createUser(data)       → prisma.user.create({ data })

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'buyer' | 'seller';
  provider: 'credentials' | 'google';
  createdAt: string;
};

// In-memory store — resets on server restart until a real DB is connected
const users: StoredUser[] = [];

export function getUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): StoredUser | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(data: Omit<StoredUser, 'id' | 'createdAt'>): StoredUser {
  const user: StoredUser = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

// ── Password hashing (Web Crypto — no bcrypt needed) ────────────────────────

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Buffer.from(hash).toString('hex');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashed = await hashPassword(password);
  return hashed === hash;
}