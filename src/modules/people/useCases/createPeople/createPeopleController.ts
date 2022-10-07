import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePeopleUseCase } from './createPeopleUseCase';

class CreatePeopleController {
  async handle(req: Request<any, any, IPeopleDto>, res: Response) {
    const useCase = container.resolve(CreatePeopleUseCase);

    const createdPeople = await useCase.execute(req.body);

    return res.status(201).json({
      ...createdPeople,
    });
  }
}

export { CreatePeopleController };
