import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  res.json({
    summary: 'FINANCE CUBOS API',
    version: '1.0.0',
    status: 'Running on Development',
    origin: 'CUBOS - Development',
  });
});

export default routes;
