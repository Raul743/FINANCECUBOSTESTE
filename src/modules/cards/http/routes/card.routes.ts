import { ensureAuthenticated } from '~/middlewares/ensureAuthenticated';
import { Router } from 'express';

import { CreateCardController } from '../../useCases/createCard/createCardController';
import { FindCardsByAccountController } from '../../useCases/findCardsByAccount/findCardsByAccountController';
import { FindCardsByPersonController } from '../../useCases/findCardsByPerson/findCardsByPersonController';
import { createdCard } from '../middlewares/card.middleware';

const routes = Router();

routes.use(ensureAuthenticated);
routes.post(
  '/accounts/:accountId/cards',
  createdCard,
  new CreateCardController().handle
);
routes.get(
  '/accounts/:accountId/cards',
  new FindCardsByAccountController().handle
);
routes.get('/cards', new FindCardsByPersonController().handle);

export default routes;
