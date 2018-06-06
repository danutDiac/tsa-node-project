let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
should = chai.should();
let server = require('../src/main.js');

describe('GET /nationalDays', ()=>{
    it('should return a list of national days', done => {
        chai.request(server).get('/nationalDays').end((req, res) =>{
            res.should.have.status(200);
            Array.isArray(res.body).should.equal(true);
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('days');
            Array.isArray(res.body[0].days).should.equal(true);
            done();
        })
    })
})