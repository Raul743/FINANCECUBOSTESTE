import { AppError } from '~/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { messages } from '../../Messages/account';
import { AccountRepositoryImpl } from '../../repositories/implementations/accountRepositoryImpl';

@injectable()
class QueryBalanceAccountUseCase {
  constructor(
    @inject('AccountRepositoryImpl')
    private repository: AccountRepositoryImpl
  ) {}
  async execute({ accountId }: { accountId: string }) {
    const accounts = await this.repository.findAccountByNumberAccount({
      account: accountId,
    });
    if (!accounts) {
      throw new AppError(messages.AccountDoNotExist);
    }

    return { balance: accounts.balance };
  }
}

export { QueryBalanceAccountUseCase };
