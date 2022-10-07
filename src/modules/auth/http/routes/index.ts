import { Router } from 'express';

import { LoginController } from '../../useCases/login/loginController';
import { loginMiddleware } from '../middlewares/auth';

const routerAuth = Router();

routerAuth.post('/login', loginMiddleware, new LoginController().handle);

export { routerAuth };
