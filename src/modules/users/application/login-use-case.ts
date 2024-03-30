import { Either, left } from '../../../shared/either';
import {
  IQueryBuilder,
  IRepository,
  ITokenMaker,
} from '../../../shared/interfaces';
import User from '../domain/entities/user.entity';

export class LoginUseCase {
  constructor(
    readonly userRepository: IRepository,
    readonly userDomain: User,
    readonly tokenMaker: ITokenMaker,
    readonly ormQueryBuilder: IQueryBuilder,
  ) {}

  async execute(user: User): Promise<Either<Error, string>> {
    const response = await this.userDomain.hashPassword(user.password);
    if (response.isLeft()) return left(Error(response.value.message));
    const userResponse = await this.userRepository.getAll(
      this.ormQueryBuilder.buildGetAllQuery({
        login: user.login,
      }),
    );
    if (!userResponse?.value?.[0])
      return left(Error('Usuário ou senha inválidos'));
    const isPasswordsEqual = this.userDomain.comparePasswords(
      user.password,
      Buffer.from(userResponse?.value?.[0].salt, 'hex'),
      userResponse?.value?.[0].password,
    );
    if (!isPasswordsEqual) return left(Error('Usuário ou senha inválidos'));

    return this.tokenMaker.createToken(userResponse?.value?.[0]);
  }
}
