import { Either } from 'src/shared/either';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ClientFilter } from '../domain/filter/client-filter';
import { IRepository } from 'src/shared/interfaces';

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
