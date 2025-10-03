import { db } from "../../db/client";
import {
  households,
  letterCounters,
  letterRequests,
  letterTemplates,
  residents,
} from "../../db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { formatNomor, renderTemplate } from "../../utils/numbering";

export async function createTemplate(input: {
  code: string;
  name: string;
  bodyTemplate: string;
  fieldsMeta?: unknown;
}) {
  const [row] = await db
    .insert(letterTemplates)
    .values({
      code: input.code,
      name: input.name,
      bodyTemplate: input.bodyTemplate,
      fieldsMeta: (input.fieldsMeta ?? null) as any,
    })
    .returning();
  return row;
}

export async function listTemplates() {
  return db.select().from(letterTemplates).orderBy(desc(letterTemplates.id));
}

export async function createRequest(input: {
  residentId: number;
  templateId: number;
  payload: Record<string, unknown>;
}) {
  try {
    const [row] = await db
      .insert(letterRequests)
      .values({
        residentId: input.residentId,
        templateId: input.templateId,
        status: "draft",
        payloadJson: input.payload as any,
      })
      .returning();
    return row;
  } catch (error) {
    return { status: 500, message: "Failed to create data", data: error };
  }
}

export async function submitRequest(id: number) {
  const [row] = await db
    .update(letterRequests)
    .set({ status: "submitted" })
    .where(eq(letterRequests.id, id))
    .returning();
  return row ?? null;
}

export async function approveRequest(id: number, approvedBy: number) {
  const [row] = await db
    .update(letterRequests)
    .set({ status: "approved", approvedBy })
    .where(eq(letterRequests.id, id))
    .returning();
  return row ?? null;
}

export async function rejectRequest(id: number, approvedBy: number) {
  const [row] = await db
    .update(letterRequests)
    .set({ status: "rejected", approvedBy })
    .where(eq(letterRequests.id, id))
    .returning();
  return row ?? null;
}

/** Mengambil / menambah counter atomik untuk template+year, lalu format nomor sesuai KK (rt/rw) dari resident */
export async function issueRequest(id: number) {
  return db.transaction(async (tx) => {
    const [req] = await tx
      .select()
      .from(letterRequests)
      .where(eq(letterRequests.id, id))
      .limit(1);
    if (!req || req.status !== "approved")
      throw new Error("Request must be approved before issuing");

    const [tpl] = await tx
      .select()
      .from(letterTemplates)
      .where(eq(letterTemplates.id, req.templateId))
      .limit(1);
    if (!tpl) throw new Error("Template not found");

    const [resident] = await tx
      .select()
      .from(residents)
      .where(eq(residents.id, req.residentId))
      .limit(1);
    if (!resident) throw new Error("Resident not found");

    const [hh] = await tx
      .select()
      .from(households)
      .where(eq(households.id, resident.household_id))
      .limit(1);

    const now = new Date();
    const year = now.getFullYear();

    // upsert counter
    const existing = await tx.query.letterCounters.findFirst({
      where: (t, { and, eq }) =>
        and(eq(t.templateId, req.templateId), eq(t.year, year)),
    });

    let seq: number;
    if (!existing) {
      const [created] = await tx
        .insert(letterCounters)
        .values({ templateId: req.templateId, year, seq: 1 })
        .returning();
      if (!created) throw new Error("Failed to create counter");
      seq = created.seq;
    } else {
      const [updated] = await tx
        .update(letterCounters)
        .set({ seq: existing.seq + 1, updatedAt: new Date() })
        .where(
          and(
            eq(letterCounters.templateId, req.templateId),
            eq(letterCounters.year, year)
          )
        )
        .returning();
      if (!updated) throw new Error("Failed to update counter");
      seq = updated.seq;
    }

    const nomor = formatNomor({
      code: tpl.code,
      rt: hh?.rt ?? undefined,
      rw: hh?.rw ?? undefined,
      month: now.getMonth() + 1,
      year,
      seq,
    });

    const [updatedReq] = await tx
      .update(letterRequests)
      .set({
        status: "issued",
        nomorSurat: nomor,
        issuedAt: now,
      })
      .where(eq(letterRequests.id, id))
      .returning();

    return updatedReq;
  });
}

export async function previewRequest(id: number) {
  const [req] = await db
    .select()
    .from(letterRequests)
    .where(eq(letterRequests.id, id))
    .limit(1);
  if (!req) return null;

  const [tpl] = await db
    .select()
    .from(letterTemplates)
    .where(eq(letterTemplates.id, req.templateId))
    .limit(1);
  if (!tpl) return null;

  // Merge payload + resident/kk info minimal
  const [resident] = await db
    .select()
    .from(residents)
    .where(eq(residents.id, req.residentId))
    .limit(1);
  const [hh] = resident
    ? await db
        .select()
        .from(households)
        .where(eq(households.id, resident.household_id))
        .limit(1)
    : [null];

  const data = {
    ...((req.payloadJson as any) ?? {}),
    nama: resident?.nama,
    nik: resident?.nik,
    rt: hh?.rt,
    rw: hh?.rw,
  };

  const rendered = renderTemplate(tpl.bodyTemplate, data);
  return {
    requestId: req.id,
    template: tpl.name,
    code: tpl.code,
    nomorSurat: req.nomorSurat,
    status: req.status,
    rendered,
    data,
  };
}
