import db from "./db";

export function createProjectsTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      link TEXT,
      public INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      tags TEXT,
      publishedAt TEXT
    )
  `);
}
