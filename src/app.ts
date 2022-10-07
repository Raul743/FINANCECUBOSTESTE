import 'reflect-metadata';
import '~/configs/environments';
import { AppDataSource } from '~/configs/db/postgres';
import swaggerDocs from '~/docs';
import { errors } from '~/middlewares/errors';
import 'express-async-errors';
import routes from '~/routes';
import { versions } from '~/utils/versions';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';

import '~/shared/container';

const app = express();
AppDataSource.initialize();

app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(
  `${versions.current}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

app.use(versions.current, routes);

app.use(errors);

export default app;
