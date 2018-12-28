
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';


import application from '../../index';

// Use chai-http to make api requests
chai.use(chaiHttp);


// define mock data for testing;
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

const user13 = {
  username: 'adm',
  email: 'adminuser@user.com',
  password: 'adminuser1secret',
  is_admin: true,
};

describe('/users signup api route', () => {
  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send(user11)
        .end((error, response) => {
          expect(response).to.have.status(201);
          done();
        });
    });

    it('Should return error message if trying to singup two times', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send(user11)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.error).to.equal('User with that USERNAME Or EMAIL already exist');
          done();
        });
    });

    it('Should return validation if the username is less than 5 characters', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send(user13)
        .end((error, response) => {
          expect(response).to.have.status(400);
          const res = response.body.error;
          expect(res[0]).to.equal('Username must be at least 5 characters long');
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
          done();
        });
    });

    it('Should return 400 and an Error message if the user does not exist', (done) => {
      chai.request(application)
        .post('/api/v1/users/signin')
        .send(user12)
        .end((error, response) => {
          expect(response).to.have.status(400);
          const responseData = response.body;
          expect(responseData.error).to.equal('You do not have an active account. Please signup');
          done();
        });
    });

    it('Should return 400 and an Error message for invalid user credentials', (done) => {
      const invalidPassword = 'invalid password';
      chai.request(application)
        .post('/api/v1/users/signin')
        .send({
          username: 'normal user',
          email: 'newuser@user.com',
          password: invalidPassword,
          is_admin: false,
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          const responseData = response.body;
          expect(responseData.error).to.equal('The credentials you provided are incorrects');
          done();
        });
    });

    it('Should return 400 and an Error message for invalid input', (done) => {
      chai.request(application)
        .post('/api/v1/users/signin')
        .send({
          username: 'nor',
          email: 'newuser@user.com',
          password: 'user1secret',
          is_admin: false,
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          const responseData = response.body;
          expect(responseData.error[0]).to.equal(
            'Username must be at least 4 characters long and not more than 20'
          );
          done();
        });
    });
  });
});
