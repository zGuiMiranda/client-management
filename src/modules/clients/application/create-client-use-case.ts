import { Either } from '../../../shared/either';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import Client from '../domain/entities/client.entity';
import { IRepository } from '../../../shared/interfaces';

export class CreateClientUseCase {
  constructor(readonly clientRepository: IRepository) {}

  async execute(client: Client): Promise<Either<Error, EntityClassOrSchema>> {
    return this.clientRepository.create(client);
  }
}
