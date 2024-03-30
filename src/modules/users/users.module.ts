import { IQueryBuilder, ITokenMaker } from './../../shared/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './domain/entities/user.entity';
import UsersRepositoryTypeORM from './adapter/users-repository-type-orm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IRepository } from '../../shared/interfaces';
import { CreateUserUseCase } from './application/create-user-use-case';
import { PasswordHasher } from '../../shared/password-hasher';
import { LoginUseCase } from './application/login-use-case';
import { UserORMQueryBuilder } from './typeorm/user-orm-query-builder';
import JsonWebTokenMaker from '../../token/json-web-token';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersRepositoryTypeORM,
    User,
    JsonWebTokenMaker,
    UserORMQueryBuilder,
    {
      provide: CreateUserUseCase,
      useFactory: (routeRepo: IRepository, user: User) => {
        return new CreateUserUseCase(routeRepo, user);
      },
      inject: [UsersRepositoryTypeORM, User],
    },
    {
      provide: LoginUseCase,
      useFactory: (
        routeRepo: IRepository,
        user: User,
        tokenMaker: ITokenMaker,
        queryBuilder: IQueryBuilder,
      ) => {
        return new LoginUseCase(routeRepo, user, tokenMaker, queryBuilder);
      },
      inject: [
        UsersRepositoryTypeORM,
        User,
        JsonWebTokenMaker,
        UserORMQueryBuilder,
      ],
    },
    {
      provide: 'PasswordHasher',
      useClass: PasswordHasher,
    },
  ],
})
export class UsersModule {}
