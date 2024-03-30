import { Inject } from '@nestjs/common';
import { ClientQueryInterface } from 'src/modules/clients/domain/interfaces/client-query-interfaces';
import { ClientFilter } from '../domain/interfaces/client-filter';
import { IQueryBuilder, IQuerySymbolBuilder } from '../../../shared/interfaces';

export class ClientORMQueryBuilder implements IQueryBuilder {
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
