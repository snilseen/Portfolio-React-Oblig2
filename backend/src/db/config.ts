import { createClient } from "@libsql/client";

// Database configuration
export const client = createClient({
  url: process.env.DB_FILE_NAME!,
});
