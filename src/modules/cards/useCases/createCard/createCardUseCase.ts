import { AppError } from '~/errors/AppError';
import { AccountRepositoryImpl } from '~/modules/account/repositories/implementations/accountRepositoryImpl';
import { inject, injectable } from 'tsyringe';

import { messages } from '../../Messages/card';
import { CardsRepositoryImpl } from '../../repositories/implementations/cardsRepositoryImpl';

@injectable()
class CreateCardUseCase {
  constructor(
    @inject('CardsRepositoryImpl')
    private repository: CardsRepositoryImpl,
    @inject('AccountRepositoryImpl')
    private repositoryAccount: AccountRepositoryImpl
  ) {}
  async execute({ cvv, number, type, account }: ICardDTO) {
    if (cvv.trim().length !== 3) {
      throw new AppError(messages.FaildToSendCVV);
    }
    if (number.trim().split(' ').join('').length !== 16) {
      throw new AppError(messages.FaildToSendNumberCard);
    }
    if (!account) {
      throw new AppError(messages.FaildToSendAccount);
    }

    if (type === 'physical') {
      const existCardPhisical =
        await this.repository.validateIfAlreadyExistCardPhysical(account);
      if (existCardPhisical) {
        throw new AppError(messages.PersonAlreadyExistsCardPhisical);
      }
    }

    const newCard = await this.repository.create({ cvv, type, number });

    const accounts = await this.repositoryAccount.findAccountByNumberAccount({
      account,
    });

    if (!accounts) {
      console.log(accounts, account);
      throw new AppError(messages.FaildToSendAccount);
    }
    await this.repository.createAccountCard({
      account: accounts,
      card: newCard,
    });
    return newCard;
  }
}

export { CreateCardUseCase };
