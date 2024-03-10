import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
})

const execute = async (query: string) => {
  try {
    await client.connect();
    await client.query(query);
    return true;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
}

const connect = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
      "email" VARCHAR(100) NOT NULL,
      "password" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );
    
    CREATE TABLE IF NOT EXISTS "clients" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
      "email" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

  try {
    console.log('Creating tables if not exist')
    execute(query)

    console.log('Tables created successfully')
  } catch (err: any) {
    console.error(err.message)
  }
}

export { connect, client };