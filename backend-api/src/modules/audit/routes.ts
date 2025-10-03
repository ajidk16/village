import { Elysia, t } from "elysia";
import { parseListQuery } from "../../utils/query";
import { auditLogs } from "../../db/schema";
import { and, between, count, eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db/client";
import { requireRole } from "../../utils/rbac";

export const auditRoutes = new Elysia({ prefix: "/audit" }).get(
  "/",
  async ({ query }) => {
    const { page, limit, offset } = parseListQuery(query);
    const where = and(
      query.userId ? eq(auditLogs.userId, Number(query.userId)) : undefined,
      query.entity ? ilike(auditLogs.entity, `%${query.entity}%`) : undefined,
      query.action ? ilike(auditLogs.action, `%${query.action}%`) : undefined,
      query.dateFrom && query.dateTo
        ? between(
            auditLogs.createdAt,
            new Date(query.dateFrom),
            new Date(query.dateTo)
          )
        : undefined
    );

    const rows = await db
      .select({
        id: auditLogs.id,
        userId: auditLogs.userId,
        entity: auditLogs.entity,
        entityId: auditLogs.entityId,
        path: auditLogs.path,
        method: auditLogs.method,
        status: auditLogs.status,
        meta: auditLogs.meta,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .where(where)
      .limit(limit)
      .offset(offset);

    const [totalRow] = await db
      .select({
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(auditLogs)
      .where(where);

    return {
      status: 200,
      items: rows,
      page,
      limit,
      total: totalRow?.count ?? 0,
    };
  },
  {
    beforeHandle: [requireRole(["admin"]) as any],
    query: t.Object({
      userId: t.Optional(t.Numeric()),
      entity: t.Optional(t.String()),
      action: t.Optional(t.String()),
      dateFrom: t.Optional(t.String()),
      dateTo: t.Optional(t.String()),
      page: t.Optional(t.Numeric()),
      limit: t.Optional(t.Numeric()),
    }),
  }
);
