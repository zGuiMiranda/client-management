import { Injectable } from '@nestjs/common';
import { Either, left, right } from '../shared/either';
import { ITokenMaker } from '../shared/interfaces';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export default class JsonWebToken implements ITokenMaker {
  verifyToken(token: string): Either<Error, boolean> {
    try {
      verify(token, process.env.SECRET_KEY);
      return right(true);
    } catch (error) {
      return left(Error(error + '.Token inválido'));
    }
  }
  createToken(data: {
    login: string;
    password: string;
  }): Either<Error, string> {
    try {
      return right(
        sign(
          { login: data.login, password: data.password },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
          },
        ),
      );
    } catch (e) {
      return left(Error('Erro ao criar token. ' + e));
    }
  }
}
