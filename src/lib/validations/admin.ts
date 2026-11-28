import { z } from "zod";
import { MAX_CUSTOM_LIMIT, USER_ROLES } from "@/config/roles";

const limitMessage = `Use a whole number from 0 to ${MAX_CUSTOM_LIMIT.toLocaleString("en-US")}, or leave it empty for the default.`;

const optionalLimit = z
  .string()
  .trim()
  .transform((value, context) => {
    if (!value) return null;
    const number = Number(value);
    if (!Number.isInteger(number) || number < 0 || number > MAX_CUSTOM_LIMIT) {
      context.addIssue({ code: "custom", message: limitMessage });
      return z.NEVER;
    }
    return number;
  });

export const roleSchema = z.object({ role: z.enum(USER_ROLES) });

export const limitsSchema = z.object({ files: optionalLimit, ai: optionalLimit });
