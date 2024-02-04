import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: `${__dirname}/../../.env.${process.env.NODE_ENV}` });

export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
