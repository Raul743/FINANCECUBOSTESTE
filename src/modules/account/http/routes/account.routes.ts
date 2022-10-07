import { ensureAuthenticated } from '~/middlewares/ensureAuthenticated';
import { Router } from 'express';

import { CreateAccountController } from '../../useCases/createAccount/createAccountController';
import { FindAccountByPersonIdController } from '../../useCases/findAccountByPersonId/findAccountByPersonIdController';
import { QueryBalanceAccountController } from '../../useCases/queryBalanceAccount/queryBalanceAccountController';
import { createdAccount } from '../middlewares/account.middleware';

const routes = Router();
routes.use(ensureAuthenticated);
routes.post('/account', createdAccount, new CreateAccountController().handle);
routes.get('/account', new FindAccountByPersonIdController().handle);
routes.get(
  '/accounts/:accountId/balance',
  new QueryBalanceAccountController().handle
);
export default routes;
