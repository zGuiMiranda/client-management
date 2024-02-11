import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ClientModule } from './modules/clients/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PagerMiddleware } from './shared/middleware/pager.middleware';
import { ORMQuerySymbolBuilder } from './shared/typeorm/orm-query-symbol-builder';
import { ORMQueryBuilder } from './shared/typeorm/orm-query-builder';

const ENV = process.env.NODE_ENV;
@Global()
@Module({
  imports: [
    ClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        migrations: ['dist/migrations/*.js'],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'QuerySymbolBuilder',
      useClass: ORMQuerySymbolBuilder,
    },
    {
      provide: 'QueryBuilder',
      useClass: ORMQueryBuilder,
    },
  ],
  exports: ['QueryBuilder', 'QuerySymbolBuilder'],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PagerMiddleware)
      .forRoutes({ path: '/clients/*', method: RequestMethod.GET });
  }
}
