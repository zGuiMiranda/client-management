import { Injectable } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Repository } from 'typeorm';

@Injectable()
export class AbstractRepository {
  private repository: Repository<EntityClassOrSchema>;

  constructor(repository: any) {
    this.repository = repository;
  }
  async findAll(
    filters?,
    options?: { hasPagination: boolean; skip: number; size: number },
  ) {
    return options?.hasPagination
      ? this.repository.findAndCount({
          ...filters,
          take: options.size,
          skip: options.skip,
        })
      : this.repository.find(filters);
  }

  async findOneById(id) {
    console.log(id, 'nvvnhv');
    return this.repository.findOneBy(id);
  }

  async save(data: EntityClassOrSchema) {
    return this.repository.save(data);
  }

  async update(id: string, data: EntityClassOrSchema) {
    await this.repository.update(id, data);
    return this.findOneById({ id });
  }
}
