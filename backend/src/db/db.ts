import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("projects.db");

export default db;
