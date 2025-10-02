import type { Elysia } from "elysia";

type Hit = { count: number; resetAt: number };
const ipMap = new Map<string, Hit>();

export const rateLimitPlugin = (app: Elysia) =>
  app.onRequest(({ request, set }) => {
    const ip = (request.headers.get("x-forwarded-for") ?? "") || "local";
    const now = Date.now();
    const win = Number(process.env.RATE_WINDOW_MS || 60000);

    const hit = ipMap.get(ip);
    if (!hit || now > hit.resetAt) {
      ipMap.set(ip, { count: 1, resetAt: now + win });
      return;
    }
    hit.count += 1;

    if (hit.count > Number(process.env.RATE_MAX || 100)) {
      set.status = 429;
      set.headers["retry-after"] = Math.ceil((hit.resetAt - now) / 1000).toString();
      throw new Error("Too Many Requests");
    }
  });
