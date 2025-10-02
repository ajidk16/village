import type { Elysia } from "elysia";

export const securityPlugin = (app: Elysia) =>
  app
    .onRequest(({ set }) => {
      set.headers["x-frame-options"] = "DENY";
      set.headers["x-content-type-options"] = "nosniff";
      set.headers["referrer-policy"] = "no-referrer";
      set.headers["x-xss-protection"] = "0";
    })
    .get("/health", () => ({ ok: true, ts: Date.now() }));
