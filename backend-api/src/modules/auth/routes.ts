import { Elysia } from "elysia";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  signAccessToken,
} from "./service";

import { requireAuth, requireRole, type UserContext } from "../../utils/rbac";
import { loginBody, registerBody } from "./schema";

export const authRoutes = new Elysia({ prefix: "/auth" })
  // Admin mendaftarkan user (operator/warga). Bisa juga dipakai self-register kalau mau (optional).
  .post(
    "/register",
    async ({ body, set, user }: any) => {
      if (!user) {
        set.status = 401;
        return { error: "Unauthorized" };
      }
      if (user.role !== "admin") {
        set.status = 403;
        return { error: "Forbidden" };
      }
      const exists = await findUserByEmail(body.email);
      if (exists) {
        set.status = 409;
        return { error: "Email already exists" };
      }
      const created = await createUser({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      });
      if (!created) {
        set.status = 500;
        return { error: "Failed to create user" };
      }
      set.status = 201;
      return { id: created.id, email: created.email, role: created.role };
    },
    { body: registerBody }
  )

  .post(
    "/login",
    async ({ body, set }) => {
      const row = await findUserByEmail(body.email);

      if (!row) {
        set.status = 401;
        return { error: "Invalid credentials" };
      }

      const ok = await verifyPassword(body.password, row.password);

      if (!ok) {
        set.status = 401;
        return { error: "Invalid credentials" };
      }

      const { token, exp } = await signAccessToken({
        id: row.id,
        email: row.email,
        role: row.role,
      });

      return { access_token: token, token_type: "Bearer", expires_in: exp };
    },
    { body: loginBody }
  )

  .get("/me", ({ user }: UserContext) => {
    requireAuth()({ user, set: { status: 200 } } as any);
    console.log(user);
    return {
      message: "This is a protected route",
      user: user || null,
    };
  })

  // Contoh route khusus admin
  .get("/admin/ping", ({ user }: UserContext) => ({ ok: true, data: user }), {
    beforeHandle: [requireRole(["admin"])],
  });
