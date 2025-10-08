import { db } from "../../db/client";
import { households, residents } from "../../db/schema";
import { eq, ilike, SQL } from "drizzle-orm";
import {
  buildOrderBy,
  buildWhere,
  countQuery,
  parseListQuery,
} from "../../utils/query";

export async function listResidents(query: {
  q?: string;
  nik?: string;
  nama?: string;
  rt?: string;
  rw?: string;
  dusun?: string;
  page?: number | string;
  limit?: number | string;
  sort?: string;
  agama?: string;
  jk?: "M" | "F" | string;
  order?: "asc" | "desc" | string;
}) {
  const { page, limit, offset, orderDir, sortKey } = parseListQuery(query);

  const searchCols = [residents.nik, residents.nama, residents.alamat_domisili];

  const filters: (SQL<unknown> | undefined)[] = [
    query.nik ? ilike(residents.nik, `%${query.nik}%`) : undefined,
    query.nama ? ilike(residents.nama, `%${query.nama}%`) : undefined,
    query.agama ? ilike(residents.agama, `%${query.agama}%`) : undefined,
    query.rt ? ilike(households.rt, query.rt) : undefined,
    query.rw ? ilike(households.rw, query.rw) : undefined,
    query.dusun ? ilike(households.dusun, `%${query.dusun}%`) : undefined,
    query.jk ? eq(residents.jk, query.jk) : undefined,
  ];

  const where = buildWhere({ q: query.q, searchColumns: searchCols, filters });

  const sortColumns = {
    id: residents.id,
    nik: residents.nik,
    nama: residents.nama,
    createdAt: residents.createdAt,
    updatedAt: residents.updatedAt,
  };
  const orderBy = buildOrderBy({
    sortKey,
    orderDir,
    columns: sortColumns,
    defaultColumn: "id",
  });

  const rows = await db
    .select({
      id: residents.id,
      household_id: residents.household_id,
      nik: residents.nik,
      nama: residents.nama,
      jk: residents.jk,
      agama: residents.agama,
      pekerjaan: residents.pekerjaan,
      pendidikan: residents.pendidikan,
      alamat_domisili: residents.alamat_domisili,
      rt: households.rt,
      rw: households.rw,
      dusun: households.dusun,
      createdAt: residents.createdAt,
    })
    .from(residents)
    .leftJoin(households, eq(residents.household_id, households.id))
    .where(where as any)
    .orderBy(orderBy as any)
    .limit(limit)
    .offset(offset);

  const [totalRow] = await db
    .select({ count: countQuery() })
    .from(residents)
    .leftJoin(households, eq(residents.household_id, households.id))
    .where(where as any);

  return {
    status: 200,
    message: "successfully retrieved residents",
    items: rows,
    page,
    limit,
    total: totalRow?.count ?? 0,
  };
}

export async function getResident(id: number) {
  const [row] = await db
    .select({
      household_id: residents.household_id,
      nik: residents.nik,
      nama: residents.nama,
      jk: residents.jk,
      agama: residents.agama,
      pekerjaan: residents.pekerjaan,
      pendidikan: residents.pendidikan,
      alamat_domisili: residents.alamat_domisili,
      rt: households.rt,
      rw: households.rw,
      dusun: households.dusun,
      tempat_lahir: residents.tempat_lahir,
      tgl_lahir: residents.tgl_lahir,
      status_kawin: residents.status_kawin,
      createdAt: residents.createdAt,
      updatedAt: residents.updatedAt,
    })
    .from(residents)
    .leftJoin(households, eq(residents.household_id, households.id))
    .where(eq(residents.id, id))
    .limit(1);

  if (!row) {
    return { status: 404, message: "Resident not found", data: null };
  }

  return { status: 200, message: "Successfully retrieved resident", data: row };
}

export async function createResident(input: {
  household_id: number;
  nik: string;
  nama: string;
  jk?: "M" | "F";
  tempatLahir?: string | null;
  tglLahir?: string | null;
  agama?: string | null;
  pendidikan?: string | null;
  pekerjaan?: string | null;
  statusKawin?: string | null;
  alamat_domisili?: string | null;
}) {
  try {
    const [created] = await db.insert(residents).values(input).returning();
    return {
      status: 201,
      message: "Resident created successfully",
      data: created,
    };
  } catch (error) {
    return { status: 500, message: "Failed to create resident", data: error };
  }
}

export async function updateResident(
  id: number,
  patch: Partial<{
    household_id: number;
    nik: string;
    nama: string;
    jk: "M" | "F";
    tempatLahir: string | null;
    tglLahir: string | null;
    agama: string | null;
    pendidikan: string | null;
    pekerjaan: string | null;
    statusKawin: string | null;
    alamat_domisili: string | null;
  }>
) {
  try {
    const [updated] = await db
      .update(residents)
      .set(patch)
      .where(eq(residents.id, id))
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

export async function deleteResident(id: number) {
  const [deleted] = await db
    .delete(residents)
    .where(eq(residents.id, id))
    .returning();

  if (!deleted) {
    return { status: 404, message: "Resident not found", data: null };
  }

  return {
    status: 200,
    message: "Resident deleted successfully",
    data: deleted,
  };
}
