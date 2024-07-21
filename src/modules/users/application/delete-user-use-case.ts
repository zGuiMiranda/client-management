import { Either, left } from '../../../shared/either';
import { IRepository } from '../../../shared/interfaces';
import User from '../domain/entities/user.entity';
import { DeleteResult } from 'typeorm';

export class DeleteUserUseCase {
  constructor(
    readonly userRepository: IRepository,
    readonly userDomain: User,
  ) {}

  async execute(user: User): Promise<Either<Error, DeleteResult>> {
    if (!user.id) return left(Error('Usuário não providenciado'));
    return this.userRepository.delete([user.id]);
  }
}
