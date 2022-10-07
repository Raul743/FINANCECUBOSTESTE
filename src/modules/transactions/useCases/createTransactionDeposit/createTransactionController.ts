import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionDepositUseCase } from './createTransactionDepositUseCase';

class CreateTransactionDebitController {
  async handle(
    req: Request<
      { accountId: string },
      any,
      { value: number; description: string }
    >,
    res: Response
  ) {
    const useCase = container.resolve(CreateTransactionDepositUseCase);

    const createdPeople = await useCase.execute({ ...req.body, ...req.params });

    return res.status(201).json({
      ...createdPeople,
    });
  }
}

export { CreateTransactionDebitController };
