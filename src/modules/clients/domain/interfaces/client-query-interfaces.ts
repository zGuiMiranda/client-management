import { Pagination } from '../../../../shared/pagination';

export interface ClientQueryInterface {
  where: { name?: string };
}

export interface ClientGetAllQueryInterface {
  where: ClientQueryInterface;
  pagination: Pagination;
}
