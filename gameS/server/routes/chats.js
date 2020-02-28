const pool = require('../database/pool')
const app = require('express')()
const cors = require('cors')
app.use(cors())

app.get('/box',(req,resp)=>{ 
    let currentUser = req.query.userid
    let temp = {}
    let main ={chats:[]}
    let q = `select * from users where userid=${currentUser};
              select * from users;`
  
    pool.query(q, async (err, res) => {
        if(err)console.log(err)
      const chats =res[0].rows[0].chats;
      const users = res[1].rows
      console.log('@@@',users)

    if(chats.length==0){
      let query = 'select * from users;'
      pool.query(query, (err, respo) => {
          if(err)console.log(err)

          main['chats']= {messages:[],userid:''}
          main['allusers']=respo.rows
          resp.json(main)       
      })

    }else
    chats.forEach(id => {
      let query
        var current = users.find(x=>x.userid==id)
        current.group==true
          ?query =`select * from users where userid=${id};
                    select * from messages
                    where messages.to=${id};
                    select * from users;`


          :query = `select * from users where userid=${id};
                        select * from messages
                        where (messages.from=${currentUser} or messages.to=${currentUser})
                        and (messages.from=${id} or messages.to=${id});
                          select * from users;`
        pool.query(query, (err, respo) => {
            if(err)console.log(err)
            temp = respo[0].rows[0]
            temp['messages']=respo[1].rows.reverse()
            main['allusers']=respo[2].rows
            
             main['chats'].push(temp)
             if(id==chats[chats.length-1])
             resp.json(main)       
        })
      })
    });
  });


  module.exports = app;