import { Inject, Injectable } from '@nestjs/common';
import { IPasswordHasher } from '../../../../shared/interfaces';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Users')
@Injectable()
export default class User {
  constructor(
    @Inject('PasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  hashPassword = (password) => {
    return this.passwordHasher.hashPassword(password);
  };

  comparePasswords = (password, iv, dbPassword) => {
    return this.passwordHasher.comparePasswords(password, iv, dbPassword);
  };

  unhashPassword = (password) => {
    return this.passwordHasher.unhashPassword(password);
  };
}
