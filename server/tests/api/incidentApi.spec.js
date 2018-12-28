import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import db from '../../database/index';
import authHelper from '../../helpers/authHelper';

// Use chai-http to make api requests
chai.use(chaiHttp);

// define global object to use inside tests;
const mockData = {};

describe('/incidents api route', () => {
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

  describe('GET /api/v1/incidents route', () => {
    it('Should responds with a 200 and all incidents', (done) => {
      chai.request(app)
        .get('/api/v1/incidents')
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incidents = response.body.data;
          expect(incidents).to.be.an('array');
          expect(incidents.length).to.equal(2);
          expect(incidents[0].type).to.equal(mockData.incident1.type);
          done();
        });
    });
  });

  describe('GET /api/v1/incidents/:id route', () => {
    it('Should responds with a 200 and a specific incident', (done) => {
      chai.request(app)
        .get(`/api/v1/incidents/${mockData.incident1.id}`)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incident = response.body.data;

          expect(incident).to.be.an('array');
          expect(incident.length).to.equal(1);
          expect(incident[0].id).to.equal(mockData.incident1.id);
          expect(incident[0].type).to.equal(mockData.incident1.type);
          done();
        });
    });

    it('Should return a 404 if the incident is not found', (done) => {
      const invalidId = 101234556;
      chai.request(app)
        .get(`/api/v1/incidents/${invalidId}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.error).to.equal('Incident not found');
          done();
        });
    });
  });

  describe('Incident /POST endpoint', () => {
    it('Should return the newly created incident id and a custom message', (done) => {
      chai.request(app)
        .post('/api/v1/incidents')
        .set('x-access-token', mockData.user.token)
        .send({
          type: 'Red-flag',
          location: '73, Samuel Lewis Road, Lagos',
          images: ['beautifu-image.jpg'],
          title: 'police bribery',
          comment: 'They are asking me 3 bucks',
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(201);

          const incident = response.body.data;

          expect(incident).to.be.an('array');
          expect(incident.length).to.equal(1);
          done();
        });
    });

    it('Should return the correct validation errors if there are any', (done) => {
      chai.request(app)
        .post('/api/v1/incidents')
        .set('x-access-token', mockData.user.token)
        .send({
          images: ['beautifu-image.jpg'],
          title: 'police bribery',
          comment: 'They are asking me 3 bucks',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          // expect(response.body.error.length).to.equal(2);
          // expect(response.body.error).to.have.members([
          //   'The type is required',
          //   'The location is required',
          // ]);
          done();
        });
    });

    it('Should 403 and an Error message containing invalid token', (done) => {
      const invalidToken = 'Invalid token';
      chai.request(app)
        .post('/api/v1/incidents')
        .set('x-access-token', invalidToken)
        .send({
          type: 'Red-flag',
          location: '73, Samuel Lewis Road, Lagos',
          images: ['beautiful-image.jpg'],
          title: 'police bribery',
          comment: 'They are asking me 3 bucks',
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(403);
          expect(response.body.error).to.equal('Invalid token, you have to login first');
          done();
        });
    });

    it('Should 403 and an Error message for unauthenticated users', (done) => {
      chai.request(app)
        .post('/api/v1/incidents')
        .send({
          type: 'Red-flag',
          location: '73, Samuel Lewis Road, Lagos',
          images: ['beautiful-image.jpg'],
          title: 'police bribery',
          comment: 'They are asking me 3 bucks',
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(403);
          expect(response.body.error).to.equal('Unauthorized!, you have to login first');
          done();
        });
    });
  });

  describe('incident/:id/:attribute /PATCH endpoint', () => {
    it('Should return the updated incident id and a message', (done) => {
      chai.request(app)
        .patch(`/api/v1/incidents/${mockData.incident1.id}/comment`)
        .set('x-access-token', mockData.user.token)
        .send({
          comment: 'a really bad road'
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incident = response.body.data;
          expect(incident).to.be.an('array');
          expect(incident.length).to.equal(1);
          expect(incident[0].message).to.equal(`Updated ${mockData.incident1.type} record comment`);
          done();
        });
    });

    it('Should return a 404 if the incident is not found', (done) => {
      const invalidId = 'string';
      chai.request(app)
        .get(`/api/v1/incidents/${invalidId}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.error).to.equal('Incident not found');
          done();
        });
    });

    it('Should return 400 if there is any validation error', (done) => {
      chai.request(app)
        .patch(`/api/v1/incidents/${mockData.incident1.id}/comment`)
        .set('x-access-token', mockData.user.token)
        .send({
          comment: 'inv'
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(400);
          done();
        });
    });

    it('Should return a 403 if a non admin user wants to change status', (done) => {
      chai.request(app)
        .patch(`/api/v1/incidents/${mockData.incident1.id}/status`)
        .set('x-access-token', mockData.user.token)
        .send({
          status: 'Under inquiry'
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(403);
          expect(response.body.error).to.equal(
            'Forbidden. You need admin permission to change statuses'
          );
          done();
        });
    });
  });

  describe('incident/:id /DELETE endpoint', () => {
    it('Should return the deleted incident id and a message', (done) => {
      chai.request(app)
        .delete(`/api/v1/incidents/${mockData.incident1.id}`)
        .set('x-access-token', mockData.user.token)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incident = response.body.data;
          expect(incident[0].message).to.equal('Intervention record has been deleted');
          done();
        });
    });

    it('Should return 403 if the incident doesn\'t belong to the user', (done) => {
      chai.request(app)
        .delete(`/api/v1/incidents/${mockData.incident2.id}`)
        .set('x-access-token', mockData.user.token)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(403);

          const res = response.body;
          expect(res.error).to.equal('Forbidden. The incident is not yours');
          done();
        });
    });

    it('Should return 404 if the id does not exist', (done) => {
      const invalidId = 38273366;
      chai.request(app)
        .delete(`/api/v1/incidents/${invalidId}`)
        .set('x-access-token', mockData.user.token)
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(404);
          done();
        });
    });
  });
});


describe('Unmatched route', () => {
  it('Should return a 404 if the route is not found', (done) => {
    const invalidPath = 'invalid path';
    chai.request(app)
      .get(`/api/v1/${invalidPath}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('Route not found');
        done();
      });
  });
});

// Api root route welcome message
describe('Root rout', () => {
  it('Should return with a 200 and welcome message in json', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((error, response) => {
        expect(response).to.have.status(200);

        const res = response.body.data[0];
        expect(res.message).to.equal('Welcome to iReporter');
        done();
      });
  });
});
