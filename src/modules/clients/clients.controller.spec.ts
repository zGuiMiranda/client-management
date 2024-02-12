import * as request from 'supertest';
import { app } from '../../../test/setupTests';
import { faker } from '@faker-js/faker';

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
    return request(app.getHttpServer()).get('/clients/findAll').expect(200);
  });
  it(`/GET find all clients with pagination`, () => {
    return request(app.getHttpServer())
      .get('/clients/findAll')
      .query({ page: 1, size: 1 })
      .expect(200);
  });
  it(`/GET find one client by id`, () => {
    return request(app.getHttpServer())
      .get('/clients/findById')
      .query({ clientId })
      .expect(200);
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
