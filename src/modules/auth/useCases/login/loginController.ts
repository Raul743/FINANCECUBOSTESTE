import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LoginUseCase } from './loginUseCase';

class LoginController {
  async handle(req: Request<any, any, ILoginDTO>, res: Response) {
    const loginUseCase = container.resolve(LoginUseCase);

    const login = await loginUseCase.execute(req.body);

    return res.status(200).json({
      ...login,
    });
  }
}

export { LoginController };
