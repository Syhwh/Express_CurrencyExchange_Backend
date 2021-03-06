const request = require('supertest');
const User = require('../database/models/userSchema');
const app = require('../server/server');
const { setupDB } = require('./test.setup');

setupDB('testApiDatabase');

describe(' API Endpoints', () => {
  test('create a new user', async (done) => {
    const res = await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const user = await User.findOne({ userEmail: 'user@test.com' });
    expect(user.userEmail).toBeTruthy();
    expect(user.userPassword).toBeTruthy();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User Created');
    expect(res.body).toHaveProperty('token', expect.any(String));
    done();
  });

  test('validate the user is unique', async (done) => {
    await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const res = await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    expect(res.statusCode).toEqual(403);
    done();
  });

  test('login an user', async (done) => {
    await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const res = await request(app)
      .post('/login')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User logged');
    expect(res.body).toHaveProperty('token', expect.any(String));
    done();
  });

  test('validate  the user password', async (done) => {
    await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const res = await request(app)
      .post('/login')
      .send({
        userEmail: 'user@test.com',
        userPassword: '12345'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid user or password');
    done();
  });

  test('user logout', async (done) => {
    await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const user = await request(app)
      .post('/login')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const res = await request(app)
      .post('/logout')
      .set('authorization', `Bearer ${user.body.token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User logged out');
    done();
  });
});
