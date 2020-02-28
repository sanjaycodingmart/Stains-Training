


//chats
const users = [
  {
    'id':1,
    'name':'stains',
    'image':"https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    'message':[
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      },
      {
        'isMe':false,
        'id':2,
        'time':'12:01',
        'message':'how are you?'
      },
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      },
      {
        'isMe':false,
        'id':2,
        'time':'12:01',
        'message':'how are you?'
      },
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      },
      {
        'isMe':false,
        'id':2,
        'time':'12:01',
        'message':'how are you?'
      },
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      },
      {
        'isMe':false,
        'id':2,
        'time':'12:01',
        'message':'how are you?'
      },
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      },
      {
        'isMe':false,
        'id':2,
        'time':'12:01',
        'message':'how are you?'
      },
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      },
      {
        'isMe':false,
        'id':2,
        'time':'12:01',
        'message':'how are you?'
      },
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'hello'
      }
    ]
  },
  {
    'id':2,
    'name':'joemon',
    'image':"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIm769Shp0pta1Yc-0CyHp2rlBLQhAth0_KTdcRgDBlq8KDByP",
    'message':[
      {
        'isMe':true,
        'id':1,
        'time':'12:00',
        'message':'there'
      },
      {
        'isMe':true,
        'id':2,
        'time':'12:01',
        'message':'DDDaaaaa !!!!'
      }
    ]
  }

]

const addUser = ({ name, message })=>{
  const user  = { name, message };
  users.push(user)
  console.log(users)
  return user
}

const getChat = ()=>{
  return users;
}

const addMessage =(message)=>{
  console.log(message)
}

module.exports = { addUser, getChat, addMessage };