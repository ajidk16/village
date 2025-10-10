import { db } from "@/db/client";
import { eq, ilike, SQL } from "drizzle-orm";
import {
  buildOrderBy,
  buildWhere,
  countQuery,
  parseListQuery,
} from "@/utils/query";
import { statusKawin } from "@/db/schema";

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

  const searchCols = [statusKawin.name, statusKawin.status];

  const filters: (SQL<unknown> | undefined)[] = [
    query.name ? ilike(statusKawin.name, `%${query.name}%`) : undefined,
    query.status ? ilike(statusKawin.status, `%${query.status}%`) : undefined,
  ];

  const where = buildWhere({ q: query.q, searchColumns: searchCols, filters });

  const sortColumns = {
    id: statusKawin.id,
    name: statusKawin.name,
    status: statusKawin.status,
  };
  const orderBy = buildOrderBy({
    sortKey,
    orderDir,
    columns: sortColumns,
    defaultColumn: "id",
  });

  console.log(sortKey, orderDir);

  const rows = await db
    .select({
      id: statusKawin.id,
      name: statusKawin.name,
      status: statusKawin.status,
    })
    .from(statusKawin)
    .where(where as any)
    .orderBy(orderBy as any)
    .limit(limit)
    .offset(offset);

  const [totalRow] = await db
    .select({ count: countQuery() })
    .from(statusKawin)
    .where(where as any);

  return {
    status: 200,
    message: "successfully retrieved statusKawin",
    items: rows,
    page,
    limit,
    total: totalRow?.count ?? 0,
  };
}

export async function dataById(id: number) {
  const [row] = await db.select().from(statusKawin).limit(1);

  if (!row) {
    return { status: 404, message: "Resident not found", data: null };
  }

  return { status: 200, message: "Successfully retrieved resident", data: row };
}

export async function createData(input: { name: string; status: boolean }) {
  try {
    const [created] = await db.insert(statusKawin).values(input);

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
      .update(statusKawin)
      .set(patch)
      .where(eq(statusKawin.id, id))
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
  const [deleted] = await db.delete(statusKawin).where(eq(statusKawin.id, id)).returning();

  if (!deleted) {
    return { status: 404, message: "Resident not found", data: null };
  }

  return {
    status: 200,
    message: "Resident deleted successfully",
    data: deleted,
  };
}
