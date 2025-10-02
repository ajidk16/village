import type { Context } from "elysia";

// deklarasi manual context user
export interface UserContext extends Context {
  user?: { role: "admin" | "operator" | "warga" };
}

export type Role = "admin" | "operator" | "warga";

export type JwtUser = {
  id: number;
  email: string;
  role: Role;
};

export function requireAuth() {
  return (ctx: UserContext) => {
    if (!ctx.user) {
      ctx.set.status = 401;
      throw new Error("Unauthorized");
    }
  };
}

export function requireRole(roles: Role[]) {
  return (ctx: UserContext) => {
    if (!ctx.user) {
      ctx.set.status = 401;
      throw new Error("Unauthorized");
    }
    if (!roles.includes(ctx.user.role)) {
      ctx.set.status = 403;
      throw new Error("Forbidden");
    }
  };
}
