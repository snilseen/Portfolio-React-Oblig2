// db/schema.ts
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

// Definerer en brukertabell
export const usersTable = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }), // Primærnøkkel
  name: text("name").notNull(), // Navn (kan ikke være null)
  email: text("email").notNull().unique(), // Unik e-post
  role: text("role").default("user"), // Rolle (admin eller user)
});
