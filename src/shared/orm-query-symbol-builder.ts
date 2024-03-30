import { Equal, Like } from 'typeorm';
import { IQuerySymbolBuilder } from './interfaces';

export class ORMQuerySymbolBuilder implements IQuerySymbolBuilder {
  equals(value: any) {
    return Equal(value);
  }
  like(value) {
    return Like(`%${value}%`);
  }
}
