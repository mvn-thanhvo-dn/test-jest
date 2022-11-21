import request from 'supertest';
import path from 'path';

import app from '../../src/app';

describe('Test app.ts', () => {
  const server = request(app)
  test('Catch-all route', async () => {
    const res = await server.get('/');
    expect(res.body).toEqual({ message: 'Allo! Catch-all route.' });
  });
  test('Upload file', async () => {
    const res = await server
      .post('/')
      .attach('file', path.resolve(__dirname, '..', '__mock__', '123-0.png'));
    expect(res.body).toEqual({ message: 'Update ok' })
  });
  test('Upload file fail', async () => {
    const res = await server
      .post('/')
      .attach('abc', '');
    expect(res.body).toEqual({ message: 'Not ok' })
  });
});
