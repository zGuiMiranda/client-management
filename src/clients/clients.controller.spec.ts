import { FindAllClientsUseCase } from './application/find-all-clients-use-case';
import { ClientsController } from './clients.controller';
import { Test } from '@nestjs/testing';
//import ClientRepositoryInMemory from './adapter/repository/clientRepositoryInMemory';

describe('ClientController', () => {
  let clientsController: ClientsController;

  afterEach((done) => {
    done();
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ClientsController],
      providers: [
        ClientRepositoryDrizzle,
        {
          provide: FindAllClientsUseCase,
          useFactory: (routeRepo: IClientRepository) => {
            return new FindAllClientsUseCase(routeRepo);
          },
          inject: [ClientRepositoryDrizzle],
        },
      ],
    }).compile();

    clientsController = moduleRef.get<ClientsController>(ClientsController);
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const clients = await clientsController.findAll();

      expect(clients.statusCode).toBe(200);

      // expect(clients)
      //   .toBe()
      //   .expect(await catsController.findAll())
      //   .toBe(result);
    });
  });
});
