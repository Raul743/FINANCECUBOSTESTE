import { LoggedInService } from '~/utils/functis';
import { inject, injectable } from 'tsyringe';

import { AccountRepositoryImpl } from '../../repositories/implementations/accountRepositoryImpl';

@injectable()
class FindAccountByPersonIdUseCase {
  constructor(
    @inject('AccountRepositoryImpl')
    private repository: AccountRepositoryImpl
  ) {}
  async execute() {
    const { people: person } = LoggedInService;

    const accounts = await this.repository.findAccountByPersonId({
      personId: person.id,
    });

    return accounts;
  }
}

export { FindAccountByPersonIdUseCase };
