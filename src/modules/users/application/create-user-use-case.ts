import { Either, left } from '../../../shared/either';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { IRepository } from '../../../shared/interfaces';
import User from '../domain/entities/user.entity';

export class CreateUserUseCase {
  constructor(
    readonly userRepository: IRepository,
    readonly userDomain: User,
  ) {}

  async execute(user: User): Promise<Either<Error, EntityClassOrSchema>> {
    const response = await this.userDomain.hashPassword(user.password);
    if (response.isLeft()) return left(Error(response.value.message));
    return this.userRepository.create({
      login: user.login,
      password: response.value.password,
      salt: response.value.salt.toString('hex'),
    });
  }
}
