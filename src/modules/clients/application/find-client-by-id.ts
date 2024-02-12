import { Either } from '../../../shared/either';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { IRepository } from '../../../shared/interfaces';

export class FindClientByIdUseCase {
  constructor(readonly clientRepository: IRepository) {}

  async execute(id: string): Promise<Either<Error, EntityClassOrSchema>> {
    return this.clientRepository.findById(id);
  }
}
