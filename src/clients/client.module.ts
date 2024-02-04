import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { FindAllClientsUseCase } from './application/find-all-clients-use-case';
import ClientRepositoryTypeORM from './adapter/repository/client-repository-type-orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import Client from './domain/entities/client.entity';
import { CreateClientUseCase } from './application/create-client-use-case';
import { IRepository } from 'src/shared/interfaces';
import { ORMQuerySymbolBuilder } from 'src/shared/typeorm/orm-query-builder';

@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientRepositoryTypeORM])],
  controllers: [ClientsController],
  providers: [
    ORMQuerySymbolBuilder,
    ClientRepositoryTypeORM,
    {
      provide: 'IQuerySymbolBuilder',
      useClass: ORMQuerySymbolBuilder,
    },
    {
      provide: FindAllClientsUseCase,
      useFactory: (routeRepo: IRepository) => {
        return new FindAllClientsUseCase(routeRepo);
      },
      inject: [ClientRepositoryTypeORM],
    },
    {
      provide: CreateClientUseCase,
      useFactory: (routeRepo: IRepository) => {
        return new CreateClientUseCase(routeRepo);
      },
      inject: [ClientRepositoryTypeORM],
    },
  ],
})
export class ClientModule {}
