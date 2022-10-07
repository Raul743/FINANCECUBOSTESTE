import { AppDataSource } from '~/configs/db/postgres';
import { Accounts } from '~/models/Accounts';
import { Transactions } from '~/models/Transactions';
import { Repository } from 'typeorm';

import { ITransactionsRepository } from '../ITransactionsRepository';

class TransactionsRepositoryRepositoryImpl implements ITransactionsRepository {
  private repository: Repository<Transactions>;
  constructor() {
    this.repository = AppDataSource.getRepository(Transactions);
  }
  findTransactionsByAcountId({
    currentPage,
    itemsPerPage,
    accountId,
  }: {
    accountId: string;
    itemsPerPage: number;
    currentPage: number;
  }): Promise<Transactions[] | null> {
    return this.repository
      .createQueryBuilder('transactions')
      .innerJoin('transactions.receiverAccount', 'account')
      .where('account.id = :account_id', { account_id: accountId })
      .skip(currentPage - 1)
      .take(itemsPerPage)
      .orderBy('transactions.createdAt', 'DESC')
      .getMany();
  }
  findTransactionsByTransactionId(
    transactionId: string
  ): Promise<Transactions | null> {
    return this.repository.findOneBy({ id: transactionId });
  }

  create({
    description,
    counter,
    value,
    type,
    receiverAccount,
    senderAccount,
  }: {
    type: 'credit' | 'debit';
    value: string;
    description: string;
    counter: number;
    receiverAccount: Accounts;
    senderAccount: Accounts;
  }): Promise<Transactions | null> {
    const newTransactions = new Transactions();
    newTransactions.description = description;
    newTransactions.counter = counter;
    newTransactions.value = value;
    newTransactions.type = type;
    newTransactions.receiverAccount = receiverAccount;
    newTransactions.senderAccount = senderAccount;

    return this.repository.save(newTransactions);
  }
}

export { TransactionsRepositoryRepositoryImpl };
