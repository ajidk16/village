import { t } from "elysia";

export const ResidentCreate = t.Object({
  household_id: t.Numeric(),
  nik: t.String({ minLength: 8 }),
  nama: t.String({ minLength: 2 }),
  jk: t.Optional(t.Union([t.Literal("M"), t.Literal("F")])),
  tempat_lahir: t.Optional(t.String()),
  tgl_lahir: t.Optional(t.String()), // yyyy-mm-dd
  agama: t.Optional(t.String()),
  pendidikan: t.Optional(t.String()),
  pekerjaan: t.Optional(t.String()),
  status_kawin: t.Optional(t.String()),
  alamat_domisili: t.Optional(t.String()),
});
export type ResidentCreate = typeof ResidentCreate.static;

export const ResidentUpdate = t.Partial(ResidentCreate);
export type ResidentUpdate = typeof ResidentUpdate.static;

export const ResidentListQuery = t.Object({
  q: t.Optional(t.String()),
  nik: t.Optional(t.String()),
  nama: t.Optional(t.String()),
  rt: t.Optional(t.String()),
  rw: t.Optional(t.String()),
  dusun: t.Optional(t.String()),
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),
  sort: t.Optional(t.String()),
  order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
  agama: t.Optional(t.String()),
  jk: t.Optional(t.String()),
});
export type ResidentListQuery = typeof ResidentListQuery.static;
