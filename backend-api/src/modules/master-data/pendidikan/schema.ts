import { t } from "elysia";

export const PendidikanCreate = t.Object({
  name: t.String(),
  status: t.Transform(t.Union([t.Boolean(), t.String()]))
    .Decode((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
      }
      return value;
    })
    .Encode((value) => value),
});
export type PendidikanCreate = typeof PendidikanCreate.static;

export const PendidikanUpdate = t.Partial(PendidikanCreate);
export type PendidikanUpdate = typeof PendidikanUpdate.static;

export const PendidikanListQuery = t.Object({
  q: t.Optional(t.String()),
  name: t.Optional(t.String()),
  status: t.Optional(t.Boolean()),
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),
  sort: t.Optional(t.String()),
  order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
});
export type PendidikanListQuery = typeof PendidikanListQuery.static;
