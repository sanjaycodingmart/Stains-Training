const express = require('express');
const url = require('url');
const client = require('./pool');
const app = express();
// const bodyParser = require('body-parser')
app.use( express.json());


//geting box table
app.get('/box/refresh',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q = `select * from box_table where user_id_array @> ARRAY[${query.user_id}] and box_type='${query.box_type}';`
  
    client.query(q, (err, res) => {
      resp.send(res);
    });
  });


//deleting box table
app.post('/box/delete',(req,resp)=>{ 
    let body = req.body;
    // let query = url.parse(req.url,true).query;
    let q=`DELETE FROM box_table WHERE box_id=${body.box_id};`;
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  });
  //new box
  //
  app.post('/box/new',(req,resp)=>{ 
    let body = req.body;
    let q=`insert into box_table (box_head,box_type,user_id,user_id_array) values ('${body.box_head}','${body.box_type}',${body.user_id},ARRAY[${body.user_id}]);`;
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });
  
  //pass box
  app.get('/box/pass',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`select * from list_table where box_id=${query.box_id};`;
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });



  //home
  //get user infooo
  app.get('/user/get',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`select * from user_id where user_id=${query.user_id};`;
    client.query(q, (err, res) => {
      var a=res.rows[0];
      resp.send(a); 
    });
  
  });

  app.post('/user/update',(req,resp)=>{ 
    // let query = url.parse(req.url,true).query;
    let body = req.body;
    
    let q=`UPDATE user_id SET password='${body.password}', name = '${body.name}', email = '${body.email}', phone = '{${body.phone}}', gender='${body.gender}', avatar='${body.avatar}' WHERE user_id=${body.user_id};`;
    client.query(q, (err, res) => {
      // var a=res.rows[0];
      resp.send(res); 
    });
  
  });
  

  //avavaaa

  app.get('/avatar',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`select avatar from user_id where user_id=${query.user_id}`;
    client.query(q, (err, res) => {
      var a=res.rows[0];
      resp.send(a); 
    });
  
  });



module.exports = app;