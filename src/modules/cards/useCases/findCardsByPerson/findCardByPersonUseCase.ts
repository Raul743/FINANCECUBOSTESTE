import { LoggedInService, maskForCardNumber } from '~/utils/functis';
import { inject, injectable } from 'tsyringe';

import { CardsRepositoryImpl } from '../../repositories/implementations/cardsRepositoryImpl';

@injectable()
class FindCardsByPersonUseCase {
  constructor(
    @inject('CardsRepositoryImpl')
    private repository: CardsRepositoryImpl
  ) {}
  async execute(data: { itemsPerPage?: number; currentPage?: number }) {
    const { itemsPerPage = 10, currentPage = 1 } = data;
    const { people: person } = LoggedInService;
    const cards = await this.repository.findCardsByPersonId({
      personId: person.id,
      itemsPerPage,
      currentPage,
    });
    console.log(cards);
    return {
      cards: cards.map((card) => ({
        ...card?.card,
        number: maskForCardNumber(card?.card.number),
      })),
      pagination: {
        itemsPerPage,
        currentPage,
      },
    };
  }
}

export { FindCardsByPersonUseCase };
