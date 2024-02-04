import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ClientFilter } from 'src/clients/domain/filter/client-filter';
import { Either } from './either';

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest {
  body?: any;
}

export interface IQuerySymbolBuilder {
  like(value);
}

export interface IRepository {
  getAll(
    filters?: ClientFilter,
  ): Promise<
    Either<Error, EntityClassOrSchema[] | [EntityClassOrSchema[], number]>
  >;
  create(data): Promise<Either<Error, EntityClassOrSchema>>;
}
