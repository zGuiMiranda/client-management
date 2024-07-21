import * as request from 'supertest';
import { app } from '../../../test/setupTests';

let userId = '';

beforeAll(async () => {
  userId = await createUserAndGetId();
});

export const createUserAndGetId = async () => {
  const response = await createUser();
  expect(response.body.data.id).not.toBeNull();
  return response.body.data.id;
};

const createUser = async () => {
  return request(app.getHttpServer())
    .post('/users/create')
    .send(buildUserValues())
    .expect(201)
    .expect(
      ({
        body: {
          data: { id },
        },
      }: {
        body: { data: { id: string } };
      }) => {
        userId = id;
        expect(id).not.toBeNull();
        return id;
      },
    );
};

export const login = async () => {
  const { login, password } = buildUserValues();
  return request(app.getHttpServer())
    .get('/users/login')
    .query({ login, password })
    .expect(200)
    .expect(({ body: { data } }: { body: { data: string } }) => {
      expect(data).not.toBeNull();
      return data;
    });
};

const buildUserValues = () => {
  return {
    login: process.env.MOCK_USERNAME,
    password: process.env.MOCK_PASSWORD,
  };
};

export const deleteUser = async (id?: string) => {
  request(app.getHttpServer())
    .delete('/users/delete')
    .query(userId ?? id)
    .expect(2400);
};

describe('Users', () => {
  it(`/POST should create user`, () => {
    login();
  });

  it(`/DELETE should delete a user`, () => {
    deleteUser();
  });
});
