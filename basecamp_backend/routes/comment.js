const express = require('express');
const url = require('url');
const client = require('./pool');
const router = express();




//commnet
router.get('/item/comment',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    var q = `insert into comment_table (list_id,user_id,comment) values (${query.list_id},${query.user_id},'${query.comment}');`
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  });



  //show comment
  router.get('/item/showComment',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    
    let q=`select * from comment_table join user_id on comment_table.user_id=user_id.user_id where list_id=${query.list_id};`;
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });



  ///in coment

  ////likessss

  router.get('/likes',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    let q=``;
    if(query.likes=='true'){
      console.log('liked');
      q = `update comment_table set likes=likes || ${query.user_id},dislikes=array_remove(dislikes, ${query.user_id}) where comment_id=${query.comment_id} and not likes @> ARRAY[${query.user_id}];`;
    }
    if(query.dislikes=='true'){
      console.log('disliked');
      q = `update comment_table set dislikes=dislikes || ${query.user_id},likes=array_remove(likes, ${query.user_id}) where comment_id=${query.comment_id} and not dislikes @> ARRAY[${query.user_id}];`;
    }
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });

  /////replyyyy
  router.get('/item/showReply',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    
    let q=`select * from reply_table join user_id on reply_table.user_id=user_id.user_id where comment_id=${query.comment_id}`;
    console.log(q);
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });


  //addreply
  router.get('/reply/add',(req,resp)=>{ 
    let query = url.parse(req.url,true).query;
    
    let q=`insert into reply_table (reply,comment_id,user_id) values ('${query.reply}',${query.comment_id},${query.user_id})`;
    console.log(q);
    client.query(q, (err, res) => {
      resp.send(res); 
    });
  
  });
  










module.exports = router;