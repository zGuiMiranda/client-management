import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PaginationInfo } from '../interfaces';

@Injectable()
export class PagerInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const query = request.query;
    const { page, size, hasPagination } = query;

    if (!hasPagination) return next.handle()?.pipe(map((flow: any) => flow));

    return next.handle()?.pipe(
      map((flow: any) => {
        const response: {
          data: any;
          paginationInfo: PaginationInfo;
        } = {
          data: [],
          paginationInfo: {
            hasNextPage: false,
            currentPage: 0,
            previousPage: null,
            nextPage: null,
            totalItemsCount: 0,
            totalItensReturnedForActualPageCount: 0,
            totalPages: 0,
          },
        };

        response.paginationInfo.totalItemsCount = flow?.data?.[1];
        response.data = flow?.data?.[0];
        response.paginationInfo.currentPage = page;
        response.paginationInfo.nextPage =
          response.paginationInfo.totalItemsCount > page * size
            ? page + 1
            : null;

        response.paginationInfo.previousPage = page > 1 ? page - 1 : null;
        response.paginationInfo.totalItensReturnedForActualPageCount =
          response.data?.length;

        response.paginationInfo.totalPages = Math.ceil(
          response.paginationInfo.totalItemsCount / size,
        );
        return response;
      }),
    );
  }
}
