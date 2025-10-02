sip! aku bikinin roadmap 7 hari yang realistis biar MVP “Aplikasi Desa” (backend API Elysia + DB) selesai dan bisa dipresentasikan. Fokus: cepat jadi, rapi, dan siap di-scale. Kamu bisa tambahin frontend (Next.js/Svelte) setelah MVP API stabil.

# Garis besar MVP

* **Role**: `admin`, `operator`, `warga`
* **Modul inti**:

  1. Auth + RBAC
  2. Penduduk & KK (household) CRUD + pencarian/paginasi/sort
  3. Pengajuan Surat (request) berbasis template + penomoran
  4. Pengumuman/berita desa
  5. Pengaduan warga (ticket sederhana)
  6. Lampiran/berkas (lokal di dev, S3-compatible di prod)
  7. Audit log, rate limit, caching dasar
* **Teknologi**: Bun + **Elysia**, PostgreSQL + **Drizzle ORM**, skema validasi Elysia `t.*`, JWT auth, **Bun.test** untuk test, Docker Compose untuk infra dev.

# Timeline mingguan (Asia/Jakarta)

**Hari 1 — Kamis, 2 Okt** · *Scaffolding & Database*

* [x] Setup repo tunggal, lint/format, env (`.env.example`)
* [x] Docker Compose: Postgres + Adminer/pgAdmin
* [x] Drizzle: inisialisasi, migration runner, seeding dasar
* [x] Skema awal (ERD ringkas):

  * `users(id, name, email, password_hash, role, locale, tz, created_at, updated_at)`
  * `households(id, no_kk, alamat, rt, rw, dusun, created_at, updated_at)`
  * `residents(id, household_id, nik, nama, jk, tempat_lahir, tgl_lahir, agama, pendidikan, pekerjaan, status_kawin, alamat_domisili, created_at, updated_at)`
  * `letter_templates(id, code, name, body_template, requires_attachments[], created_at, updated_at)`
  * `letter_requests(id, resident_id, template_id, status, nomor_surat, payload_json, approved_by, created_at, updated_at)`
  * `announcements(id, title, body, published_at, created_at, updated_at)`
  * `complaints(id, resident_id/null, title, body, status, created_at, updated_at)`
  * `files(id, owner_type, owner_id, path, mime, size, created_at)`
  * `audit_logs(id, user_id, action, entity, entity_id, meta_json, created_at)`
* [x] Elysia bootstrap: healthcheck `/`, error handler global, CORS, helmet/basic security.
* **Output**: server nyala, `drizzle:push` jalan, ERD fix, / 200.

**Hari 2 — Jumat, 3 Okt** · *Auth & RBAC*

* [ ] Endpoint `POST /auth/register` (admin create operator/warga), `POST /auth/login` (JWT), `GET /me`
* [ ] Middleware JWT + dekorator `ctx.user`
* [ ] RBAC helper: `requireRole(['admin','operator'])`
* [ ] Password hashing (argon2/bcrypt-alt), policy password, throttle login
* [ ] Seed 1 admin + 2 operator + 5 warga
* **Output**: login jalan, role kebaca, proteksi route berfungsi, test dasar lulus.

**Hari 3 — Sabtu, 4 Okt** · *Penduduk & KK + Query Dinamis*

* [ ] CRUD `households`, `residents` (admin/operator)
* [ ] Endpoint list dengan **filter/search/sort/pagination** generik (query params):
  `?q=andi&rt=04&rw=02&sort=nama&order=asc&page=1&limit=20`
* [ ] Index DB untuk kolom pencarian umum (nik, nama, rt, rw)
* [ ] Validasi `t.Object` + sanitasi input
* [ ] Audit log (create/update/delete) auto
* **Output**: daftar penduduk cepat & stabil, query params fleksibel, audit tercatat.

**Hari 4 — Minggu, 5 Okt** · *Surat (Template + Pengajuan)*

* [ ] CRUD `letter_templates` (admin) – pakai `body_template` + placeholder (e.g. `{{nama}}`, `{{nik}}`)
* [ ] Flow `letter_requests`: create (warga/operator), status: `draft -> submitted -> approved -> rejected -> issued`
* [ ] Nomor surat generator (format: `{{kode}}/{{rt}}/{{rw}}/{{blnRomawi}}/{{yyyy}}-{{seq}}`)
* [ ] Endpoint `GET /letter-requests/:id/preview` (render JSON siap-cetak; PDF nanti)
* [ ] Hook audit + notifikasi sederhana (log/console untuk MVP)
* **Output**: alur pengajuan sampai approved/issued beres + nomor otomatis.

**Hari 5 — Senin, 6 Okt** · *Pengumuman, Pengaduan, Berkas, Kinerja*

