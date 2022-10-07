import { Accounts } from '~/models/Accounts';
import { Transactions } from '~/models/Transactions';

interface ITransactionsRepository {
  create(data: {
    type: 'credit' | 'debit';
    value: string;
    description: string;
    counter: number;
    receiverAccount: Accounts;
    senderAccount: Accounts;
  }): Promise<Transactions | null>;
  findTransactionsByTransactionId(
    transactionId: string
  ): Promise<Transactions | null>;
  findTransactionsByAcountId({
    currentPage,
    itemsPerPage,
    accountId,
  }: {
    accountId: string;
    itemsPerPage: number;
    currentPage: number;
  }): Promise<Transactions[] | null>;
}

export { ITransactionsRepository };
