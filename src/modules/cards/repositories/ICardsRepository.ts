import { AccountCard } from '~/models/AccountCard';
import { Accounts } from '~/models/Accounts';
import { Cards } from '~/models/Cards';

interface ICardsRepository {
  create(data: ICardDTO): Promise<Cards>;

  createAccountCard({
    account,
    card,
  }: {
    account: Accounts;
    card: Cards;
  }): Promise<AccountCard>;

  validateIfAlreadyExistCardPhysical(
    account: string
  ): Promise<AccountCard | null>;

  findCardsByAccount(account: string): Promise<AccountCard[]>;

  findCardsByPersonId({
    currentPage,
    itemsPerPage,
    personId,
  }: {
    personId: string;
    itemsPerPage: number;
    currentPage: number;
  }): Promise<AccountCard[]>;
}

export { ICardsRepository };
