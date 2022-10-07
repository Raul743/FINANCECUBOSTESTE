import { IAccountRepository } from '~/modules/account/repositories/IAccountRepository';
import { AccountRepositoryImpl } from '~/modules/account/repositories/implementations/accountRepositoryImpl';
import { ICardsRepository } from '~/modules/cards/repositories/ICardsRepository';
import { CardsRepositoryImpl } from '~/modules/cards/repositories/implementations/cardsRepositoryImpl';
import { PeopleRepositoryImpl } from '~/modules/people/repositories/implementations/peopleRepositoryImpl';
import { IPeopleRepository } from '~/modules/people/repositories/IPeopleRepository';
import { TransactionsRepositoryRepositoryImpl } from '~/modules/transactions/repositories/implementations/transactionsRepositoryImpl';
import { ITransactionsRepository } from '~/modules/transactions/repositories/ITransactionsRepository';
import { container } from 'tsyringe';

import { IApiComplianceProvider } from './providers/ApiComplianceProvider/IApiCompliceProvider';
import { ApiComplianceProviderImpl } from './providers/ApiComplianceProvider/implementations/apiComplianceProviderIml';

container.registerSingleton<IPeopleRepository>(
  'PeopleRepositoryImpl',
  PeopleRepositoryImpl
);

container.registerSingleton<IApiComplianceProvider>(
  'ApiComplianceProviderImpl',
  ApiComplianceProviderImpl
);

container.registerSingleton<IAccountRepository>(
  'AccountRepositoryImpl',
  AccountRepositoryImpl
);

container.registerSingleton<ICardsRepository>(
  'CardsRepositoryImpl',
  CardsRepositoryImpl
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepositoryRepositoryImpl',
  TransactionsRepositoryRepositoryImpl
);
