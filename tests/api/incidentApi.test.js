import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);

describe('/incidents api route', () => {

  describe('GET /api/v1/incidents route', () => {
    it('should responds with a 200 and all incidents', (done) => {
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
    it('should responds with a 200 and a specific incident', (done) => {
      chai.request(app)
        .get('/api/v1/incidents/3')
        .end((err, response) => {
          if (err) { return done(err); }
          expect(response).to.have.status(200);
          const incident = response.body.data;
          expect(Array.isArray(incident)).to.be.true;
          expect(incident[0].id).to.equal(3);
          expect(incident.length).to.equal(1);
          expect(incident[0].type).to.equal('Intervention');
          done();
        });
    });
  });
});
