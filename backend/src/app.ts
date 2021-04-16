import { config } from 'dotenv';
import express from 'express';
import { connect } from './configs/db';
import { router } from './routes';
import cors from 'cors';

config();
const app: express.Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

connect();

export { app };
