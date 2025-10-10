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
import cors from "@elysiajs/cors";
import { agamaRoutes } from "./modules/master-data/agama/routes";
import { pendidikanRoutes } from "./modules/master-data/pendidikan/routes";
import { pekerjaanRoutes } from "./modules/master-data/pekerjaan/routes";
import { statusKawinRoutes } from "./modules/master-data/status-kawin/routes";

export function buildServer() {
  const app = new Elysia({ name: "desa-api", prefix: "/api/v1" })
    .use(errorPlugin)
    .use(requestIdPlugin)
    .use(securityPlugin)
    .use(rateLimitPlugin)
    .use(authPlugin)
    .use(auditPlugin)
    .use(
      cors({
        origin: ["http://localhost:5173"],
        credentials: true, // WAJIB untuk cookie
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    )

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
    .use(agamaRoutes)
    .use(pendidikanRoutes)
    .use(pekerjaanRoutes)
    .use(statusKawinRoutes)

    .use(etagPlugin);

  return app;
}
