import { Elysia } from "elysia";
import { requireRole } from "../../utils/rbac";
import { ResidentCreate, ResidentListQuery, ResidentUpdate } from "./schema";
import {
  createResident,
  deleteResident,
  getResident,
  listResidents,
  updateResident,
} from "./service";

export const residentsRoutes = new Elysia({ prefix: "/residents" })
  .get(
    "/",
    async ({ query }) => {
      const residents = await listResidents(query);
      return residents;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"]) as any],
      query: ResidentListQuery,
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      const resident = await getResident(Number(params.id));
      set.status = resident.status === 404 ? 404 : 200;
      return resident;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"])],
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const created = await createResident(body);
      set.status = created.status === 500 ? 500 : 201;
      return created;
    },
    { beforeHandle: [requireRole(["admin", "operator"])], body: ResidentCreate }
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const updated = await updateResident(Number(params.id), body);

      set.status = updated.status === 500 ? 500 : 200;

      return updated;
    },
    { beforeHandle: [requireRole(["admin", "operator"])], body: ResidentUpdate }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteResident(Number(params.id));

      set.status = result.status === 404 ? 404 : 200;

      return result;
    },
    {
      beforeHandle: [requireRole(["admin"])],
    }
  );
