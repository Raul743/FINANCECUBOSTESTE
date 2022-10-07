import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionDInternalUseCase } from './createTransactionInternalUseCase';

class CreateTransactionDebitController {
  async handle(
    req: Request<
      { accountId: string },
      any,
      { value: number; description: string; receiverAccountId: string }
    >,
    res: Response
  ) {
    const useCase = container.resolve(CreateTransactionDInternalUseCase);

    const createdPeople = await useCase.execute({ ...req.body, ...req.params });

    return res.status(201).json({
      ...createdPeople,
    });
  }
}

export { CreateTransactionDebitController };
