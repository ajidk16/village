import { Elysia, t } from "elysia";
import { requireRole } from "@/utils/rbac";
import { HouseholdCreate, HouseholdListQuery, HouseholdUpdate } from "./schema";
import {
  createHousehold,
  deleteHousehold,
  getHousehold,
  listHouseholds,
  updateHousehold,
} from "./service";

export const householdsRoutes = new Elysia({ prefix: "/households" })
  .get(
    "/",
    async ({ query }) => {
      const result = await listHouseholds(query);
      return result;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"]) as any],
      query: HouseholdListQuery,
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      const row = await getHousehold(Number(params.id));

      set.status = row.status === 200 ? 200 : 404;

      return row ?? {};
    },
    { beforeHandle: [requireRole(["admin", "operator"])] }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const created = await createHousehold(body);
      set.status = created.status === 201 ? 201 : 500;

      return created;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: HouseholdCreate,
    }
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const result = await updateHousehold(Number(params.id), body);
      set.status = result.status === 200 ? 200 : 500;

      return result;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: HouseholdUpdate,
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteHousehold(Number(params.id));
      set.status = result.status === 200 ? 200 : 404;

      return result;
    },
    {
      beforeHandle: [requireRole(["admin"])],
    }
  );
