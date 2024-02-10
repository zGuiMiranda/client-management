import { Inject, Injectable } from '@nestjs/common';
import Client from '../../domain/entities/client.entity';
import { Either, left, right } from '../../../../shared/either';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '../../../../shared/abstract-repository';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ClientFilter } from '../../../clients/domain/filter/client-filter';
import { IQueryBuilder, IRepository } from '../../../../shared/interfaces';

@Injectable()
export default class ClientRepositoryTypeORM
  extends AbstractRepository
  implements IRepository
{
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @Inject('QueryBuilder')
    private readonly ormQueryBuilder: IQueryBuilder,
  ) {
    super(clientRepository);
  }

  async create(client): Promise<Either<Error, EntityClassOrSchema>> {
    const result = await this.save(client);
    if (!result) return left(Error('Erro ao criar um cliente'));
    return right(result);
  }

  async getAll(
    clientFilter: ClientFilter,
  ): Promise<
    Either<Error, EntityClassOrSchema[] | [EntityClassOrSchema[], number]>
  > {
    const clients = await this.findAll(
      this.ormQueryBuilder.buildGetAllQuery(clientFilter),
      clientFilter.pagination,
    );
    if (!clients) return left(Error('Erro na busca'));
    return right(clients);
  }

  updateClient(): Client {
    throw new Error('Method not implemented.');
  }
  getClientById(): Client {
    throw new Error('Method not implemented.');
  }
}
