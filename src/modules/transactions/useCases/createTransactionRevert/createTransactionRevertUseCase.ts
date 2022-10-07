import { AppError } from '~/errors/AppError';
import { AccountRepositoryImpl } from '~/modules/account/repositories/implementations/accountRepositoryImpl';
import { inject, injectable } from 'tsyringe';

import { messages } from '../../Messages/transactions';
import { TransactionsRepositoryRepositoryImpl } from '../../repositories/implementations/transactionsRepositoryImpl';

@injectable()
class CreateTransactionRevertUseCase {
  constructor(
    @inject('TransactionsRepositoryRepositoryImpl')
    private repository: TransactionsRepositoryRepositoryImpl,
    @inject('AccountRepositoryImpl')
    private repositoryAccount: AccountRepositoryImpl
  ) {}
  async execute({
    accountId,
    transactionId,
  }: {
    accountId: string;
    transactionId: string;
  }) {
    const account = await this.repositoryAccount.findAccountByNumberAccount({
      account: accountId,
    });
    const transactions = await this.repository.findTransactionsByTransactionId(
      transactionId
    );
    if (!account) {
      throw new AppError(messages.AccountTypedDoesNotExist);
    }
    if (!transactions) {
      throw new AppError(messages.TransactionDoNotExist);
    }
    if (transactions.counter !== 0) {
      throw new AppError(messages.TransactionAlreadyReversed);
    }

    const { receiverAccount } = transactions;
    const { senderAccount } = transactions;
    if (!(Number(senderAccount.balance) >= Number(transactions.value))) {
      throw new AppError(messages.AccountBalanceEnough);
    }

    senderAccount.balance = String(
      Number(senderAccount.balance) - Number(transactions.value)
    );

    receiverAccount.balance = String(
      Number(receiverAccount.balance) + Number(transactions.value)
    );
    transactions.counter = 1;
    transactions.type = transactions.type === 'debit' ? 'credit' : 'debit';
    transactions.senderAccount = transactions.receiverAccount;
    transactions.receiverAccount = transactions.senderAccount;

    transactions.save();
    senderAccount.save();
    receiverAccount.save();
    delete transactions.receiverAccount;
    delete transactions.senderAccount;

    return transactions;
  }
}

export { CreateTransactionRevertUseCase };
