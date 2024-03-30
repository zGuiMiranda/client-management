import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ITokenMaker } from '../interfaces';
import { expiredToken } from '../../helpers/http-helper';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(
    @Inject('TokenMaker')
    private readonly tokenMaker: ITokenMaker,
  ) {}
  use(req: { headers: { authorization } }, res: Response, next: NextFunction) {
    const { headers } = req;
    const response = this.tokenMaker.verifyToken(headers.authorization);
    if (!response.isRight())
      return res.send(expiredToken(Error(response?.value?.toString())));
    next();
  }
}
