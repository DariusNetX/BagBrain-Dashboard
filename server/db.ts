import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "../shared/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure postgres connection with proper error handling and debug logging
const client = postgres(process.env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 60,
  onnotice: () => {}, // Suppress notices
  debug: false, // Disable debug for production
  transform: {
    undefined: null
  }
});

export const db = drizzle(client, { 
  schema,
  logger: false // Disable query logging for production
});