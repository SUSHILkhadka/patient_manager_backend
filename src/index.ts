import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import errorHandler from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import logger from './misc/Logger';
import appRouter from './router/index';

dotenv.config();
const app: Application = express();
app.use(cors());
app.use(express.json());

app.use(appRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  logger.info('successfully listening to port ' + PORT);
});
