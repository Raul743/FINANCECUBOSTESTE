import { AppDataSource } from '~/configs/db/postgres';
import { AccountCard } from '~/models/AccountCard';
import { Accounts } from '~/models/Accounts';
import { Cards } from '~/models/Cards';
import { Repository } from 'typeorm';

import { ICardsRepository } from '../ICardsRepository';

class CardsRepositoryImpl implements ICardsRepository {
  private repository: Repository<Cards>;
  private repositoryAccountCard: Repository<AccountCard>;
  constructor() {
    this.repository = AppDataSource.getRepository(Cards);
    this.repositoryAccountCard = AppDataSource.getRepository(AccountCard);
  }
  findCardsByPersonId({
    currentPage,
    itemsPerPage,
    personId,
  }: {
    personId: string;
    itemsPerPage: number;
    currentPage: number;
  }): Promise<AccountCard[]> {
    return this.repositoryAccountCard
      .createQueryBuilder('accountCard')
      .innerJoinAndSelect('accountCard.account', 'account')
      .innerJoinAndSelect('account.people', 'people')
      .innerJoinAndSelect('accountCard.card', 'cards')
      .where('people.id = :people_id', { people_id: personId })
      .skip(currentPage - 1)
      .take(itemsPerPage)
      .orderBy('cards.createdAt', 'DESC')
      .getMany();
  }
  findCardsByAccount(account: string): Promise<AccountCard[]> {
    return this.repositoryAccountCard
      .createQueryBuilder('accountCard')
      .innerJoin('accountCard.account', 'account')
      .innerJoinAndSelect('accountCard.card', 'card')
      .where('account.id = :account_id', { account_id: account })
      .getMany();
  }
  validateIfAlreadyExistCardPhysical(
    account: string
  ): Promise<AccountCard | null> {
    return this.repositoryAccountCard
      .createQueryBuilder('accountCard')
      .innerJoin('accountCard.account', 'account')
      .innerJoin('accountCard.card', 'card')
      .where('account.id = :account_id', { account_id: account })
      .andWhere('card.type = :card_type', { card_type: 'physical' })
      .getOne();
  }
  createAccountCard({
    account,
    card,
  }: {
    account: Accounts;
    card: Cards;
  }): Promise<AccountCard> {
    const newAccountCard = new AccountCard();
    newAccountCard.card = card;
    newAccountCard.account = account;

    return this.repositoryAccountCard.save(newAccountCard);
  }
  create({ cvv, number, type }: ICardDTO): Promise<Cards> {
    const newCard = new Cards();
    newCard.cvv = cvv;
    newCard.number = number;
    newCard.type = type;

    return this.repository.save(newCard);
  }
}

export { CardsRepositoryImpl };
