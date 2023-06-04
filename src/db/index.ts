import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema";

const CONNECTION_URL = "postgres://postgres:example@localhost:5432/next13";

const migrationClient = postgres(CONNECTION_URL, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "src/db/migrations" });

const queryClient = postgres(CONNECTION_URL);
export const db = drizzle(queryClient, { schema });
