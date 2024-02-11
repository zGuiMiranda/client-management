import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ClientModule } from '../src/modules/clients/client.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

export let app: INestApplication;

const initServer = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [ClientModule, AppModule],
  }).compile();

  app = moduleRef.createNestApplication<NestExpressApplication>();
  await app.init();
};

global.beforeAll(async () => {
  await initServer();
});

global.afterAll(async () => {
  await app.close();
});
