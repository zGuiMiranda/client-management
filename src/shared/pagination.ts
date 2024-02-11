export class Pagination {
  page: number;
  size: number;
  skip: number;
  hasPagination: boolean;

  constructor(page = 1, size = 30, skip = 0, hasPagination = false) {
    this.page = page;
    this.size = size;
    this.skip = skip;
    this.hasPagination = hasPagination;
  }
}
