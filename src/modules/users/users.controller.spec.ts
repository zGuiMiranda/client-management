import * as request from 'supertest';
import { app } from '../../../test/setupTests';

describe('Users', () => {
  it(`/POST should create user`, () => {
    return request(app.getHttpServer())
      .post('/users/create')
      .send({
        login: '351.229.940-72',
        password: '!someTest35@',
      })
      .expect(200);
    //   .expect(({ body }) => {
    //     const { data } = body;
    //     expect(data.name).toBe(client.name);
    //     expect(data.father_name).toBe(client.father_name);
    //     expect(data.mother_name).toBe(client.mother_name);
    //   });
  });
});
