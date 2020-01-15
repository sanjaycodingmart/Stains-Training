const express = require('express');
const cors = require('cors');
const url = require('url');
const { Client } = require('pg');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sample',
  password: 'indianIdeal',
  port: 5432,
});
client.connect();


//signing in
app.get('/signin',(req,resp)=>{
  let quer = url.parse(req.url,true).query;
  let q = `SELECT name FROM user_id WHERE name='${quer.name}' and password='${quer.password}';`;
  let count=5;
  client.query(q, (err, res) => {
    count=res.rowCount;
    if(count>0){
      resp.send(200);
    }else{
      resp.send(401);
    }
  });
});

//find comment avatar
app.get('/sub/Avatar',(req,resp)=>{
  let quer = url.parse(req.url,true).query;
  let q = `SELECT avatar FROM user_id WHERE user_id=${quer.user_id};`;
  client.query(q, (err, res) => {
    resp.send(res.rows[0].avatar);
  });
});

//new user registration
app.get('/register',(req,res)=>{
  let query = url.parse(req.url,true).query;
  res.send(query);
  let q=`insert into user_id (name,password) values ('${query.name}','${query.password}');`;
  client.query(q, (err, res) => {
  });
});


app.get('/12345',(req,res)=>{
  client.end();
});
app.listen(4001, ()=>{
  console.log('server listening on 4001');
});

//new codee 
//box
//geting box table
app.get('/box/refresh',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  // let q=`select box_head,box_id from box_table where user_id=${query.user_id} and box_type='${query.box_type}';`;

  let q = `select * from box_table where user_id_array @> ARRAY[${query.user_id}] and box_type='${query.box_type}';`

  client.query(q, (err, res) => {
    resp.send(res); 
  });
});



//deleting box table
app.get('/box/delete',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`DELETE FROM box_table WHERE user_id=${query.user_id} and box_type='${query.box_type}' and box_id=${query.box_id};`;
  client.query(q, (err, res) => {
    resp.send(res); 
  });
});
//new box
//
app.get('/box/new',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`insert into box_table (box_head,box_type,user_id,user_id_array) values ('${query.box_head}','${query.box_type}',${query.user_id},ARRAY[${query.user_id}]);`;
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


//addList 
app.get('/box/addList',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`insert into list_table (list_head,box_id) values ('${query.list_head}',${query.box_id});`;
  client.query(q, (err, res) => {
    resp.send(res); 
  });

});


//list each itemmmmm
app.get('/todo/getItem',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`select * from item_table where list_id=${query.list_id};`;
  client.query(q, (err, res) => {
    resp.send(res); 
  });

});


// add value to a list
app.get('/item/addvalue',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`insert into item_table (item_head,list_id) values ('${query.item_head}',${query.list_id});
          select item_id from item_table where item_head='${query.item_head}' and list_id=${query.list_id};`;
  client.query(q, (err, res) => {
    resp.send(res[1].rows[0]); 
  });

});



//user reques
app.get('/item/users',(req,resp)=>{ 
  var q = `select * from user_id;`
  client.query(q, (err, res) => {
    resp.send(res); 
  });

});


//assign
app.get('/item/assignUser',(req,resp)=>{ 
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


//commnet
app.get('/item/comment',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  var q = `insert into comment_table (list_id,user_id,comment) values (${query.list_id},${query.user_id},'${query.comment}');`
  client.query(q, (err, res) => {
    resp.send(res); 
  });
});

//show comment
app.get('/item/showComment',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  
  let q=`select * from comment_table join user_id on comment_table.user_id=user_id.user_id where list_id=${query.list_id};`;
  client.query(q, (err, res) => {
    resp.send(res); 
  });

});


//get user infooo
app.get('/user/get',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`select * from user_id where user_id=${query.user_id};`;
  client.query(q, (err, res) => {
    var a=res.rows[0];
    resp.send(a); 
  });

});

app.get('/user/update',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`UPDATE user_id SET password='${query.password}', name = '${query.name}', email = '${query.email}', phone = '{${query.phone}}', gender='${query.gender}', avatar='${query.avatar}' WHERE user_id=${query.user_id};`;
  client.query(q, (err, res) => {
    var a=res.rows[0];
    resp.send(a); 
  });

});



//assign to box
///?user_id=${uid}&box_id=${this.props.box_id}`    	3 || ARRAY[4,5,6]

app.get('/box/assign',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  let q=`UPDATE box_table SET user_id_array=${query.user_id} || user_id_array where box_id=${query.box_id};`;
  console.log(q)
  client.query(q, (err, res) => {
    var a=res.rows[0];
    resp.send(a); 
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

////likessss

app.get('/likes',(req,resp)=>{ 
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
app.get('/item/showReply',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  
  let q=`select * from reply_table join user_id on reply_table.user_id=user_id.user_id where comment_id=${query.comment_id}`;
  console.log(q);
  client.query(q, (err, res) => {
    resp.send(res); 
  });

});


//addreply
app.get('/reply/add',(req,resp)=>{ 
  let query = url.parse(req.url,true).query;
  
  let q=`insert into reply_table (reply,comment_id,user_id) values ('${query.reply}',${query.comment_id},${query.user_id})`;
  console.log(q);
  client.query(q, (err, res) => {
    resp.send(res); 
  });

});
