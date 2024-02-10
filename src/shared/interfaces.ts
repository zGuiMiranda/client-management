import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
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

export interface IQueryBuilder {
  buildGetAllQuery(filters?: any);
}

export interface IRepository {
  getAll(
    filters?: any,
  ): Promise<
    Either<Error, EntityClassOrSchema[] | [EntityClassOrSchema[], number]>
  >;
  create(data): Promise<Either<Error, EntityClassOrSchema>>;
}
