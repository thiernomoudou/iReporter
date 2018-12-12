
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import application from '../../server/index';
import db from '../../server/database/index';

// Use chai-http to make api requests
chai.use(chaiHttp);


const mockData = {};
// define global object to use inside tests;
const user11 = {
  username: 'normal user',
  email: 'newuser@user.com',
  password: 'user1secret',
  is_admin: false,
};
const user12 = {
  username: 'admin use',
  email: 'adminuser@user.com',
  password: 'adminuser1secret',
  is_admin: true,
};

let userToken;
let adminToken;

describe('/users signup api route', () => {
  before(async () => {
    const user = await db.query('select * from users');
    mockData.user1 = [user.rows];
  });

  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send(user11)
        .end((error, response) => {
          userToken = response.body.token;
          expect(response).to.have.status(201);
          done();
        });
    });
  });
  describe('/signin', () => {
    it('Should return auth token for valid user credentials', (done) => {
      chai.request(application)
        .post('/api/v1/users/signin')
        .send(user11)
        .end((error, response) => {
          expect(response).to.have.status(200);
          // const responseData = response.body.data;
          done();
        });
    });
  });
});
