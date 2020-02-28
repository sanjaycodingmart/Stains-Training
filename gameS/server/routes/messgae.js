const pool = require('../database/pool')

const addMessage = (message)=>{
    let query = `insert into messages ("from","to","message","time","sender") values (${message.from},${message.to},'${message.message}','${message.time}','${message.sender}');`
    pool.query(query, (err, res) => {
        if(err){
            console.log(err)
        }
        console.log(res)
    })
}

const addChat = (newid,userid)=>{
    let query =    `update users 
                    set chats=chats || ${newid}
                    where userid=${userid};`
    pool.query(query, (err, res) => {
        if(err){
            console.log(err)
        }
        console.log(res)
    })
}

const addUser = (detailsObj)=>{
    let query = `insert into users 
                (username,number,image,chats,"group") values
                ('${detailsObj.username}','{${detailsObj.number || 0}}','${detailsObj.image || 'image'}','{${detailsObj.chats || 0}}',${detailsObj.group || false});`
    pool.query(query, (err, res) => {
        if(err){
            console.log(err)
        }
        console.log(res)
    })
}

module.exports = { addMessage, addChat, addUser }