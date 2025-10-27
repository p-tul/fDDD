import 'reflect-metadata';
import './container'; // This loads the DI container

import express from 'express';
import { router } from '@/http/routes';

const app = express();

app.use(express.json());
app.use('/api', router);

export { app };
