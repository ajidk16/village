import { db } from "../../db/client";
import { households } from "../../db/schema";
import { eq, ilike, and, SQL } from "drizzle-orm";
import {
  buildOrderBy,
  buildWhere,
  countQuery,
  parseListQuery,
} from "../../utils/query";

export async function listHouseholds(query: {
  q?: string;
  rt?: string;
  rw?: string;
  dusun?: string;
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: "asc" | "desc" | string;
}) {
  const { page, limit, offset, orderDir, sortKey } = parseListQuery(query);

  // Searchable columns
  const searchCols = [
    households.no_kk,
    households.alamat,
    households.dusun,
  ] as unknown as SQL<unknown>[];

  // Filters exact match
  const filters: (SQL<unknown> | undefined)[] = [
    query.rt ? ilike(households.rt, query.rt) : undefined,
    query.rw ? ilike(households.rw, query.rw) : undefined,
    query.dusun ? ilike(households.dusun, `%${query.dusun}%`) : undefined,
  ];

  const where = buildWhere({ q: query.q, searchColumns: searchCols, filters });

  const sortColumns = {
    id: households.id,
    no_kk: households.no_kk,
    rt: households.rt,
    rw: households.rw,
    dusun: households.dusun,
    createdAt: households.createdAt,
    updatedAt: households.updatedAt,
  };
  const orderBy = buildOrderBy({
    sortKey,
    orderDir,
    columns: sortColumns,
    defaultColumn: "id",
  });

  const rows = await db
    .select()
    .from(households)
    .where(where)
    .orderBy(orderBy as any)

    .limit(limit)
    .offset(offset);

  const [totalRow] = await db
    .select({ count: countQuery() })
    .from(households)
    .where(where);
  return {
    message: "Successfully retrieved households",
    items: rows,
    page,
    limit,
    total: totalRow?.count ?? 0,
  };
}

export async function getHousehold(id: number) {
  const [row] = await db
    .select()
    .from(households)
    .where(eq(households.id, id))
    .limit(1);
  return { message: "Successfully retrieved household", data: row ?? null };
}

export async function createHousehold(input: {
  no_kk: string;
  alamat?: string | null;
  rt?: string | null;
  rw?: string | null;
  dusun?: string | null;
}) {
  const [created] = await db
    .insert(households)
    .values({ ...input })
    .returning();
  return { message: "Household created successfully", data: created };
}

export async function updateHousehold(
  id: number,
  patch: Partial<{
    no_kk: string;
    alamat: string | null;
    rt: string | null;
    rw: string | null;
    dusun: string | null;
  }>
) {
  const [updated] = await db
    .update(households)
    .set({ ...patch })
    .where(eq(households.id, id))
    .returning();
  return { message: "Household updated successfully", data: updated ?? null };
}

export async function deleteHousehold(id: number) {
  const [deleted] = await db
    .delete(households)
    .where(eq(households.id, id))
    .returning();
  return { message: "Household deleted successfully", data: deleted ?? null };
}
