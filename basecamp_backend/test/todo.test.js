const chai = require('chai');
const chaiHttp = require('chai-http');
const todo = require('../routes/todo');
const assert = require('chai').assert;
// Configure chai
chai.use(chaiHttp);
chai.should();



describe("home screen testing", () => {
    describe("GET /todo list,list items test", () => {
        
        // Test to add new list
        it("should add a new list", (done) => {
            chai.request(todo)
                 .get('/box/addList?list_head=head&box_id=0')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        // refresh items
        it("should return refreshed items in list", (done) => {
            chai.request(todo)
                 .get('/todo/getItem?list_id=0')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });

        // // add new item to the list
        // it("should add item to the list", (done) => {
        //     chai.request(todo)
        //          .get('/item/addvalue?list_id=0&item_head=test')
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //              res.body.should.be.a('object');
        //              done();
        //     });
        // });


        // add assign item to user
        // it("should add user to item", (done) => {
        //     chai.request(todo)
        //          .get('/item/assignUser?user_id=1&item_id=1')
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //              res.body.should.be.a('object');
        //              done();
        //     });
        // });


        // assign user to box
        it("should assign user to box", (done) => {
            chai.request(todo)
                 .get('/box/assign?user_id=1&box_id=1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });


        // get users
        it("should return users", (done) => {
            chai.request(todo)
                 .get('/item/users')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
            });
        });


       

        
       


       




    });
});