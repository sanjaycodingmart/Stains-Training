const express = require('express');
const url = require('url');
const client = require('./pool');
// const router = express.Router();
const app = express();



//signin
app.get('/signin',(req,res)=>{
  let quer = url.parse(req.url,true).query;
  let q = `SELECT name FROM user_id WHERE name='${quer.name}' and password='${quer.password}';`;
  // res.send('worldokmdksd')
  let count=5;
  client.query(q, (err, resp) => {
    // console.log(resp,err);
    // console.log('workijiijjijijijijijij,',resp)
    // res.send(resp,err,'hajshdjhskd');
    count=resp.rowCount;
    if(count>0){
      res.send(200);
    }else{
      res.send(401);
    }
  });
});


//new user registration
app.get('/register',(req,res)=>{
  let query = url.parse(req.url,true).query;
  res.send(query);
  let q=`insert into user_id (name,password) values ('${query.name}','${query.password}');`;
  client.query(q, (err, res) => {
    console.log(res);
  });
});


module.exports = app;