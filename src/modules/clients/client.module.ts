import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { FindAllClientsUseCase } from './application/find-all-clients-use-case';
import ClientRepositoryTypeORM from './adapter/repository/client-repository-type-orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import Client from './domain/entities/client.entity';
import { CreateClientUseCase } from './application/create-client-use-case';
import { IRepository } from '../../shared/interfaces';
import { EditClientUseCase } from './application/edit-client-use-case';
import { FindClientByIdUseCase } from './application/find-client-by-id';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientRepositoryTypeORM,
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
    {
      provide: EditClientUseCase,
      useFactory: (routeRepo: IRepository) => {
        return new EditClientUseCase(routeRepo);
      },
      inject: [ClientRepositoryTypeORM],
    },
    {
      provide: FindClientByIdUseCase,
      useFactory: (routeRepo: IRepository) => {
        return new FindClientByIdUseCase(routeRepo);
      },
      inject: [ClientRepositoryTypeORM],
    },
  ],
})
export class ClientModule {}
