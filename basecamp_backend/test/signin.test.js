
const chai = require('chai');
const chaiHttp = require('chai-http');
const signin = require('../routes/signin');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("signin & register testing", () => {
    describe("GET /signin and /register", () => {
        // Test to sign in failure
        it("should return status 401", (done) => {
            chai.request(signin)
                 .get('/signin?name=aaaaaasda&password=sadasd')
                 .end((err, res) => {
                     res.should.have.status(401);
                    //  res.body.should.be.a('object');
                     done();
            });
        });
        // Test to sign in succes
        it("should return status 200", (done) => {
            chai.request(signin)
                 .get('/signin?name=stains&password=1234')
                 .end((err, res) => {
                     res.should.have.status(200);
                    //  res.body.should.be.a('object');
                     done();
            });
        });

    });
});