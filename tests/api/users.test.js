import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);

// define global object to use inside tests;
const mockUsers = {};

describe('/users api route', () => {
  beforeEach(() => {
    mockUsers.testUser1 = {
      id: 1,
      email: 'souleymane@gmail.com',
      password: 'password',
      userName: 'thierno',
    };
    mockUsers.testUser2 = {
      id: 2,
      email: 'kwanko@gmail.com',
      password: 'pkwanko',
      userName: 'nkwanko',
    };
  });

  describe('GET /api/v1/users/:id/incidents route', () => {
    it('Should return 200 and all incidents for a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${mockUsers.testUser1.id}/incidents`)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const userIncidents = response.body.data;
  
          expect(Array.isArray(userIncidents)).to.be.true;
          expect(userIncidents.length).to.equal(2);
          done();
        });
    });

    it('Should return 404 and an error message if userId does not exist', (done) => {
      const invalidId = 10;
      chai.request(app)
        .get(`/api/v1/users/${invalidId}/incidents`)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(404);

          expect(response.body.error).to.equal('User not found');
          done();
        });
    });
  });
});
