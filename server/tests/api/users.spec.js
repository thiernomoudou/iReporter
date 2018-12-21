import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import db from '../../database/index';
import authHelper from '../../helpers/authHelper';
import app from '../../index';

// Use chai-http to make api requests
chai.use(chaiHttp);

// define global object to use inside tests;
const mockData = {};

describe('/users api route', () => {
  before(async () => {
    const users = await db.query('select * from users');
    const incidents = await db.query('select * from incidents');
    // Setting 2 test users
    [mockData.user, mockData.admin] = users.rows;
    // Setting 2 test incidents
    [mockData.incident1, mockData.incident2] = incidents.rows;
    const userToken = {
      id: mockData.user.id,
      username: mockData.user.username,
      email: mockData.user.email,
      isadmin: mockData.user.isadmin
    };

    const adminToken = {
      id: mockData.admin.id,
      username: mockData.admin.username,
      email: mockData.admin.email,
      isadmin: mockData.admin.isadmin
    };

    // Generating token for test users;
    mockData.user.token = authHelper.generateToken(userToken);
    mockData.admin.token = authHelper.generateToken(adminToken);
  });
  describe('GET /api/v1/users/:id/incidents route', () => {
    it('Should return 200 and all incidents for a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${mockData.user.id}/incidents`)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const userIncidents = response.body.data;

          // expect(userIncidents).to.be.an('array');
          // expect(userIncidents.length).to.equal(2);
          done();
        });
    });

    it('Should return 404 and an error message if userId does not exist', (done) => {
      const invalidId = 1012344;
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

  describe('GET /api/v1/users/:id route', () => {
    it('Should return 200 and the user profile', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${mockData.user.id}`)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const userIncidents = response.body.data;

          expect(userIncidents).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/users route', () => {
    it('Should return 200 and a list of all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const users = response.body.data;

          expect(users).to.be.an('array');
          done();
        });
    });
  });
});
