import { Elysia, t } from "elysia";
import { complaints } from "../../db/schema";
import { db } from "../../db/client";
import { requireRole, requireAuth } from "../../utils/rbac";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import type { Elysia as TElysia } from "elysia";
import { parseListQuery } from "../../utils/query";

// warga buat tiket; operator/admin ubah status
export const complaintsRoutes = new Elysia({ prefix: "/complaints" as const })
  // list (admin/operator bisa lihat semua; warga bisa lihat miliknya jika dihubungkan ke residentId—MVP: admin/op only)
  .get(
    "/",
    async ({ query }) => {
      const { page, limit, offset } = parseListQuery(query);
      const where = and(
        query.status ? eq(complaints.status, query.status as any) : undefined,
        query.q ? ilike(complaints.title, `%${query.q}%`) : undefined
      );
      const rows = await db
        .select()
        .from(complaints)
        .where(where as any)
        .orderBy(desc(complaints.createdAt))
        .limit(limit)
        .offset(offset);
      const [totalRow] = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(complaints)
        .where(where as any);
      return { items: rows, page, limit, total: totalRow?.count ?? 0 };
    },
    {
      beforeHandle: [requireRole(["admin", "operator"]) as any],
      query: t.Object({
        q: t.Optional(t.String()),
        status: t.Optional(
          t.Union([
            t.Literal("open"),
            t.Literal("in_progress"),
            t.Literal("resolved"),
          ])
        ),
        page: t.Optional(t.Numeric()),
        limit: t.Optional(t.Numeric()),
      }),
    }
  )

  .post(
    "/",
    async ({ body, set }) => {
      const [created] = await db
        .insert(complaints)
        .values({
          residentId: body.residentId ?? null,
          title: body.title,
          body: body.body,
          status: "open",
        })
        .returning();
      set.status = 201;
      return created;
    },
    {
      beforeHandle: [requireAuth()],
      body: t.Object({
        residentId: t.Optional(t.Numeric()),
        title: t.String(),
        body: t.String(),
      }),
    }
  )

  .put(
    "/:id/status",
    async ({ params, body }) => {
      const [updated] = await db
        .update(complaints)
        .set({ status: body.status })
        .where(eq(complaints.id, Number(params.id)))
        .returning();
      return updated ?? {};
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: t.Object({
        status: t.Union([
          t.Literal("open"),
          t.Literal("in_progress"),
          t.Literal("resolved"),
        ]),
      }),
    }
  )

  .delete(
    "/:id",
    async ({ params }) => {
      const [deleted] = await db
        .delete(complaints)
        .where(eq(complaints.id, Number(params.id)))
        .returning();
      return deleted ?? {};
    },
    { beforeHandle: [requireRole(["admin"])] }
  );