* [ ] `announcements`: CRUD (admin/operator), publik `GET` untuk warga
* [ ] `complaints`: warga buat ticket, operator ubah status (`open, in_progress, resolved`)
* [ ] Upload berkas: lokal (dev) + abstraction provider S3 (prod), validasi mime & size
* [ ] **Rate limit** (per-IP & per-user) di route sensitif
* [ ] **Caching**: ETag/Last-Modified untuk `GET list/detail`, in-memory LRU untuk list populer
* [ ] Logging terstruktur (request id, latency) + access log ringkas
* **Output**: modul informasi & pengaduan jalan, beban stabil (limit & cache aktif).

**Hari 6 — Selasa, 7 Okt** · *Quality: Test, Keamanan, Observabilitas*

* [ ] **Integration test** (Bun.test) untuk jalur kritikal: auth, CRUD, surat flow
* [ ] Validasi ketat & error mapping (422 vs 400 vs 401/403)
* [ ] Hardening: headers security, size limits, file path safety, SQL constraints
* [ ] Metrics: endpoint sederhana `/metrics` (counter request), health deep `/healthz` (DB ping)
* [ ] Backup & restore skrip DB, migrasi zero-downtime checklist
* **Output**: suite test lari di CI, skor coverage minimal rute kritikal, checklist security.

**Hari 7 — Rabu, 8 Okt** · *Deployment & Handover*

* [ ] Env prod, Dockerfile, image build, Compose/K8s kecil (opsional)
* [ ] Reverse proxy (Caddy/Nginx), HTTPS (Let’s Encrypt), gzip/br
* [ ] Seed data demo, akun admin demo
* [ ] **Dokumentasi**: README, `.http`/Postman Collection, diagram ERD, diagram arsitektur, SOP rilis
* [ ] **Demo script** 10 menit (alur end-to-end)
* **Output**: app live, endpoint public (non-sensitif), dok lengkap untuk serah-terima.

---

## Arsitektur ringkas

* **API**: Elysia modular routes (`/auth`, `/residents`, `/households`, `/letters`, `/announcements`, `/complaints`, `/files`)
* **Middleware kunci**: error handler global, CORS, JWT guard, RBAC guard, rate limit, cache, request-id, logger
* **DB**: Postgres (Drizzle migrations & seeds)
* **Observability**: access log, metrics minimal, audit log tabel
* **Storage**: lokal (dev) → S3 kompatibel (prod)

## Struktur folder (saran)

```
apps/api/
  src/
    index.ts
    plugins/
      security.ts      // cors, helmet-ish, rate limit, request-id
      auth.ts          // jwt verify, ctx.user
      cache.ts         // ETag/Last-Modified helpers
    modules/
      auth/
        routes.ts
        service.ts
        schema.ts
      residents/
        routes.ts
        service.ts
        schema.ts
      households/...
      letters/...
      announcements/...
      complaints/...
      files/...
      audit/
        hook.ts
    db/
      schema.ts
      drizzle.config.ts
      migrations/
      seeds/
    utils/
      rbac.ts
      numbering.ts      // generator nomor surat
      query.ts          // builder filter/sort/paginate generik
      logger.ts
  tests/
    auth.test.ts
    residents.test.ts
    letters-flow.test.ts
docker/
  compose.yml
```

## Definisi Selesai (DoD) per modul

* **Auth**: JWT, refresh (opsional), throttle login, test lulus
* **Residents/Households**: CRUD + filter/search/sort/pagination + index DB
* **Letters**: template CRUD, pengajuan end-to-end sampai `issued`, nomor unik teruji
* **Announcements**: list publik cacheable, CRUD proteksi role
* **Complaints**: create oleh warga, update status oleh operator, audit tercatat
* **Files**: upload + limit + link aman, metadata tersimpan
* **Non-fungsional**: rate limit aktif, cache GET, log & audit, CI test

## Milestone & Demo checklist

1. Login admin → buat operator/warga
2. Import/seed penduduk & KK → cari/filter cepat
3. Warga buat pengajuan surat → operator approve → nomor surat keluar → preview JSON
4. Admin buat pengumuman → warga lihat list (cache hit)
5. Warga kirim pengaduan → operator ubah status → audit tercatat

## Risiko & rencana “cut scope” bila mepet waktu

* Tunda PDF generator (cukup preview JSON/HTML)
* Tunda refresh token (pakai access token pendek + re-login)
* Batasi jenis surat ke 3 template dulu
* Upload file: dev lokal dulu, S3 pasca-rilis

---

kalau kamu mau, aku bisa langsung bikinin:

* daftar **endpoint detail** (path + method + request/response contoh),
* skema `drizzle` awal,
* snippet **middleware rate limit + cache**,
* serta **query builder** filter/sort/paginate generik yang plug-and-play di Elysia.
