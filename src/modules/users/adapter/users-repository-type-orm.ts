import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Either, left, right } from '../../../shared/either';
import { IRepository } from '../../../shared/interfaces';
import { Repository, DeleteResult } from 'typeorm';
import User from '../domain/entities/user.entity';
import { AbstractRepository } from '../../../shared/abstract-repository';

@Injectable()
export default class UsersRepositoryTypeORM
  extends AbstractRepository
  implements IRepository
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async getAll(
    filters?: any,
  ): Promise<
    Either<Error, EntityClassOrSchema[] | [EntityClassOrSchema[], number]>
  > {
    const users = await this.findAll(filters);
    if (!users) return left(Error('Erro ao buscar usuários'));
    return right(users);
  }
  async create(data: any): Promise<Either<Error, EntityClassOrSchema>> {
    const result = await this.save(data);
    if (!result) return left(Error('Erro ao criar um usuário'));
    return right(result);
  }
  edit(data: any): Promise<Either<Error, EntityClassOrSchema>> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Either<Error, EntityClassOrSchema>> {
    throw new Error('Method not implemented.');
  }
  delete(ids: string[]): Promise<Either<Error, DeleteResult>> {
    throw new Error('Method not implemented.');
  }
}
