import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/index';

// Use chai-http to make api requests
chai.use(chaiHttp);

describe('GET /api/v1/incidents route', () => {
  it('should responds with a 200 and all incidents', (done) => {
    chai.request(app)
      .get('/api/v1/incidents')
      .end((err, response) => {
        if (err) { return done(err); }
        expect(response).to.have.status(200);
  
        const incidents = response.body;

        expect(Array.isArray(incidents)).to.be.true;
        expect(incidents.length).to.equal(3);
        expect(incidents[0].type).to.equal('Redflag');
        done();
      });
  });
});
