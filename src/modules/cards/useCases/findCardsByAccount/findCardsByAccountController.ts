import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCardsByAccountUseCase } from './findCardByAccountUseCase';

class FindCardsByAccountController {
  async handle(
    req: Request<any, any, any, { accountId: string }, { accountId: string }>,
    res: Response
  ) {
    const useCase = container.resolve(FindCardsByAccountUseCase);

    const cards = await useCase.execute({
      accountId: req.params.accountId,
    });

    return res.status(200).json({
      data: cards,
    });
  }
}

export { FindCardsByAccountController };
