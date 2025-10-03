import {
  pgTable,
  serial,
  varchar,
  timestamp,
  pgEnum,
  integer,
  text,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// enums
export const roleEnum = pgEnum("user_role", ["admin", "operator", "warga"]);

// users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("warga"),
  locale: varchar("locale", { length: 8 }).notNull().default("id"),
  tz: varchar("tz", { length: 64 }).notNull().default("Asia/Jakarta"),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
});

// households
export const households = pgTable("households", {
  id: serial("id").primaryKey(),
  no_kk: varchar("no_kk", { length: 32 }).notNull().unique(),
  alamat: text("alamat"),
  rt: varchar("rt", { length: 4 }),
  rw: varchar("rw", { length: 4 }),
  dusun: varchar("dusun", { length: 64 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// residents
export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  household_id: integer("household_id")
    .references(() => households.id)
    .notNull(),
  nik: varchar("nik", { length: 32 }).notNull().unique(),
  nama: varchar("nama", { length: 120 }).notNull(),
  jk: varchar("jk", { length: 1 }), // M/F
  tempat_lahir: varchar("tempat_lahir", { length: 120 }),
  tgl_lahir: varchar("tgl_lahir", { length: 10 }), // yyyy-mm-dd (sederhana dulu)
  agama: varchar("agama", { length: 32 }),
  pendidikan: varchar("pendidikan", { length: 64 }),
  pekerjaan: varchar("pekerjaan", { length: 64 }),
  status_kawin: varchar("status_kawin", { length: 32 }),
  alamat_domisili: text("alamat_domisili"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Complaints
export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  residentId: integer("resident_id"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Files
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  ownerType: varchar("owner_type", { length: 50 }).notNull(),
  ownerId: integer("owner_id").notNull(),
  path: text("path").notNull(),
  mime: varchar("mime", { length: 150 }).notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Audit Logs
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id"), // nullable utk anonymous
    action: varchar("action", { length: 32 }).notNull(), // create|update|delete|login|logout|…
    entity: varchar("entity", { length: 64 }).notNull(), // households|residents|auth|…
    entityId: integer("entity_id"), // opsional
    path: varchar("path", { length: 256 }).notNull(),
    method: varchar("method", { length: 8 }).notNull(),
    status: integer("status").notNull(),
    meta: jsonb("meta"), // payload ringkas
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    idxEntity: index("audit_entity_idx").on(t.entity),
    idxUser: index("audit_user_idx").on(t.userId),
    idxCreatedAt: index("audit_created_at_idx").on(t.createdAt),
  })
);

// Letter Templates
export const letterTemplates = pgTable(
  "letter_templates",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 32 }).notNull(),
    name: varchar("name", { length: 120 }).notNull(),
    bodyTemplate: text("body_template").notNull(),
    fieldsMeta: jsonb("fields_meta"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({
    codeIdx: index("letter_templates_code_idx").on(t.code),
  })
);

export const letterReqStatusEnum = pgEnum("letter_req_status", [
  "draft",
  "submitted",
  "approved",
  "rejected",
  "issued",
]);

export const letterRequests = pgTable(
  "letter_requests",
  {
    id: serial("id").primaryKey(),
    residentId: integer("resident_id").notNull(),
    templateId: integer("template_id").notNull(),
    status: letterReqStatusEnum("status").notNull().default("draft"),
    nomorSurat: varchar("nomor_surat", { length: 128 }),
    payloadJson: jsonb("payload_json"), // nilai untuk placeholder
    approvedBy: integer("approved_by"),
    issuedAt: timestamp("issued_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({
    idxResident: index("letter_requests_resident_idx").on(t.residentId),
    idxTemplate: index("letter_requests_template_idx").on(t.templateId),
    idxStatus: index("letter_requests_status_idx").on(t.status),
    idxIssuedAt: index("letter_requests_issued_idx").on(t.issuedAt),
  })
);

// Counter per template per tahun untuk nomor unik
export const letterCounters = pgTable(
  "letter_counters",
  {
    id: serial("id").primaryKey(),
    templateId: integer("template_id").notNull(),
    year: integer("year").notNull(),
    seq: integer("seq").notNull().default(0),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({
    uniq: uniqueIndex("letter_counters_template_year_uq").on(
      t.templateId,
      t.year
    ),
  })
);
