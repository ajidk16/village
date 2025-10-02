import { t } from "elysia";

export const registerBody = t.Object({
  name: t.String({ minLength: 2, maxLength: 30 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6, maxLength: 30 }),
  role: t.Optional(
    t.Union([t.Literal("admin"), t.Literal("operator"), t.Literal("warga")])
  ),
});
export type RegisterBody = typeof registerBody.static;

export const loginBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6, maxLength: 30 }),
});
export type LoginBody = typeof loginBody.static;
