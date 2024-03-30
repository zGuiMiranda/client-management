import { Pagination } from '../../../../shared/pagination';

export class ClientFilter {
  name: string | null;
  father_name: string | null;
  mother_name: string | null;
  phone: string | null;
  pagination: Pagination;
  constructor(
    name: string,
    father_name: string,
    mother_name: string,
    phone: string,
    pagination: Pagination,
  ) {
    this.name = name;
    this.father_name = father_name;
    this.mother_name = mother_name;
    this.phone = phone;
    this.pagination = pagination;
  }
}
