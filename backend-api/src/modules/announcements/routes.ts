import { Elysia, t } from "elysia";
import { parseListQuery } from "../../utils/query";
import { and, desc, ilike, isNotNull, sql } from "drizzle-orm";
import { announcements } from "../../db/schema";
import { db } from "../../db/client";
import { requireRole } from "../../utils/rbac";

export const announcementsRoutes = new Elysia({ prefix: "/announcements" })
  // list publik
  .get(
    "/",
    async ({ query }) => {
      const { page, limit, offset } = parseListQuery(query);
      const where = and(
        isNotNull(announcements.publishedAt),
        query.q ? ilike(announcements.title, `%${query.q}%`) : undefined
      );
      const rows = await db
        .select({
          id: announcements.id,
          title: announcements.title,
          body: announcements.body,
          publishedAt: announcements.publishedAt,
        })
        .from(announcements)
        .where(where)
        .orderBy(desc(announcements.publishedAt))
        .limit(limit)
        .offset(offset);

      const [totalRow] = await db
        .select({
          count: sql<number>`cast(count(*) as int)`,
        })
        .from(announcements)
        .where(where);

      return {
        status: 200,
        message: "successfully retrieved announcements",
        items: rows,
        meta: {
          page,
          limit,
          total: totalRow?.count ?? 0,
        },
      };
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
        page: t.Optional(t.Numeric()),
        limit: t.Optional(t.Numeric()),
      }),
    }
  )

  // detail publik
  .get("/:id", async ({ params }) => {
    const [row] = await db
      .select()
      .from(announcements)
      .where(sql`id = ${Number(params.id)}`)
      .limit(1);
    if (!row?.publishedAt) return { error: "Not found or not published" };
    return row;
  })

  // CRUD admin/operator
  .post(
    "/",
    async ({ body, set }) => {
      const [created] = await db
        .insert(announcements)
        .values({
          title: body.title,
          body: body.body,
          publishedAt: body.publishedAt
            ? new Date(body.publishedAt)
            : (null as any),
        })
        .returning();
      set.status = 201;
      return created;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: t.Object({
        title: t.String(),
        body: t.String(),
        publishedAt: t.Optional(t.String()),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const [updated] = await db
        .update(announcements)
        .set({
          title: body.title ?? undefined,
          body: body.body ?? undefined,
          publishedAt: body.publishedAt
            ? new Date(body.publishedAt)
            : body.publishedAt === null
            ? null
            : undefined,
        })
        .where(sql`id = ${Number(params.id)}`)
        .returning();
      return updated ?? {};
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: t.Object({
        title: t.Optional(t.String()),
        body: t.Optional(t.String()),
        publishedAt: t.Optional(t.Union([t.String(), t.Null()])),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params }) => {
      const [deleted] = await db
        .delete(announcements)
        .where(sql`id = ${Number(params.id)}`)
        .returning();
      return deleted ?? {};
    },
    { beforeHandle: [requireRole(["admin"])] }
  );
