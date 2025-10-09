import { z } from 'zod';

export const residentInput = z.object({
  household_id: z.string().optional(),                  // boleh kosong
  nik: z.string().regex(/^\d{16}$/, 'NIK harus 16 digit'),
  nama: z.string().min(2, 'Nama minimal 2 huruf'),
  jk: z.enum(['M', 'F']).optional(),                   // M/F
  agama: z.string().optional(),
  pendidikan: z.string().optional(),
  pekerjaan: z.string().optional(),
  alamat_domisili: z.string().optional(),
  tempat_lahir: z.string().optional(),
  tgl_lahir: z.string().optional(),                    // yyyy-mm-dd (ISO short)
  status_kawin: z.string().optional()
}).transform((d) => ({
  household_id: d.household_id ? Number(d.household_id) : null,
  nik: d.nik,
  nama: d.nama,
  jk: d.jk ?? null,
  agama: d.agama || null,
  pendidikan: d.pendidikan || null,
  pekerjaan: d.pekerjaan || null,
  alamat_domisili: d.alamat_domisili || null,
  tempat_lahir: d.tempat_lahir || null,
  tgl_lahir: d.tgl_lahir || null,
  status_kawin: d.status_kawin || null
}));

export type ResidentPayload = z.infer<typeof residentInput>;
