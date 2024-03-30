import { Pagination } from '../../../shared/pagination';

export class UserFilter {
  login: string | null;
  password: string | null;
  pagination: Pagination;
  constructor(login: string, password: string, pagination: Pagination) {
    this.login = login;
    this.password = password;
    this.pagination = pagination;
  }
}
