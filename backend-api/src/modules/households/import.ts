import { Elysia, t } from "elysia";
import { requireRole } from "@/utils/rbac";
import { parseCsv } from "@/utils/csv";
import { db } from "@/db/client";
import { households } from "@/db/schema";

export const householdsImportRoutes = new Elysia({
  prefix: "/households",
}).post(
  "/import",
  async ({ body, set }) => {
    const file = body.file;
    if (!file) {
      set.status = 400;
      return { error: "file (CSV) is required with field name 'file'" };
    }
    const text = await file.text();
    const rows = parseCsv(text);

    // Kolom yang diharapkan: no_kk, alamat, rt, rw, dusun
    let inserted = 0,
      skipped = 0,
      failed = 0;
    for (const r of rows) {
      try {
        if (!r.no_kk) {
          skipped++;
          continue;
        }
        await db
          .insert(households)
          .values({
            no_kk: r.no_kk,
            alamat: r.alamat || null,
            rt: r.rt || null,
            rw: r.rw || null,
            dusun: r.dusun || null,
          })
          .returning();
        inserted++;
      } catch {
        // duplicate/invalid → skip
        failed++;
      }
    }
    set.status = 201;
    return { inserted, skipped, failed, total: rows.length };
  },
  { 
    beforeHandle: [requireRole(["admin", "operator"])],
    body: t.Object({
      file: t.File()
    })
  }
);
