import { buildServer } from "./server";
import { logger } from "./utils/logger";
import { db } from "./db/client";

async function main() {
  // quick DB ping
  await db.execute("select 1");

  const app = buildServer();
  app.listen(process.env.PORT!, ({ hostname, port }) => {
    logger.info(`API running at http://${hostname ?? "localhost"}:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
