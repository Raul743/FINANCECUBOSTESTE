import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionRevertUseCase } from './createTransactionRevertUseCase';

class CreateTransactionRevertController {
  async handle(
    req: Request<{ accountId: string; transactionId: string }>,
    res: Response
  ) {
    const useCase = container.resolve(CreateTransactionRevertUseCase);

    const createdPeople = await useCase.execute({ ...req.params });

    return res.status(201).json({
      ...createdPeople,
    });
  }
}

export { CreateTransactionRevertController };
