import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(
    req: {
      query: {
        hasPagination?: boolean;
        page?: number;
        size?: number;
        skip?: number;
      };
    },
    res: Response,
    next: NextFunction,
  ) {
    req.query.hasPagination = !!req.query.page;
    req.query.size = +req.query.size | 0;
    req.query.page = +req.query.page > 0 ? +req.query.page : 1;
    req.query.skip = (req.query.page - 1) * req.query.size;
    next();
  }
}
