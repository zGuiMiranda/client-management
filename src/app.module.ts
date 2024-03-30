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
import { ORMQuerySymbolBuilder } from './shared/orm-query-symbol-builder';
import { UsersModule } from './modules/users/users.module';
import { AccessTokenMiddleware } from './shared/middleware/access-token.middleware';
import JsonWebTokenMaker from './token/json-web-token';

const ENV = process.env.NODE_ENV;
@Global()
@Module({
  imports: [
    ClientModule,
    UsersModule,
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
      provide: 'TokenMaker',
      useClass: JsonWebTokenMaker,
    },
  ],
  exports: ['QuerySymbolBuilder'],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PagerMiddleware)
      .forRoutes({ path: '/clients/*', method: RequestMethod.GET });

    consumer
      .apply(AccessTokenMiddleware)
      .exclude('/users/login')
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
