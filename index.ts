import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
})

const execute = async (query: any) => {
  try {
      await client.connect();
      await client.query(query);
      return true;
  } catch (error: any) {
      console.error(error.message);
      return false;
  } finally {
      await client.end();
  }
};

const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
      "email" VARCHAR(100) NOT NULL,
      "password" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

execute(text).then(result => {
  if (result) {
    console.log('Table created');
  }
});

app.get('/health', async (_req: any, res: any) => {
  res.status(200).send({ message: 'OK' });
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));