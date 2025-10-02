import { db } from "../../db/client";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";
import type { RegisterBody } from "./schema";

type UserRow = typeof users.$inferSelect;

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const hashPassword = async (password: string) => {
  // Bun.password: gunakan argon2id
  return Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 19456,
    timeCost: 2,
  });
};

export const verifyPassword = async (password: string, hash: string) => {
  return Bun.password.verify(password, hash);
};

export const findUserByEmail = async (email: string) => {
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return row as UserRow | undefined;
};

export const createUser = async (input: RegisterBody) => {
  const passwordHash = await hashPassword(input.password);
  const [inserted] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
      password: passwordHash,
      role: input.role ?? "warga",
    })
    .returning();
  return inserted;
};

export const signAccessToken = async (payload: {
  id: number;
  email: string;
  role: string;
}) => {
  const now = Math.floor(Date.now() / 1000);
  const exp = now * Number(process.env.JWT_EXPIRES_IN!);

  const token = await new SignJWT({
    sub: String(payload.id),
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    // .setExpirationTime(new Date(exp * 1000))
    .setIssuer("desa-api")
    .setAudience("desa-client")
    .sign(secret);
  return { token, exp };
};

export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: [alg],
    issuer: "desa-api",
    audience: "desa-client",
  });
  return payload as {
    sub?: string;
    email?: string;
    role?: string;
    exp?: number;
  };
};
