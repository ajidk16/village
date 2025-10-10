import { db } from "@/db/client";
import { agama } from "@/db/schema";
import { eq, ilike, SQL } from "drizzle-orm";
import {
  buildOrderBy,
  buildWhere,
  countQuery,
  parseListQuery,
} from "@/utils/query";

export async function listData(query: {
  q?: string;
  name?: string;
  status?: boolean;
  order?: "asc" | "desc" | string;
  sort?: string;
  page?: number | string;
  limit?: number | string;
}) {
  const { page, limit, offset, orderDir, sortKey } = parseListQuery(query);

  const searchCols = [agama.name, agama.status];

  const filters: (SQL<unknown> | undefined)[] = [
    query.name ? ilike(agama.name, `%${query.name}%`) : undefined,
    query.status ? ilike(agama.status, `%${query.status}%`) : undefined,
  ];

  const where = buildWhere({ q: query.q, searchColumns: searchCols, filters });

  const sortColumns = {
    id: agama.id,
    name: agama.name,
    status: agama.status,
  };
  const orderBy = buildOrderBy({
    sortKey,
    orderDir,
    columns: sortColumns,
    defaultColumn: "id",
  });

  const rows = await db
    .select({
      id: agama.id,
      name: agama.name,
      status: agama.status,
    })
    .from(agama)
    .where(where)
    .orderBy(orderBy as any)
    .limit(limit)
    .offset(offset);

  const [totalRow] = await db
    .select({ count: countQuery() })
    .from(agama)
    .where(where);

  return {
    status: 200,
    message: "successfully retrieved agama",
    items: rows,
    page,
    limit,
    total: totalRow?.count ?? 0,
  };
}

export async function dataById(id: number) {
  const [row] = await db.select().from(agama).limit(1);

  if (!row) {
    return { status: 404, message: "Resident not found", data: null };
  }

  return { status: 200, message: "Successfully retrieved resident", data: row };
}

export async function createData(input: { name: string; status: boolean }) {
  try {
    const [created] = await db.insert(agama).values(input);

    return {
      status: 201,
      message: "Resident created successfully",
      data: created,
    };
  } catch (error) {
    return { status: 500, message: "Failed to create resident", data: error };
  }
}

export async function updateData(
  id: number,
  patch: Partial<{
    name: string;
    status: boolean;
  }>
) {
  try {
    const [updated] = await db
      .update(agama)
      .set(patch)
      .where(eq(agama.id, id))
      .returning();

    return {
      status: 200,
      message: "Resident updated successfully",
      data: updated,
    };
  } catch (error) {
    return { status: 500, message: "Failed to update resident", data: error };
  }
}

export async function deleteData(id: number) {
  const [deleted] = await db.delete(agama).where(eq(agama.id, id)).returning();

  if (!deleted) {
    return { status: 404, message: "Resident not found", data: null };
  }

  return {
    status: 200,
    message: "Resident deleted successfully",
    data: deleted,
  };
}
