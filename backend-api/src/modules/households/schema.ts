import { t } from "elysia";

export const HouseholdCreate = t.Object({
  no_kk: t.String({ minLength: 8 }),
  alamat: t.Optional(t.String()),
  rt: t.Optional(t.String()),
  rw: t.Optional(t.String()),
  dusun: t.Optional(t.String()),
});
export type HouseholdCreate = typeof HouseholdCreate.static;

export const HouseholdUpdate = t.Partial(HouseholdCreate);
export type HouseholdUpdate = typeof HouseholdUpdate.static;

export const HouseholdListQuery = t.Object({
  q: t.Optional(t.String()),
  rt: t.Optional(t.String()),
  rw: t.Optional(t.String()),
  dusun: t.Optional(t.String()),
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),
  sort: t.Optional(t.String()),
  order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
});
export type HouseholdListQuery = typeof HouseholdListQuery.static;
