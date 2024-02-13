import { Either } from '../../../shared/either';
import { IRepository } from '../../../shared/interfaces';
import { DeleteResult } from 'typeorm';

export class DeleteClientUseCase {
  constructor(readonly clientRepository: IRepository) {}

  async execute(ids: string[]): Promise<Either<Error, DeleteResult>> {
    return this.clientRepository.delete(ids);
  }
}
