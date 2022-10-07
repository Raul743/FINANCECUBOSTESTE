import { Router } from 'express';

// routes files
import transactionsRoutes from './transactions.routes';

const router = Router();

router.use(transactionsRoutes);

export default router;
