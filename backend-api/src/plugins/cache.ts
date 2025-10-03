import type { Elysia } from "elysia";

async function sha1Hex(input: string) {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const etagPlugin = (app: Elysia) =>
  app.onAfterHandle(async (ctx) => {
    if (ctx.request.method !== "GET") return;
    const res = ctx.response;

    // Normalisasi ke string
    const payload =
      typeof res === "string"
        ? res
        : res && typeof res === "object"
        ? JSON.stringify(res)
        : String(res ?? "");

    const etag = `"W/${await sha1Hex(payload)}"`;
    const inm = ctx.request.headers.get("if-none-match");

    // Jika sama → 304
    if (inm && inm === etag) {
      ctx.set.status = 304;
      ctx.response = undefined;
      return;
    }

    ctx.set.headers["etag"] = etag;
    ctx.set.headers["cache-control"] = "private, max-age=30"; // 30s cache sisi client
  });
