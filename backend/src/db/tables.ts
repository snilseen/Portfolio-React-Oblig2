export function createProjectsTable() {
  return `
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      link TEXT,
      public INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      tags TEXT,
      published_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;
}
