import express from 'express';
import bodyParser from 'body-parser';
import * as db from './database';
import router from './controller';

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(router);

db.connect();

app.get('/health', async (_req: any, res: any) => {
  res.status(200).send({ message: 'OK' });
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));