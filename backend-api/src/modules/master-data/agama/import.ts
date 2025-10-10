import { Elysia, t } from "elysia";
import { requireRole } from "@/utils/rbac";
import { parseCsv } from "@/utils/csv";
import { db } from "@/db/client";
import { residents, households } from "@/db/schema";

export const residentimportRoutes = new Elysia({
  prefix: "/residents",
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

    let inserted = 0,
      skipped = 0,
      failed = 0;

    let result;

    for (const r of rows) {
      try {
        const nik = r.nik;
        const nama = r.nama;
        if (!nik || !nama) {
          skipped++;
          continue;
        }

        let household_id: number = 0;

        if (r.household_id) {
          household_id = parseInt(r.household_id);
        } else if (r.no_kk) {
          const hh = await db.query.households.findFirst({
            where: (t, { eq }) => eq(t.no_kk, r.no_kk!),
          });
          if (hh) household_id = hh.id;
        }

        result = await db
          .insert(residents)
          .values({
            household_id,
            nik,
            nama,
            jk: r.jk === "M" || r.jk === "F" ? r.jk : null,
            tempat_lahir: r.tempat_lahir || null,
            tgl_lahir: r.tgl_lahir || null,
            agama: r.agama || null,
            pendidikan: r.pendidikan || null,
            pekerjaan: r.pekerjaan || null,
            status_kawin: r.status_kawin || null,
            alamat_domisili: r.alamat_domisili || null,
          })
          .returning();
        inserted++;
      } catch {
        // duplicate/invalid → skip
        failed++;
      }
    }

    set.status = inserted > 0 ? 201 : 400;

    console.log(result);
    if (set.status === 400) {
      return { status: "failed", message: "no data imported" };
    }

    return {
      message: "successfully imported",
      inserted,
      skipped,
      failed,
      total: rows.length,
    };
  },
  {
    beforeHandle: [requireRole(["admin", "operator"])],
    body: t.Object({
      file: t.File(),
    }),
  }
);
