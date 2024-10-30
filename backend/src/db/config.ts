import { createClient } from "@libsql/client";

export const client = createClient({
  url: process.env.DB_FILE_NAME!,
});
