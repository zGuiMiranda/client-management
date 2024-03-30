import { Inject } from '@nestjs/common';
import { IQueryBuilder, IQuerySymbolBuilder } from '../../../shared/interfaces';
import { UserFilter } from '../interfaces/user-filter';
import { UserQueryInterface } from '../interfaces/user-query-interface';

export class UserORMQueryBuilder implements IQueryBuilder {
  constructor(
    @Inject('QuerySymbolBuilder')
    private readonly ormQuerySymbolBuilder: IQuerySymbolBuilder,
  ) {}
  buildGetAllQuery(userFilter?: UserFilter): UserQueryInterface {
    return {
      where: {
        ...(userFilter.login
          ? { login: this.ormQuerySymbolBuilder.equals(userFilter.login) }
          : {}),
        ...(userFilter.password
          ? {
              password: this.ormQuerySymbolBuilder.equals(userFilter.password),
            }
          : {}),
      },
    };
  }
}
