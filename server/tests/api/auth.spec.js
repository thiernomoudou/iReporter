
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';


import application from '../../index';

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


describe('/users signup api route', () => {
  // before(async () => {
  //   const user = await db.query('select * from users');
  //   mockData.user1 = [user.rows];
  // });

  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
        .post('/api/v1/users/signup')
        .send(user11)
        .end((error, response) => {
          // userToken = response.body.token;
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

    it('Should return an Error message for invalid user credentials', (done) => {
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
  });
});
