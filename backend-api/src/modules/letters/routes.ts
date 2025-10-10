import { Elysia, t } from "elysia";
import { requireAuth, requireRole } from "@/utils/rbac";
import {
  createRequest,
  createTemplate,
  listTemplates,
  previewRequest,
  approveRequest,
  rejectRequest,
  submitRequest,
  issueRequest,
} from "./service";
import { parseListQuery } from "@/utils/query";
import { db } from "@/db/client";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { letterRequests, letterTemplates } from "@/db/schema";

// Templates (admin)
export const letterTemplatesRoutes = new Elysia({
  prefix: "/letters/templates",
})
  .get("/", async () => listTemplates(), {
    beforeHandle: [requireRole(["admin", "operator"])],
  })
  .post(
    "/",
    async ({ body, set }) => {
      const created = await createTemplate(body);
      set.status = 201;
      return created;
    },
    {
      beforeHandle: [requireRole(["admin"])],
      body: t.Object({
        code: t.String(),
        name: t.String(),
        bodyTemplate: t.String(),
        fieldsMeta: t.Optional(t.Unknown()),
      }),
    }
  );

// Requests
export const letterRequestsRoutes = new Elysia({ prefix: "/letters/requests" })
  // list requests (admin/operator semua; warga: nanti bisa filter by owner—MVP admin/operator saja)
  .get(
    "/",
    async ({ query }) => {
      const { page, limit, offset } = parseListQuery(query);
      const where = and(
        query.status
          ? eq(letterRequests.status, query.status as any)
          : undefined,
        query.q
          ? ilike(sql`cast(${letterRequests.id} as text)`, `%${query.q}%`)
          : undefined
      );
      const rows = await db
        .select({
          id: letterRequests.id,
          residentId: letterRequests.residentId,
          templateId: letterRequests.templateId,
          status: letterRequests.status,
          nomorSurat: letterRequests.nomorSurat,
          issuedAt: letterRequests.issuedAt,
          createdAt: letterRequests.createdAt,
        })
        .from(letterRequests)
        .where(where as any)
        .orderBy(desc(letterRequests.id))
        .limit(limit)
        .offset(offset);

      const [totalRow] = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(letterRequests)
        .where(where as any);
      return { items: rows, page, limit, total: totalRow?.count ?? 0 };
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      query: t.Object({
        q: t.Optional(t.String()),
        status: t.Optional(
          t.Union([
            t.Literal("draft"),
            t.Literal("submitted"),
            t.Literal("approved"),
            t.Literal("rejected"),
            t.Literal("issued"),
          ])
        ),
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
      }),
    }
  )

  // warga membuat draft
  .post(
    "/",
    async ({ body, set }) => {
      const created = await createRequest({
        residentId: body.residentId,
        templateId: body.templateId,
        payload: body.payload ?? {},
      });
      set.status = 201;
      return created;
    },
    {
      beforeHandle: [requireAuth()],
      body: t.Object({
        residentId: t.Numeric(),
        templateId: t.Numeric(),
        payload: t.Optional(t.Record(t.String(), t.Unknown())),
      }),
    }
  )

  // submit → approved/rejected → issued
  .post(
    "/:id/submit",
    async ({ params }) => {
      const result = submitRequest(Number(params.id));
      return result;
    },
    {
      beforeHandle: [requireAuth()],
    }
  )

  .post(
    "/:id/approve",
    async ({ params, user }: any) =>
      approveRequest(Number(params.id), user!.id),
    { beforeHandle: [requireRole(["admin", "operator"])] }
  )
  .post(
    "/:id/reject",
    async ({ params, user }: any) => rejectRequest(Number(params.id), user!.id),
    { beforeHandle: [requireRole(["admin", "operator"])] }
  )
  .post("/:id/issue", async ({ params }) => issueRequest(Number(params.id)), {
    beforeHandle: [requireRole(["admin", "operator"])],
  })

  // preview render
  .get("/:id/preview", async ({ params }) => previewRequest(Number(params.id)));
