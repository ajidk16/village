import { eq } from "drizzle-orm";
import { hashPassword } from "../../modules/auth/service";
import { db } from "../client";
import { users } from "../schema";

export const userSeeder = async ({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: "admin" | "operator" | "warga";
}) => {
  const password = await hashPassword("bismillah"); // ganti di prod
  const [exist] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (exist) return exist;
  const [inserted] = await db
    .insert(users)
    .values({ name, email, role, password })
    .returning();
  return inserted;
};

(async () => {
  await userSeeder({
    name: "Admin Desa",
    email: "admin@desa.local",
    role: "admin",
  });
  await userSeeder({
    name: "Operator 1",
    email: "op1@desa.local",
    role: "operator",
  });
  await userSeeder({
    name: "Warga 1",
    email: "warga1@desa.local",
    role: "warga",
  });
  console.log("Seed selesai");
  process.exit(0);
})();
