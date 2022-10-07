import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindTransactionsByAccountUseCase } from './findTransactionsByAccountIdUseCase';

class FindTransactionsByAccountIdController {
  async handle(
    req: Request<
      { accountId: string },
      any,
      any,
      { itemsPerPage?: number; currentPage?: number }
    >,
    res: Response
  ) {
    const useCase = container.resolve(FindTransactionsByAccountUseCase);

    const cards = await useCase.execute({ ...req.query, ...req.params });

    return res.status(200).json({
      ...cards,
    });
  }
}

export { FindTransactionsByAccountIdController };
