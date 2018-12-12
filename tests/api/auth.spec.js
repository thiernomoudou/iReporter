
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import application from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);

// define global object to use inside tests;
const mockUsers = {};

describe('/users api route', () => {
  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send({
          username: 'new user11',
          email: 'new_user1@user.com',
          password: 'secret123331'
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          done();
        });
    });
  });
});
