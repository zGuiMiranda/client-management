import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientModule } from './client.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const ENV = process.env.NODE_ENV;
describe('Clients', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
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
        ClientModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET find all clients without pagination`, () => {
    return request(app.getHttpServer()).get('/clients/findAll').expect(200);
  });

  it(`/POST create client`, () => {
    return request(app.getHttpServer())
      .post('/clients/create')
      .send({
        father_name: 'teste pai client',
        name: 'teste client 3',
        mother_name: 'teste mãe client',
        phone: '+55 (11) 980850298',
      })
      .expect(201)
      .expect(
        ({
          body: {
            body: { id },
          },
        }: {
          body: { body: { id: string } };
        }) => expect(id).not.toBeNull(),
      );
  });

  afterAll(async () => {
    await app.close();
  });
});
