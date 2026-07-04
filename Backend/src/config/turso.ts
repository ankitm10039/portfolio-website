import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error(
    'Missing environment variable! Ensure TURSO_DATABASE_URL is set in your .env file.'
  );
}

// Initialize Turso (LibSQL) client
export const client = createClient({
  url,
  authToken: authToken || undefined,
});

/**
 * Initializes the database schema.
 * Creates the required tables automatically if they do not exist.
 */
export const initDatabase = async (): Promise<void> => {
  try {
    console.log('[Database] Connecting to Turso DB...');
    
    // SQLite/libSQL dialect schema definition
    await client.execute(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL
      );
    `);
    
    console.log('[Database] Turso DB table "contact_submissions" initialized successfully.');
  } catch (error) {
    console.error('[Database] Failed to initialize Turso database:', error);
    throw error;
  }
};
