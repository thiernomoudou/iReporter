
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import application from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);


const mockUser = {};
// define global object to use inside tests;
const user1 = {
  username: 'normal user',
  email: 'newuser@user.com',
  password: 'user1secret',
  is_admin: false,
};
const user2 = {
  username: 'admin use',
  email: 'adminuser@user.com',
  password: 'adminuser1secret',
  is_admin: true,
};

let token;
let adminToken;

describe('/users signup api route', () => {
  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send(user1)
        .end((error, response) => {
          token = response.body.token;
          expect(response).to.have.status(201);
          done();
        });
    });
  });
});

describe('/signin', () => {
  it('Should return auth token for valid user credentials', (done) => {
    chai.request(application)
      .post('/api/v1/users/signin')
      .send(user1)
      .end((error, response) => {
        expect(response).to.have.status(200);
        console.log(response.body);
        const responseData = response.body.data;
        done();
      });
  });
});
