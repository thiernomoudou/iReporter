import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);

describe('/incidents api route', () => {

  describe('GET /api/v1/incidents route', () => {
    it('Should responds with a 200 and all incidents', (done) => {
      chai.request(app)
        .get('/api/v1/incidents')
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incidents = response.body.data;
  
          expect(Array.isArray(incidents)).to.be.true;
          expect(incidents.length).to.equal(3);
          expect(incidents[0].type).to.equal('Redflag');
          done();
        });
    });
  });

  describe('GET /api/v1/incidents/:id route', () => {
    it('Should responds with a 200 and a specific incident', (done) => {
      chai.request(app)
        .get('/api/v1/incidents/3')
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incident = response.body.data;

          expect(Array.isArray(incident)).to.be.true;
          expect(incident.length).to.equal(1);
          expect(incident[0].id).to.equal(3);
          expect(incident[0].type).to.equal('Intervention');
          done();
        });
    });
  });

  describe('Incident /POST endpoint', () => {
    it('Should return the newly created incident id and a custom message', (done) => {
      chai.request(app)
        .post('/api/v1/incidents')
        .send({
          id: 4,
          type: 'Redflag',
          location: '73, Samuel Lewis Road, Lagos',
          images: ['beautifu-image.jpg'],
          title: 'police bribery',
          comment: 'They are asking me 3 bucks',
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(201);

          const incident = response.body.data;

          expect(Array.isArray(incident)).to.be.true;
          expect(incident.length).to.equal(1);
          expect(incident[0].id).to.equal(4);
          expect(incident[0].message).to.equal('Created Redflag record');
          done();
        });
    });
  });

  describe('incident:id /PUT endpoint', () => {
    it('Should return the updated incident id and a message', (done) => {
      chai.request(app)
        .put('/api/v1/incidents/3')
        .send({
          location: '73, Sani Abacha Street, Lagos',
          status: 'Under inquiry'
         
        })
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);

          const incident = response.body.data;

          expect(Array.isArray(incident)).to.be.true;
          expect(incident.length).to.equal(1);
          expect(incident[0].id).to.equal(3);
          expect(incident[0].message).to.equal('Redflag updated');
          done();
        });
    });
  });
});
