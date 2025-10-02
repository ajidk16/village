// src/modules/residents/routes.ts
import { Elysia, t } from "elysia";
import { requireRole } from "../../utils/rbac";

export const residentsRoutes = new Elysia({ prefix: "/residents" }).get(
  "/",
  ({ query }) => {
    // TODO: query builder (filter/sort/page)
    return { items: [], page: 1, total: 0 };
  },
  {
    beforeHandle: [requireRole(["admin", "operator"])],
    query: t.Object({
      q: t.Optional(t.String()),
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
    }),
  }
);
