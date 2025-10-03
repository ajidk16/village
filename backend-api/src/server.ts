import { Elysia } from "elysia";
import { securityPlugin } from "./plugins/security";
import { errorPlugin } from "./plugins/error";
import { requestIdPlugin } from "./plugins/requestId";
import { rateLimitPlugin } from "./plugins/rateLimit";
import { authRoutes } from "./modules/auth/routes";
import { authPlugin } from "./modules/auth/plugin";
import { residentsRoutes } from "./modules/residents/routes";
import { householdsRoutes } from "./modules/households/routes";
import { auditPlugin } from "./plugins/audit";
import { etagPlugin } from "./plugins/cache";
import { householdsImportRoutes } from "./modules/households/import";
import { residentimportRoutes } from "./modules/residents/import";
import { auditRoutes } from "./modules/audit/routes";
import { announcementsRoutes } from "./modules/announcements/routes";
import { complaintsRoutes } from "./modules/complaints/routes";
import {
  letterRequestsRoutes,
  letterTemplatesRoutes,
} from "./modules/letters/routes";

export function buildServer() {
  const app = new Elysia({ name: "desa-api" })
    .use(errorPlugin)
    .use(requestIdPlugin)
    .use(securityPlugin)
    .use(rateLimitPlugin)
    .use(authPlugin)
    .use(auditPlugin)

    // .use(cors)
    .use(authRoutes)
    .use(householdsRoutes)
    .use(residentsRoutes)
    .use(householdsImportRoutes)
    .use(residentimportRoutes)
    .use(auditRoutes)
    .use(announcementsRoutes)
    .use(complaintsRoutes)
    .use(letterTemplatesRoutes)
    .use(letterRequestsRoutes)
    .use(etagPlugin);

  return app;
}
