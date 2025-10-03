import { parse } from "csv-parse/sync";

export function parseCsv(text: string) {
  return parse(text, {
    columns: true, // header baris pertama
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];
}
