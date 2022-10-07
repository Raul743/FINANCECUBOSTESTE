import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAccountByPersonIdUseCase } from './findAccountByPersonIdUseCase';

class FindAccountByPersonIdController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(FindAccountByPersonIdUseCase);

    const accounts = await useCase.execute();

    return res.status(200).json({
      ...accounts,
    });
  }
}

export { FindAccountByPersonIdController };
