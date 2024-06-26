import { Either } from '../../../shared/either';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ClientFilter } from '../domain/interfaces/client-filter';
import { IRepository } from '../../../shared/interfaces';

export class FindAllClientsUseCase {
  constructor(readonly clientRepository: IRepository) {}

  async execute(
    filterParams: ClientFilter,
  ): Promise<
    Either<Error, EntityClassOrSchema[] | [EntityClassOrSchema[], number]>
  > {
    return this.clientRepository.getAll(filterParams);
  }
}
