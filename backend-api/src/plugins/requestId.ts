import type { Elysia } from "elysia";

export const requestIdPlugin = (app: Elysia) =>
  app.onRequest(({ set }) => {
    const id = crypto.randomUUID();
    set.headers["x-request-id"] = id;
  });
