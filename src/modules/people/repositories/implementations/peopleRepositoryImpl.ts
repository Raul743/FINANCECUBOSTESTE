import { AppDataSource } from '~/configs/db/postgres';
import { People } from '~/models/People';
import { Repository } from 'typeorm';

import { IPeopleRepository } from '../IPeopleRepository';

class PeopleRepositoryImpl implements IPeopleRepository {
  private repository: Repository<People>;
  constructor() {
    this.repository = AppDataSource.getRepository(People);
  }
  findPeopleById({ id }: { id: string }): Promise<People | null> {
    return this.repository.findOneBy({ id });
  }
  findPeopleByDocument({
    document,
  }: {
    document: string;
  }): Promise<People | null> {
    return this.repository.findOneBy({ document });
  }
  create({ document, name, password }: IPeopleDto): Promise<People | null> {
    const newPeople = new People();
    newPeople.name = name;
    newPeople.password = password;
    newPeople.document = document;
    return this.repository.save(newPeople);
  }
}

export { PeopleRepositoryImpl };
