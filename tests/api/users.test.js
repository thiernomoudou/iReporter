import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);

// define global object to use inside tests;
const mockUsers = {};

describe('/incidents api route', () => {
  beforeEach(() => {
    mockUsers.testUser1 = {
      email: 'souleymane@gmail.com',
      password: 'password',
      userName: 'thierno',
    };
    mockUsers.testUser2 = {
      email: 'kwanko@gmail.com',
      password: 'pkwanko',
      userName: 'nkwanko',
    };
  });

  describe('GET /api/v1/users/incidents route', () => {
    it('Should return 200 and all incidents for a user', (done) => {
      chai.request(app)
        .post('/api/v1/users/incidents')
        .send({
          userName: mockUsers.testUser1.userName,
          password: mockUsers.testUser1.password
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const userIncidents = response.body.data;
  
          expect(Array.isArray(userIncidents)).to.be.true;
          expect(userIncidents.length).to.equal(2);
          done();
        });
    });

    it('Should return 404 and an error message if username does not match', (done) => {
      chai.request(app)
        .post('/api/v1/users/incidents')
        .send({
          userName: 'invalid username',
          password: mockUsers.testUser1.password
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(404);

          expect(response.body.error).to.equal('Unauthorized');
          done();
        });
    });

    it('Should return 401 and an error message if password does not match', (done) => {
      chai.request(app)
        .post('/api/v1/users/incidents')
        .send({
          userName: mockUsers.testUser1.userName,
          password: 'invalid password'
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(401);

          expect(response.body.error).to.equal('Unauthenticated');
          done();
        });
    });
  });
});
