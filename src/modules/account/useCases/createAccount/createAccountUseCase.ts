import { AppError } from '~/errors/AppError';
import { PeopleRepositoryImpl } from '~/modules/people/repositories/implementations/peopleRepositoryImpl';
import { LoggedInService } from '~/utils/functis';
import { inject, injectable } from 'tsyringe';

import { messages } from '../../Messages/account';
import { AccountRepositoryImpl } from '../../repositories/implementations/accountRepositoryImpl';

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject('AccountRepositoryImpl')
    private repository: AccountRepositoryImpl,
    @inject('PeopleRepositoryImpl')
    private peopleRepository: PeopleRepositoryImpl
  ) {}
  async execute({ branch, account }: IAccountDTO) {
    if (branch.trim().length !== 3) {
      throw new AppError(messages.FailedToSendBranch);
    }
    const accountNumberExists =
      await this.repository.findAccountByNumberAccount({
        account,
      });

    if (accountNumberExists) {
      throw new AppError(messages.NumberAccountAlreadyExist);
    }
    const { people } = LoggedInService;

    const personLoggedIn = await this.peopleRepository.findPeopleById({
      id: people.id,
    });

    if (!personLoggedIn) {
      return new AppError(messages.PersonNotExist);
    }

    const accountCreated = await this.repository.create({
      branch,
      balance: String(0),
      account,
      person: personLoggedIn,
    });
    delete accountCreated.people;

    return accountCreated;
  }
}

export { CreateAccountUseCase };
