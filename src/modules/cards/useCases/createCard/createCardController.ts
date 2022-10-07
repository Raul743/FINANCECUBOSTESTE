import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCardUseCase } from './createCardUseCase';

class CreateCardController {
  async handle(
    req: Request<any, any, ICardDTO, { accountId: string }>,
    res: Response
  ) {
    const useCase = container.resolve(CreateCardUseCase);

    const createdCard = await useCase.execute({
      ...req.body,
      account: req.params.accountId,
    });

    return res.status(201).json({
      data: createdCard,
    });
  }
}

export { CreateCardController };
