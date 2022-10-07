import { inject, injectable } from 'tsyringe';

import { CardsRepositoryImpl } from '../../repositories/implementations/cardsRepositoryImpl';

@injectable()
class FindCardsByAccountUseCase {
  constructor(
    @inject('CardsRepositoryImpl')
    private repository: CardsRepositoryImpl
  ) {}
  async execute({ accountId }: { accountId: string }) {
    const cards = await this.repository.findCardsByAccount(accountId);
    return cards;
  }
}

export { FindCardsByAccountUseCase };
