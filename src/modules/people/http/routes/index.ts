import { Router } from 'express';

// routes files
import peopleRoutes from './people.routes';

const router = Router();

router.use(peopleRoutes);

export default router;
