import * as request from 'supertest';
import { app } from '../../../test/setupTests';
import { faker } from '@faker-js/faker';
import { PaginationInfo } from 'src/shared/interfaces';

let clientId: string;

beforeEach(async () => {
  return request(app.getHttpServer())
    .post('/clients/create')
    .send(buildClientValues())
    .expect(201)
    .expect(
      ({
        body: {
          data: { id },
        },
      }: {
        body: { data: { id: string } };
      }) => {
        clientId = id;
        return expect(id).not.toBeNull();
      },
    );
});

afterEach(() => {
  return request(app.getHttpServer())
    .delete('/clients/delete')
    .query({ ids: [clientId] })
    .expect(200);
});

const buildClientValues = () => {
  return {
    father_name: faker.person.firstName('male') + faker.person.lastName('male'),
    name: faker.person.firstName('male') + faker.person.lastName('male'),
    mother_name:
      faker.person.firstName('female') + faker.person.lastName('female'),
    phone: faker.helpers.fromRegExp('+55 (11) ##### ####'),
  };
};

describe('Clients', () => {
  it(`/GET find all clients without pagination`, () => {
    return request(app.getHttpServer())
      .get('/clients/findAll')
      .expect(200)
      .expect(({ body: { data } }: { body: { data: { id: string }[] } }) => {
        expect(data).toHaveLength(1);
        expect(data?.[0].id).not.toBeNull();
      });
  });
  it(`/GET find all clients with pagination`, () => {
    return request(app.getHttpServer())
      .get('/clients/findAll')
      .query({ page: 1, size: 1 })
      .expect(200)
      .expect(
        ({ body }: { body: { data: []; paginationInfo: PaginationInfo } }) => {
          const { data, paginationInfo } = body;
          expect(paginationInfo).not.toBeNull();
          expect(paginationInfo.nextPage).toBeNull();
          expect(paginationInfo.previousPage).toBeNull();
          expect(paginationInfo.currentPage).toBe(1);
          expect(data).toHaveLength(1);
        },
      );
  });
  it(`/GET find one client by id`, () => {
    return request(app.getHttpServer())
      .get('/clients/findById')
      .query({ clientId })
      .expect(200)
      .expect(({ body }: { body: { data: { id: string } } }) => {
        const { data } = body;
        expect(data).not.toBeNull();
        expect(data.id).not.toBeNull();
      });
  });
  it(`/PUT edit client`, () => {
    const client = buildClientValues();
    return request(app.getHttpServer())
      .put('/clients/edit')
      .send({
        id: clientId,
        ...client,
      })
      .expect(200)
      .expect(({ body }) => {
        const { data } = body;
        expect(data.name).toBe(client.name);
        expect(data.father_name).toBe(client.father_name);
        expect(data.mother_name).toBe(client.mother_name);
      });
  });
});
