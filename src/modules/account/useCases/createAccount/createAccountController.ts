import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAccountUseCase } from './createAccountUseCase';

class CreateAccountController {
  async handle(req: Request<any, any, IAccountDTO>, res: Response) {
    const useCase = container.resolve(CreateAccountUseCase);

    const createdAccount = await useCase.execute(req.body);

    return res.status(201).json({
      ...createdAccount,
    });
  }
}

export { CreateAccountController };
