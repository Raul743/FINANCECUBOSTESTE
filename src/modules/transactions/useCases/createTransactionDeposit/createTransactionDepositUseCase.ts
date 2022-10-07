import { AppError } from '~/errors/AppError';
import { AccountRepositoryImpl } from '~/modules/account/repositories/implementations/accountRepositoryImpl';
import { inject, injectable } from 'tsyringe';

import { messages } from '../../Messages/transactions';
import { TransactionsRepositoryRepositoryImpl } from '../../repositories/implementations/transactionsRepositoryImpl';

@injectable()
class CreateTransactionDepositUseCase {
  constructor(
    @inject('TransactionsRepositoryRepositoryImpl')
    private repository: TransactionsRepositoryRepositoryImpl,
    @inject('AccountRepositoryImpl')
    private repositoryAccount: AccountRepositoryImpl
  ) {}
  async execute({
    description,
    value,
    accountId,
  }: {
    value: number;
    description: string;
    accountId: string;
  }) {
    const account = await this.repositoryAccount.findAccountByNumberAccount({
      account: accountId,
    });

    if (!account) {
      throw new AppError(messages.AccountTypedDoesNotExist);
    }
    const balance = Number(account?.balance);
    if (balance < 0) {
      throw new AppError(messages.AccountBalanceNegative);
    }
    if (!(balance >= Number(value))) {
      throw new AppError(messages.AccountBalanceEnough);
    }

    const newBalance = balance - Number(value);
    account.balance = String(newBalance);

    account.save();

    const transactions = await this.repository.create({
      value: String(value),
      counter: 0,
      description,
      receiverAccount: account,
      senderAccount: account,
      type: 'debit',
    });
    delete transactions.receiverAccount;
    delete transactions.senderAccount;

    return transactions;
  }
}

export { CreateTransactionDepositUseCase };
