import { Either, left, right } from './either';
import { IPasswordHasher } from './interfaces';
import * as crypto from 'crypto';
const algorithm = 'aes-192-cbc';
const iv = crypto.randomBytes(16);

export class PasswordHasher implements IPasswordHasher {
  comparePasswords(
    password: string,
    databaseIv: string,
    dbPassword: string,
  ): Either<Error, boolean> {
    try {
      const cipher = crypto.createCipheriv(
        algorithm,
        process.env.SECRET_KEY,
        databaseIv,
      );
      const encrypted = Buffer.concat([
        cipher.update(password),
        cipher.final(),
      ]);

      return right(encrypted.toString('hex') === dbPassword);
    } catch (e) {
      return left(Error('Problema ao hashear senha. ' + e));
    }
  }
  async hashPassword(
    password: string,
  ): Promise<Either<Error, { password: string; salt: Buffer }>> {
    try {
      const cipher = crypto.createCipheriv(
        algorithm,
        process.env.SECRET_KEY,
        iv,
      );

      const encrypted = Buffer.concat([
        cipher.update(password),
        cipher.final(),
      ]);

      return right({ password: encrypted.toString('hex'), salt: iv });
    } catch (e) {
      return left(Error('Problema ao hashear senha. ' + e));
    }
  }
  async unhashPassword(
    cryptedPassword: string,
  ): Promise<Either<Error, string>> {
    try {
      const decipher = crypto.createDecipheriv(
        algorithm,
        process.env.SECRET_KEY,
        Buffer.from(iv.toString('hex'), 'hex'),
      );

      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(cryptedPassword, 'hex')),
        decipher.final(),
      ]);
      return right(decrypted.toString());
    } catch (e) {
      return left(Error('Problema ao unhashear senha. ' + e));
    }
  }
}
