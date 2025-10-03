CREATE TYPE "public"."user_role" AS ENUM('admin', 'operator', 'warga');--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"action" varchar(32) NOT NULL,
	"entity" varchar(64) NOT NULL,
	"entity_id" integer,
	"path" varchar(256) NOT NULL,
	"method" varchar(8) NOT NULL,
	"status" integer NOT NULL,
	"meta" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY NOT NULL,
	"resident_id" integer,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_type" varchar(50) NOT NULL,
	"owner_id" integer NOT NULL,
	"path" text NOT NULL,
	"mime" varchar(150) NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "households" (
	"id" serial PRIMARY KEY NOT NULL,
	"no_kk" varchar(32) NOT NULL,
	"alamat" text,
	"rt" varchar(4),
	"rw" varchar(4),
	"dusun" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "households_no_kk_unique" UNIQUE("no_kk")
);
--> statement-breakpoint
CREATE TABLE "letter_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"resident_id" integer NOT NULL,
	"template_id" integer NOT NULL,
	"status" varchar(50) NOT NULL,
	"nomor_surat" varchar(100),
	"payload_json" jsonb DEFAULT '{}'::jsonb,
	"approved_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "letter_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" text NOT NULL,
	"body_template" text NOT NULL,
	"requires_attachments" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "letter_templates_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "residents" (
	"id" serial PRIMARY KEY NOT NULL,
	"household_id" integer NOT NULL,
	"nik" varchar(32) NOT NULL,
	"nama" varchar(120) NOT NULL,
	"jk" varchar(1),
	"tempat_lahir" varchar(120),
	"tgl_lahir" varchar(10),
	"agama" varchar(32),
	"pendidikan" varchar(64),
	"pekerjaan" varchar(64),
	"status_kawin" varchar(32),
	"alamat_domisili" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "residents_nik_unique" UNIQUE("nik")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'warga' NOT NULL,
	"locale" varchar(8) DEFAULT 'id' NOT NULL,
	"tz" varchar(64) DEFAULT 'Asia/Jakarta' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "letter_requests" ADD CONSTRAINT "letter_requests_template_id_letter_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."letter_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "residents" ADD CONSTRAINT "residents_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_entity_idx" ON "audit_logs" USING btree ("entity");--> statement-breakpoint
CREATE INDEX "audit_user_idx" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_created_at_idx" ON "audit_logs" USING btree ("created_at");