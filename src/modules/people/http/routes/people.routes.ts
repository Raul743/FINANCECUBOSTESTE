import { Router } from 'express';

import { CreatePeopleController } from '../../useCases/createPeople/createPeopleController';
import { createdPeaple } from '../middlewares/paople.middleware';

const routes = Router();

routes.post('/people', createdPeaple, new CreatePeopleController().handle);

export default routes;
