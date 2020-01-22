
const express = require('express');
const url = require('url');
const client = require('./pool');
const router = express();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);




//addList 
router.get('/box/addList',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`insert into list_table (list_head,box_id) values ('${query.list_head}',${query.box_id});`;
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });

//list each itemmmmm
router.get('/todo/getItem',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`select * from item_table where list_id=${query.list_id};`;
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });

  // add value to a list
  router.get('/item/addvalue',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`insert into item_table (item_head,list_id) values ('${query.item_head}',${query.list_id});
            select item_id from item_table where item_head='${query.item_head}' and list_id=${query.list_id};`;
    client.query(q, (err, res) => {
      resp.send(res[1].rows[0]); 
    });
  
  });
//subscriber 

//assign
router.get('/item/assignUser',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    var q = `insert into subscriber (item_id,user_id) values (${query.item_id},${query.user_id});
              select email from user_id where user_id=${query.user_id};`;
    client.query(q, (err, res) => {
      sendMail(res[1].rows[0].email);
      resp.send(res); 
    });
  
  });


  function sendMail(email){
    const msg = {
      to: email,
      from: 'harishkalariyil12@gmail.com',
      subject: 'Work Assignment',
      text: 'Hei someone Assigned a work for your team',
      html: `<strong>Happy Job!!</strong>
              <p>Hei someone Assigned a work for your team</p>`,
    };
    sgMail.send(msg);
  
  }
  




  //assign to box
///?user_id=${uid}&box_id=${this.props.box_id}`    	3 || ARRAY[4,5,6]

router.get('/box/assign',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=`UPDATE box_table SET user_id_array=${query.user_id} || user_id_array where box_id=${query.box_id};`;
    console.log(q)
    client.query(q, (err, res) => {
      var a=res.rows[0];
      resp.send(a); 
    });
  
  });

  
//user reques
router.get('/item/users',(req,resp)=>{ 
    var q = `select * from user_id;`
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });








  module.exports = router;