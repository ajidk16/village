import { and, asc, desc, ilike, or, SQL, sql } from "drizzle-orm";

/**
 * Pagination & sorting parser
 */
export function parseListQuery(query: {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: "asc" | "desc" | string;
}) {
  const page = Math.max(1, Number(query.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
  const offset = (page - 1) * limit;
  const orderDir = (
    String(query.order ?? "asc").toLowerCase() === "desc" ? "desc" : "asc"
  ) as "asc" | "desc";
  const sortKey = query.sort ?? undefined;
  return { page, limit, offset, orderDir, sortKey };
}

/**
 * Membangun where bersyarat dari:
 * - search global (q) ke banyak kolom dengan ILIKE
 * - filter exact match dari record (misal { rt: '04', rw: '02' })
 */
export function buildWhere({
  q,
  searchColumns,
  filters,
}: {
  q?: string | null;
  searchColumns?: SQL[] | any[];
  filters?: Array<SQL | undefined>;
}) {
  const parts: any = [];
  // const parts: SQL[] | unknown = [];

  if (q && q.trim() && searchColumns?.length) {
    const like = `%${q.trim()}%`;
    parts.push(or(...searchColumns.map((c) => ilike(c as any, like))));
  }

  if (filters && filters.length) {
    parts.push(and(...(filters.filter(Boolean) as SQL<unknown>[])));
  }

  if (!parts.length) return undefined;
  return and(...parts);
}

/**
 * Helper aman untuk mapping sort string → kolom Drizzle
 */
export function buildOrderBy<T extends Record<string, any>>(opts: {
  defaultColumn: string;
  sortKey?: string;
  orderDir: "asc" | "desc";
  columns: Record<string, any>;
  // columns: Record<string, SQL<unknown>>;
}) {
  if (!opts.sortKey) {
    opts.sortKey = opts.defaultColumn;
  } else {
    opts.sortKey = opts.sortKey;
  }

  const col = (opts.sortKey && opts.columns[opts.sortKey]) || undefined;
  if (!col) return undefined;
  return opts.orderDir === "asc" ? asc(col as any) : desc(col as any);
}

/**
 * Query total count yang cepat.
 */
export function countQuery() {
  return sql<number>`cast(count(*) as int)`;
}
