import { Accounts } from '~/models/Accounts';
import { People } from '~/models/People';

interface IAccountRepository {
  create({
    balance,
    branch,
    account,
    person,
  }: {
    balance: string;
    branch: string;
    account: string;
    person: People;
  }): Promise<Accounts | null>;
  findAccountByPersonId({
    personId,
  }: {
    personId: string;
  }): Promise<Accounts[] | null>;

  findAccountByNumberAccount({
    account,
  }: {
    account: string;
  }): Promise<Accounts | null>;
}

export { IAccountRepository };
