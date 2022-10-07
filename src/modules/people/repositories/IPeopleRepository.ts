import { People } from '~/models/People';

interface IPeopleRepository {
  create(data: IPeopleDto): Promise<People | null>;
  findPeopleByDocument({
    document,
  }: {
    document: string;
  }): Promise<People | null>;
  findPeopleById({ id }: { id: string }): Promise<People | null>;
}

export { IPeopleRepository };
