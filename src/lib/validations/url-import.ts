import { z } from "zod";
import { urlImport } from "@/config/import-sources";

export const urlImportSchema = z.object({
  url: z.string().trim().min(1).max(urlImport.maxUrlLength),
});
