import accountRoutes from '~/modules/account/http/routes';
import { routerAuth } from '~/modules/auth/http/routes';
import cardseRoutes from '~/modules/cards/http/routes';
import peopleRoutes from '~/modules/people/http/routes';
import transactionsRoutes from '~/modules/transactions/http/routes';
import { Router } from 'express';

import baseRoute from './base.routes';
// importing files
const routes = Router();

// base route
routes.use(baseRoute);
routes.use(routerAuth);
routes.use(peopleRoutes);
routes.use(accountRoutes);
routes.use(cardseRoutes);
routes.use(transactionsRoutes);
export default routes;
