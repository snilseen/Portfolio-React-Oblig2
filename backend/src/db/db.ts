import Database from "better-sqlite3";

const db = new Database("projects.db", { verbose: console.log });

// Test tilkoblingen
try {
  const test = db.prepare("SELECT 1").get();
  console.log("Database connection successful:", test);
} catch (error) {
  console.error("Database connection failed:", error);
}

export default db;
