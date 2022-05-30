import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const { Pool } = pg;

const databaseConfig={
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

/* if(process.env.MODE == 'PROD'){
  databaseConfig.sql={
    rejectUnauthorized: false
  }
} */

const db = new Pool(databaseConfig)

export default db