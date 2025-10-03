import type { Elysia } from "elysia";
import { writeAudit } from "../modules/audit/service";

const WRITES = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const auditPlugin = (app: Elysia) =>
  app.onAfterHandle(async (ctx) => {
    const method = ctx.request.method.toUpperCase();
    if (!WRITES.has(method)) return;

    const status = typeof ctx.set.status === "number" ? ctx.set.status : 200;
    const url = new URL(ctx.request.url);
    // Tebak entity dari prefix path /<entity>
    const [, entityGuess] = url.pathname.split("/");
    const entity = entityGuess || "unknown";

    // Coba ambil entityId jika response payload ada { id: number }
    let entityId: number | null = null;
    try {
      const body = ctx.response as any;
      if (
        body &&
        typeof body === "object" &&
        "id" in body &&
        Number.isFinite(Number(body.id))
      ) {
        entityId = Number(body.id);
      }
    } catch {
      /* ignore */
    }

    await writeAudit({
      userId: (ctx as unknown as { user: { id: number } }).user?.id ?? null,
      action:
        method === "POST"
          ? "create"
          : method === "PUT" || method === "PATCH"
          ? "update"
          : method === "DELETE"
          ? "delete"
          : method.toLowerCase(),
      entity,
      entityId,
      path: url.pathname,
      method,
      status,
      // Catat query/body ringkas (tanpa password)
      meta: {
        params: ctx.params,
        query: ctx.query,
      },
    });
  });
