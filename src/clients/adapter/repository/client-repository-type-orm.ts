import { Inject, Injectable } from '@nestjs/common';
import Client from '../../domain/entities/client.entity';
import { Either, left, right } from '../../../shared/either';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/shared/abstract-repository';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ClientFilter } from 'src/clients/domain/filter/client-filter';
import { IQuerySymbolBuilder, IRepository } from 'src/shared/interfaces';

@Injectable()
export default class ClientRepositoryTypeORM
  extends AbstractRepository
  implements IRepository
{
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @Inject('IQuerySymbolBuilder')
    private readonly querySymbolBuilder: IQuerySymbolBuilder,
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
      {
        where: { name: this.querySymbolBuilder.like(clientFilter.name) },
      },
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
