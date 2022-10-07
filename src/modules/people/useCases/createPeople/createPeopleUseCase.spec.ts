import { ApiComplianceProviderImpl } from '../../../../shared/container/providers/ApiComplianceProvider/implementations/apiComplianceProviderIml';
import { PeopleRepositoryImpl } from '../../repositories/implementations/peopleRepositoryImpl';
import { CreatePeopleUseCase } from './createPeopleUseCase';

import '~/configs/environments';
import { AppDataSource } from '../../../../configs/db/postgres/index';

let createPersonUsecase: CreatePeopleUseCase;
let createPeopleRepositoryIml: PeopleRepositoryImpl;
let apiComplianceProviderImpl: ApiComplianceProviderImpl;
describe('create people', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  beforeEach(async () => {
    apiComplianceProviderImpl = new ApiComplianceProviderImpl();
    createPeopleRepositoryIml = new PeopleRepositoryImpl();
    createPersonUsecase = new CreatePeopleUseCase(
      createPeopleRepositoryIml,
      apiComplianceProviderImpl
    );
  });
  it('should be able to create a new person', async () => {
    const person = await createPersonUsecase.execute({
      document: '51858121337',
      password: '12345',
      name: 'John Smith',
    });
    expect(person).toHaveProperty('id');
  });
});
