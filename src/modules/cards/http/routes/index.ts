import { Router } from 'express';

// routes files
import cardsRoutes from './card.routes';

const router = Router();

router.use(cardsRoutes);

export default router;
