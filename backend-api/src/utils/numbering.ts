export function romanMonth(m: number) {
  const romans = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  return romans[m - 1] ?? String(m);
}

/**
 * Format nomor: {{CODE}}/{{RT}}/{{RW}}/{{ROMAN_MONTH}}/{{YYYY}}-{{SEQ}}
 * - fields: code, rt, rw, month, year, seq
 */
export function formatNomor(opts: {
  code: string;
  rt?: string;
  rw?: string;
  month: number;
  year: number;
  seq: number;
}) {
  const partRT = opts.rt ?? "XX";
  const partRW = opts.rw ?? "XX";
  return `${opts.code}/${partRT}/${partRW}/${romanMonth(opts.month)}/${
    opts.year
  }-${String(opts.seq).padStart(3, "0")}`;
}

/** Sederhana: ganti {{key}} dengan value dari map */
export function renderTemplate(tpl: string, data: Record<string, unknown>) {
  return tpl.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
    const v = data[key];
    return v == null ? "" : String(v);
  });
}
