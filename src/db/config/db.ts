import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: '!zd1',
});

const db = drizzle(pool);

export { db };
