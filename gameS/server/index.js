const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const pool = require('./database/pool')

const { addMessage, addChat, addUser } = require('./routes/messgae')

const router = require('./router')
const chatsRouter = require('./routes/chats')
getAll()
app.use(router)
app.use(chatsRouter)



var sockets = {}
async function getAll(){ 
    let q = `select userid from users;`
    pool.query(q, (err, res) => {
        if(err)console.log(err)
        createSocket(res.rows)
    });
}
function createSocket(data){
    data.map(e=>{
        sockets[e.userid] = io.of(`/${e.userid}`).on('connection',(socket)=>{
            console.log(`new socket! of ${e.userid}`)
            socket.on('chat',({ userid },callback)=>{
                const err = `testing callback true usrid:${userid}`;
                if(err){
                    callback(err)
                }
            })
            socket.on('new message',(message,callback)=>{
                addMessage(message)
                let err = 'no error'
                callback(err,'message send')
                message.group
                    ?sendGroupMessage(message)
                    :sendMMM(message)
            })


            //new chat add request
            socket.on('new chat',({ userid },callback)=>{
                const err = `got the user, userid:${userid}`;
                addChat(userid,e.userid)//userid = new userid, e.userid = current socket user
                if(err){
                    callback(err)
                }
            })

            //add new group member
            socket.on('new group member',({chats, userid})=>{
                addChat(chats,userid)
            })

            //new group creation 
            socket.on('new group create',(details)=>{
                addUser(details)
                socket.emit('success-group-create',{'aa':'aa'})
            })

            //on disconnect
            socket.on('disconnect',()=>{
                console.log('disconnected! 00000')
            })
        })
    })
}
function sendMMM(message){
    sockets[message.to].emit('new message',message)
}
function sendGroupMessage(message){
    console.log('groiup message',message)
    message.chats.map(id=>{
        if(id!=message.from)
        sockets[id].emit('new message',message)
    })
}



server.listen(5000, ()=>console.log('Listenting on 5000'))