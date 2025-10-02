import type { Elysia } from "elysia";
import { logger } from "../utils/logger";

export const errorPlugin = (app: Elysia) =>
  app.onError(({ code, error, set }) => {
    const status =
      code === "NOT_FOUND"
        ? 404
        : code === "VALIDATION"
        ? 422
        : code === "PARSE"
        ? 400
        : 500;

    logger.error({ code, error: error instanceof Error ? error.message : String(error) });
    set.status = status;
    return { error: (error as any)?.message ?? "Internal Server Error" };
  });
