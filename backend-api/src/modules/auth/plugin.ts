import type { Elysia } from "elysia";
import { verifyAccessToken } from "./service";

declare module "elysia" {
  interface ElysiaContext {
    user?: { id: number; email: string; role: "admin" | "operator" | "warga" };
  }
}

export const authPlugin = (app: Elysia) =>
  app.derive(async ({ request, set }) => {
    const auth = request.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) return {};
    const token = auth.slice(7);
    try {
      const payload = await verifyAccessToken(token);

      if (!payload.sub || !payload.role || !payload.email) return {};
      return {
        user: {
          id: Number(payload.sub),
          email: payload.email,
          role: payload.role,
        },
      };
    } catch {
      // token invalid/expired → biarkan sebagai anonymous
      return {};
    }
  });
