import { Router } from 'express';

import { CreateTransactionDebitController } from '../../useCases/createTransactionDeposit/createTransactionController';
import { CreateTransactionRevertController } from '../../useCases/createTransactionRevert/createTransactionRevertController';
import { FindTransactionsByAccountIdController } from '../../useCases/findTransactionsByAccountId/findTransactionsByAccountIdController';
import {
  createdTransactionDeposit,
  createdTransactionInternal,
} from '../middlewares/transaction.middleware';

const routes = Router();

routes.post(
  '/accounts/:accountId/transactions',
  createdTransactionDeposit,
  new CreateTransactionDebitController().handle
);
routes.post(
  '/accounts/:accountId/transactions/internal',
  createdTransactionInternal,
  new CreateTransactionDebitController().handle
);
routes.post(
  '/accounts/:accountId/transactions/:transactionId/revert',
  new CreateTransactionRevertController().handle
);
routes.post(
  '/accounts/:accountId/transactions',
  new FindTransactionsByAccountIdController().handle
);
export default routes;
