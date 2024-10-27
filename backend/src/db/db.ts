import Database from "better-sqlite3";
import { z } from "zod";

const db = new Database("projects.db");

// Opprett prosjekt-tabell hvis den ikke eksisterer
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    link TEXT,
    public BOOLEAN DEFAULT false,
    publishedAt TEXT,
    status TEXT DEFAULT 'active',
    tags TEXT
  )
`);

export default db;
