import { Elysia } from "elysia";
import { requireRole } from "@/utils/rbac";
import { PekerjaanCreate, PekerjaanListQuery, PekerjaanUpdate } from "./schema";
import {
  createData,
  deleteData,
  dataById,
  listData,
  updateData,
} from "./service";

export const pekerjaanRoutes = new Elysia({ prefix: "/pekerjaan" })
  .get(
    "/",
    async ({ query }) => {
      const residents = await listData(query);
      return residents;
    },
    {
      beforeHandle: [requireRole(["admin", "operator"]) as any],
      query: PekerjaanListQuery,
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      const resident = await dataById(Number(params.id));
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
      const created = await createData(body);
      set.status = created.status === 500 ? 500 : 201;
      return created;
    },
    { beforeHandle: [requireRole(["admin", "operator"])], body: PekerjaanCreate }
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const updated = await updateData(Number(params.id), body);

      set.status = updated.status === 500 ? 500 : 200;

      return updated;
    },
    { beforeHandle: [requireRole(["admin", "operator"])], body: PekerjaanUpdate }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteData(Number(params.id));

      set.status = result.status === 404 ? 404 : 200;

      return result;
    },
    {
      beforeHandle: [requireRole(["admin"])],
    }
  );
