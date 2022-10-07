import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { QueryBalanceAccountUseCase } from './queryBalanceAccoutnUseCase';

class QueryBalanceAccountController {
  async handle(req: Request<{ accountId: string }>, res: Response) {
    const useCase = container.resolve(QueryBalanceAccountUseCase);

    const accounts = await useCase.execute({ ...req.params });

    return res.status(200).json({
      ...accounts,
    });
  }
}

export { QueryBalanceAccountController };
