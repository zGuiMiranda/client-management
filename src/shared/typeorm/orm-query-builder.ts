import { Like } from 'typeorm';
import { IQuerySymbolBuilder } from '../interfaces';

export class ORMQuerySymbolBuilder implements IQuerySymbolBuilder {
  like(value) {
    return Like(`%${value}%`);
  }
}
