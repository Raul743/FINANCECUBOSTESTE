import { inject, injectable } from 'tsyringe';

import { TransactionsRepositoryRepositoryImpl } from '../../repositories/implementations/transactionsRepositoryImpl';

@injectable()
class FindTransactionsByAccountUseCase {
  constructor(
    @inject('TransactionsRepositoryRepositoryImpl')
    private repository: TransactionsRepositoryRepositoryImpl
  ) {}
  async execute(data: {
    itemsPerPage?: number;
    currentPage?: number;
    accountId: string;
  }) {
    const { itemsPerPage = 10, currentPage = 1, accountId } = data;

    const transaction = await this.repository.findTransactionsByAcountId({
      accountId,
      currentPage,
      itemsPerPage,
    });

    return {
      ...transaction,
      pagination: {
        itemsPerPage,
        currentPage,
      },
    };
  }
}

export { FindTransactionsByAccountUseCase };
