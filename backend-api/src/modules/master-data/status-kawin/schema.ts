import { t } from "elysia";

export const statusKawinCreate = t.Object({
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
export type statusKawinCreate = typeof statusKawinCreate.static;

export const statusKawinUpdate = t.Partial(statusKawinCreate);
export type statusKawinUpdate = typeof statusKawinUpdate.static;

export const statusKawinListQuery = t.Object({
  q: t.Optional(t.String()),
  name: t.Optional(t.String()),
  status: t.Optional(t.Boolean()),
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),
  sort: t.Optional(t.String()),
  order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
});
export type statusKawinListQuery = typeof statusKawinListQuery.static;
