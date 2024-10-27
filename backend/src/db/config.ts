import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Database configuration
export const client = createClient({
  url: process.env.DB_FILE_NAME!,
});

export const db = drizzle(client);
