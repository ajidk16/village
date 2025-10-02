import { Elysia } from "elysia";
import { securityPlugin } from "./plugins/security";
import { errorPlugin } from "./plugins/error";
import { requestIdPlugin } from "./plugins/requestId";
import { rateLimitPlugin } from "./plugins/rateLimit";
import { authRoutes } from "./modules/auth/routes";
import { authPlugin } from "./modules/auth/plugin";
import { residentsRoutes } from "./modules/residents/routes";
import { householdsRoutes } from "./modules/households/routes";

export function buildServer() {
  const app = new Elysia({ name: "desa-api" })
    .use(errorPlugin)
    .use(requestIdPlugin)
    .use(securityPlugin)
    .use(rateLimitPlugin)
    .use(authPlugin)

    // .use(cors)
    .use(authRoutes)
    .use(householdsRoutes)
    .use(residentsRoutes)
    .get("/", () => "Hello Desa!");

  return app;
}
