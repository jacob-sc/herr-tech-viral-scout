import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import type { SourceProfile, NicheProfile, Platform } from "../types";

const DB_DIR = path.join(process.cwd(), ".cache");
const DB_PATH = path.join(DB_DIR, "scout.db");
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24h

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile_cache (
      platform TEXT NOT NULL,
      handle   TEXT NOT NULL,
      payload  TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (platform, handle)
    );
    CREATE TABLE IF NOT EXISTS niche_cache (
      platform TEXT NOT NULL,
      handle   TEXT NOT NULL,
      payload  TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (platform, handle)
    );
  `);
  return db;
}

export function getCachedProfile(
  platform: Platform,
  handle: string,
  ttlMs = DEFAULT_TTL_MS,
): SourceProfile | null {
  const row = getDb()
    .prepare(
      "SELECT payload, created_at FROM profile_cache WHERE platform = ? AND handle = ?",
    )
    .get(platform, handle) as
    | { payload: string; created_at: number }
    | undefined;
  if (!row) return null;
  if (Date.now() - row.created_at > ttlMs) return null;
  return JSON.parse(row.payload) as SourceProfile;
}

export function putProfile(
  platform: Platform,
  handle: string,
  profile: SourceProfile,
): void {
  getDb()
    .prepare(
      "INSERT OR REPLACE INTO profile_cache (platform, handle, payload, created_at) VALUES (?, ?, ?, ?)",
    )
    .run(platform, handle, JSON.stringify(profile), Date.now());
}

export function getCachedNiche(
  platform: Platform,
  handle: string,
  ttlMs = DEFAULT_TTL_MS,
): NicheProfile | null {
  const row = getDb()
    .prepare(
      "SELECT payload, created_at FROM niche_cache WHERE platform = ? AND handle = ?",
    )
    .get(platform, handle) as
    | { payload: string; created_at: number }
    | undefined;
  if (!row) return null;
  if (Date.now() - row.created_at > ttlMs) return null;
  return JSON.parse(row.payload) as NicheProfile;
}

export function putNiche(
  platform: Platform,
  handle: string,
  niche: NicheProfile,
): void {
  getDb()
    .prepare(
      "INSERT OR REPLACE INTO niche_cache (platform, handle, payload, created_at) VALUES (?, ?, ?, ?)",
    )
    .run(platform, handle, JSON.stringify(niche), Date.now());
}
