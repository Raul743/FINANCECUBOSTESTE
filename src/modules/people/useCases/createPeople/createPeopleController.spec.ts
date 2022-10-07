import app from '~/app';
import request from 'supertest';

describe('create Person Controller', async () => {
  it('should create a new person', async () => {
    await request(app)
      .post('/people')
      .send({
        document: '71836460171',
        password: '12345',
        name: 'Raul Inacio',
      })
      .expect(201);
  });
});
