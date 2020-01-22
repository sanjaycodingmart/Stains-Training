const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express(); 
app.use(cors());


const signin = require('./routes/signin');
app.use(signin)
const box = require('./routes/box');
app.use(box)
const todo = require('./routes/todo');
app.use(todo)
const comment = require('./routes/comment');
app.use(comment)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(4001, (err)=>{
  if(err){
    console.log("errorrr")
  }
  console.log('server listening on 4001');
});



app.get("/", (req,res)=>{
  res.send("Helllooooo")
})
// const url = require('url');
// const client = require('./routes/pool');

//find comment avatar
// app.get('/sub/Avatar',(req,resp)=>{
//   let quer = url.parse(req.url,true).query;
//   let q = `SELECT avatar FROM user_id WHERE user_id=${quer.user_id};`;
//   client.query(q, (err, res) => {
//     resp.send(res.rows[0].avatar);
//   });
// });

