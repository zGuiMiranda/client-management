import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Either } from './either';
import { DeleteResult } from 'typeorm';

export interface HttpResponse {
  statusCode: number;
  data: any;
}

export interface HttpRequest {
  body?: any;
}

export interface IQuerySymbolBuilder {
  like(value);
  equals(value);
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
  edit(data): Promise<Either<Error, EntityClassOrSchema>>;
  findById(id: string): Promise<Either<Error, EntityClassOrSchema>>;
  delete(ids: string[]): Promise<Either<Error, DeleteResult>>;
}

export interface IRandomValuesGenerator {
  generateFullMaleName(): string;
  generateFullFemaleName(): string;
}

export interface PaginationInfo {
  hasNextPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number;
  totalItemsCount: number;
  totalItensReturnedForActualPageCount: number;
  totalPages: number;
}

export interface IPasswordHasher {
  hashPassword(
    paswword: string,
  ): Promise<Either<Error, { password: string; salt: Buffer }>>;
  unhashPassword(paswword: string): Promise<Either<Error, string>>;
  comparePasswords(
    paswword: string,
    iv: string,
    dbPassword: string,
  ): Either<Error, boolean>;
}

export interface ITokenMaker {
  createToken(data): Either<Error, string>;
  verifyToken(token): Either<Error, boolean>;
}
