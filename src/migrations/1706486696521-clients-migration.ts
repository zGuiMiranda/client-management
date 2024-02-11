import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientsMigration1706486696521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Clients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'father_name',
            type: 'varchar',
          },
          {
            name: 'mother_name',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Clients');
  }
}
