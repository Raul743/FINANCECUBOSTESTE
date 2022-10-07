import { PeopleRepositoryImpl } from '~/modules/people/repositories/implementations/peopleRepositoryImpl';
import { removeMaskForCpfOrCnpj } from '~/utils/functis';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { MessagesAuth } from '../../messages/auth';

@injectable()
class LoginUseCase {
  constructor(
    @inject('PeopleRepositoryImpl')
    private repository: PeopleRepositoryImpl
  ) {}

  async execute({ document, password }: ILoginDTO) {
    const documentFormated = removeMaskForCpfOrCnpj(document);
    const peopleExist = await this.repository.findPeopleByDocument({
      document: documentFormated,
    });

    if (!peopleExist) {
      throw new AppError(MessagesAuth.loginFailed, 401);
    }

    const isPasswordEqual = await bcrypt.compare(
      password,
      peopleExist.password
    );

    if (!isPasswordEqual) {
      throw new AppError(MessagesAuth.loginFailed, 401);
    }

    const token = jwt.sign(
      { id: peopleExist.id },
      process.env.JWT_SECRET ?? '',
      {
        expiresIn: '7d',
      }
    );

    return {
      token: `Bearer ${token}`,
    };
  }
}

export { LoginUseCase };
