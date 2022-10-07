import { Router } from 'express';

// routes files
import accountRoutes from './account.routes';

const router = Router();

router.use(accountRoutes);

export default router;
