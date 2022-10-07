import { AppError } from '~/errors/AppError';
import { ApiComplianceProviderImpl } from '~/shared/container/providers/ApiComplianceProvider/implementations/apiComplianceProviderIml';
import { removeMaskForCpfOrCnpj } from '~/utils/functis';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { messages } from '../../Messages/people';
import { PeopleRepositoryImpl } from '../../repositories/implementations/peopleRepositoryImpl';

@injectable()
class CreatePeopleUseCase {
  constructor(
    @inject('PeopleRepositoryImpl')
    private repository: PeopleRepositoryImpl,
    @inject('ApiComplianceProviderImpl')
    private repositoryApiCompliance: ApiComplianceProviderImpl
  ) {}
  async execute({ document, name, password }: IPeopleDto) {
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    const documentFormated = removeMaskForCpfOrCnpj(document);
    const peopleExists = await this.repository.findPeopleByDocument({
      document: documentFormated,
    });

    if (regexCpf.test(document)) {
      await this.repositoryApiCompliance.findDocumentByCpf({
        document: documentFormated,
      });
    }
    if (regexCnpj.test(document)) {
      await this.repositoryApiCompliance.findDocumentByCnpj({
        document: documentFormated,
      });
    }

    if (peopleExists) {
      throw new AppError(messages.PeopleAlreadyExist);
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const newPeople = await this.repository.create({
      document: documentFormated,
      name,
      password: hash,
    });

    return newPeople;
  }
}

export { CreatePeopleUseCase };
