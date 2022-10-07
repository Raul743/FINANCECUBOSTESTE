import { AppDataSource } from '~/configs/db/postgres';
import { Accounts } from '~/models/Accounts';
import { People } from '~/models/People';
import { Repository } from 'typeorm';

import { IAccountRepository } from '../IAccountRepository';

class AccountRepositoryImpl implements IAccountRepository {
  private repository: Repository<Accounts>;
  constructor() {
    this.repository = AppDataSource.getRepository(Accounts);
  }
  findAccountByNumberAccount({
    account,
  }: {
    account: string;
  }): Promise<Accounts | null> {
    return this.repository.findOneBy({ id: account });
  }
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
  }): Promise<Accounts | null> {
    const newAccount = new Accounts();
    newAccount.people = person;
    newAccount.branch = branch;
    newAccount.account = account;
    newAccount.balance = balance;

    return this.repository.save(newAccount);
  }
  findAccountByPersonId({
    personId,
  }: {
    personId: string;
  }): Promise<Accounts[] | null> {
    return this.repository
      .createQueryBuilder('account')
      .innerJoin('account.people', 'people')
      .where('people.id = :people_id', { people_id: personId })
      .getMany();
  }
}
export { AccountRepositoryImpl };
