import { ClientFilter } from '../../modules/clients/domain/filter/client-filter';
import { ClientQueryInterface } from '../../modules/clients/domain/queryInterfaces/clientQueryInterfaces';
import { IQueryBuilder, IQuerySymbolBuilder } from '../interfaces';
import { Inject } from '@nestjs/common';

export class ORMQueryBuilder implements IQueryBuilder {
  constructor(
    @Inject('QuerySymbolBuilder')
    private readonly ormQuerySymbolBuilder: IQuerySymbolBuilder,
  ) {}
  buildGetAllQuery(clientFilter?: ClientFilter): ClientQueryInterface {
    return {
      where: {
        ...(clientFilter.name
          ? { name: this.ormQuerySymbolBuilder.like(clientFilter.name) }
          : {}),
        ...(clientFilter.father_name
          ? {
              father_name: this.ormQuerySymbolBuilder.like(
                clientFilter.father_name,
              ),
            }
          : {}),
        ...(clientFilter.mother_name
          ? {
              mother_name: this.ormQuerySymbolBuilder.like(
                clientFilter.mother_name,
              ),
            }
          : {}),
        ...(clientFilter.phone
          ? {
              phone: this.ormQuerySymbolBuilder.like(clientFilter.phone),
            }
          : {}),
      },
    };
  }
}
