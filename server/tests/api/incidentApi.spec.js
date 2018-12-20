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
    
    // Generating token for test users;
    mockData.user.token = authHelper.generateToken(
      mockData.user.id, mockData.user.username, mockData.user.email, mockData.user.isadmin
    );
    mockData.admin.token = authHelper.generateToken(
      mockData.admin.id, mockData.admin.username, mockData.admin.email, mockData.admin.isadmin
    );
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
          // expect(incidents.length).to.equal(3);
          // expect(incidents[0].type).to.equal(mockData.testIncident.type);
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
          // expect(incident[0].id).to.equal(mockData.testIncident.id);
          // expect(incident[0].type).to.equal(mockData.testIncident.type);
          done();
        });
    });

    it('Should return a 404 if the incident is not found', (done) => {
      const invalidId = 101234556;
      chai.request(app)
        .get(`/api/v1/incidents/${invalidId}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.error).to.equal('Red-flag not found');
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
          expect(response).to.have.status(422);
          expect(response.body.error.length).to.equal(2);
          expect(response.body.error).to.have.members([
            'The type is required',
            'The location is required',
          ]);
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

          const incident = response.body;
          // expect(incident).to.be.an('array');
          // expect(incident.length).to.equal(1);
          // expect(incident[0].message).to.equal('Updated red-flag record’s comment');
          done();
        });
    });

    it('Should return a 404 if the incident is not found', (done) => {
      const invalidId = 'string';
      chai.request(app)
        .get(`/api/v1/incidents/${invalidId}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
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

          // expect(incident).to.be.an('array');
          // expect(incident.length).to.equal(1);
          // expect(incident[0].message).to.equal('red-flag record has been deleted');
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