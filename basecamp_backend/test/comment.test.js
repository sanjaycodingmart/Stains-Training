const chai = require('chai');
const chaiHttp = require('chai-http');
const comment = require('../routes/comment');
const assert = require('chai').assert;
// Configure chai
chai.use(chaiHttp);
chai.should();



describe("home screen testing", () => {
    describe("GET /todo list,list items test", () => {
        
        // adding new comment
        it("should add a new comment", (done) => {
            chai.request(comment)
                 .get('/item/comment?user_id=1&list_id=1&comment=hellootest')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        //refreshing available comments
        it("should return all comments", (done) => {
            chai.request(comment)
                 .get('/item/showComment?list_id=1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });


        //getting available likes
        it("should return all available likes to comments", (done) => {
            chai.request(comment)
                 .get('/likes?likes=true&dislikes=false&comment_id=1&user_id=1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        //getting available reply to comment
        it("should return all available reply to comments", (done) => {
            chai.request(comment)
                 .get('/item/showReply?comment_id=1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        //adding reply to comment
        it("should add reply to comments", (done) => {
            chai.request(comment)
                 .get('/reply/add?reply=hello&comment_id=1&user_id=1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });




    });
});