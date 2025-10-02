import { Elysia, t } from "elysia";
import { requireRole } from "../../utils/rbac";
import { HouseholdCreate, HouseholdListQuery, HouseholdUpdate } from "./schema";
import {
  createHousehold,
  deleteHousehold,
  getHousehold,
  listHouseholds,
  updateHousehold,
} from "./service";

export const householdsRoutes = new Elysia({ prefix: "/households" })
  .get("/", async ({ query }) => listHouseholds(query), {
    beforeHandle: [requireRole(["admin", "operator"]) as any],
    query: HouseholdListQuery,
  })
  .get(
    "/:id",
    async ({ params }) => {
      const row = await getHousehold(Number(params.id));
      return row ?? {};
    },
    { beforeHandle: [requireRole(["admin", "operator"])] }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const created = await createHousehold(body);
      set.status = 201;
      return created;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: HouseholdCreate,
    }
  )
  .put(
    "/:id",
    async ({ params, body }) => updateHousehold(Number(params.id), body),
    {
      beforeHandle: [requireRole(["admin", "operator"])],
      body: HouseholdUpdate,
    }
  )
  .delete("/:id", async ({ params }) => deleteHousehold(Number(params.id)), {
    beforeHandle: [requireRole(["admin"])],
  });
