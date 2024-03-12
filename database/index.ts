import { Client } from 'pg';
import dotenv from 'dotenv';
import { uuid } from 'uuidv4';

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
	    "id" VARCHAR(100) NOT NULL,
	    "name" VARCHAR(100) NOT NULL,
      "email" VARCHAR(100) NOT NULL UNIQUE,
      "password" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );
    
    INSERT INTO public.users(
      id, name, email, password)
      VALUES ('${uuid()}', 'Admin', 'admin@email.com', 's3nh4_f0rt3');

    CREATE TABLE IF NOT EXISTS "clients" (
	    "id" VARCHAR(100) NOT NULL,
	    "name" VARCHAR(100) NOT NULL,
      "email" VARCHAR(100) UNIQUE,
      "phone" VARCHAR(100),
      "coordinate" VARCHAR(100),
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