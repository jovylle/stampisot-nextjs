// src/utils/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:cwM9Oevt5Jjz@ep-dry-wind-a1eoxz2b.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
});

export default pool;