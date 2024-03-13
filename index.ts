import express from 'express';
import { json } from 'body-parser';
import * as db from './database';
import router from './controller';
import cors from 'cors';

const PORT = 3000;

const app = express();
app.use(json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))
app.use(router);

db.connect();
app.get('/health', async (_req: any, res: any) => {
  res.status(200).send({ message: 'OK' });
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));