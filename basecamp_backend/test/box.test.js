const chai = require('chai');
const chaiHttp = require('chai-http');
const box = require('../routes/box');
const assert = require('chai').assert;
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("home screen testing", () => {
    describe("GET /home home,activities and boxes", () => {
        // Test to refreshing boxxx
        it("should return refreshed box (check whether user 1 having at least one box in teams section)", (done) => {
            chai.request(box)
                 .get('/box/refresh?user_id=1&box_type=Teams')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        // Test to adding new box
        it("should insert 1 box to the table", (done) => {
            chai.request(box)
                 .post('/box/new',{
                       method:'post',
                        headers:{'Content-Type':'application/json; charset=utf-8'},
                        body: JSON.stringify({
                            box_head:'test_box',
                            user_id:'1',
                            box_type:'Teams',
                            box_id:0
                        })
                 })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });


        //test delete a box from the table
        it("should delete one box", (done) => {
            chai.request(box)
                 .post(`/box/delete`,{
                        method: 'post',
                        headers:{'Content-Type':'application/json', 'charset':'utf-8'},
                        body: JSON.stringify({ box_id:0 })
                 })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });


        //test to pass the box number and get lists related to that box
        it("should return list of rows (can be empty) ", (done) => {
            chai.request(box)
                 .get(`/box/pass?box_id=0`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        //test to get the user infoooo
        it("should return row of user ", (done) => {
            chai.request(box)
                 .get(`/user/get?user_id=1`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        //test update user info
        it("should update the current user with given details ", (done) => {
            chai.request(box)
                 .post(`/user/update`,{
                    method:'post',
                    headers:{'Content-Type':'application/json', 'charset':'utf-8'},
                    body: JSON.stringify({
                      name:'test',
                      password:'1234',
                      email:'123@gmail.com',
                      phone:'1234567890',
                      gender:'Male',
                      user_id:'0',
                      avatar:'xxx'
                    })
                })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });


        //test get avatar of that
        it("should return avatar of that user ", (done) => {
            chai.request(box)
                 .get(`/avatar?user_id=1`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });




    });
});