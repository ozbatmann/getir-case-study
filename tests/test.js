var supertest = require("supertest");
const expect = require("expect");

const { Connection } = require('../db/Connection.js');

const {app} = require("../app");

// Unit&Integration tests

// Integration test (Application server - MongoDB)
describe("POST /records",() => {

    before((done) =>{
          Connection.connectToMongo().then(() => {
            done();
        })
    });

    it("should return records",(done) =>{
        supertest(app)
            .post("/records")
            .send({
                startDate: '2016-01-26',
                endDate: '2019-09-05',
                minCount: 1000,
                maxCount: 2000
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body.records.length).toBeGreaterThan(0)
            })
            .end((err,res) =>{
                if (err) return done(err);
                done();
            });
    });
});

// Unit test (404 endpoint)
describe("POST requests handling", () => {

    it("should return 404",(done) =>{
        supertest(app)
            .post("/recordstest")
            .expect(404)
            .end((err,res) =>{
               if(err) return done(err);
                done();
            });
    });
});