import { db } from "../../db/client";
import { auditLogs } from "../../db/schema";

export async function writeAudit(entry: {
  userId?: number | null;
  action: "create" | "update" | "delete" | "login" | "logout" | string;
  entity: string;
  entityId?: number | null;
  path: string;
  method: string;
  status: number;
  meta?: unknown;
}) {
  await db.insert(auditLogs).values({
    userId: entry.userId ?? null,
    action: entry.action,
    entity: entry.entity,
    entityId: entry.entityId ?? null,
    path: entry.path,
    method: entry.method,
    status: entry.status,
    meta: entry.meta ? (entry.meta as any) : null,
  });
}
