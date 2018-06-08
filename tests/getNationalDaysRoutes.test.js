let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let config = require('../config/config')

chai.use(chaiHttp);
should = chai.should();
let server = require('../src/main.js');

let NationalDays = require("../src/models/nationalDaysModel");

describe('GET /nationalDays', () => {
    beforeEach((done) => {
        mongoose.connect(config.mongoUrl).then(() => {
            mongoose.connection.db.dropDatabase()
            let newNationalDays = [new NationalDays({
                name: "o sarbatoare random",
                days: ["2018-06-08", "2018-12-31"]
            }),
            new NationalDays({
                name: "o alta sarbatoare random",
                days: ["2018-04-21", "2018-11-22"]
            })
            ]
            NationalDays.insertMany(newNationalDays)
                .then((days) => {
                    done();
                })
        })
    })

    it('should return a list of national days', done => {
        chai.request(server).get('/nationalDays').end((req, res) => {
            res.should.have.status(200);
            Array.isArray(res.body).should.equal(true);
            res.body.length.should.equal(2);
            done();
        })
    })
})