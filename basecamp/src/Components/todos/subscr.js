import React, { Component } from 'react'
import { Input, Select, Button } from 'antd'
import { Icon, Tooltip } from 'antd';
import Comments from './comments'

const { Option } = Select;
const { TextArea } = Input;
const children = [];

class subscr extends Component {
    state={
        like_stat:0,
        dislike_stat:0,
        user_list:[],
        selected_users:[],
        likes: 0,
        dislikes: 0,
        action: null,
        comment:'',
        user_id:this.props.user_id,
        commentList:[]
    }


    handleChange(value) {
        console.log(value);
        let abc = value.map(e=>Number(e))
        this.setState({
            selected_users:abc
        })
        console.log('aaa',this.state.selected_users)
      }
async assignUser(uid,it_id){
    console.log('ideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',uid,it_id)
    const response1 = await fetch(`http://localhost:4001/item/assignUser?user_id=${uid}&item_id=${it_id}`);
    const response2 = await fetch(`http://localhost:4001/box/assign?user_id=${uid}&box_id=${this.props.box_id}`);
    // console.log('rrrrr',response2)
}

async addsubscr(){
    // this.getUserList();
    var item_id=await this.props.addvalue();//to add value
    console.log('from subasssignn',item_id)
    this.state.selected_users.forEach(element=>{
        this.assignUser(element,item_id);
        // console.log('selelellelllllllllllllllll',element,this.props.list_id)
    })
}
async getUserList(){
    const response = await fetch(`http://localhost:4001/item/users`);
    const json = await response.json();
    // console.log(json.rows)
    this.setState({
        user_list:json.rows
    })
    console.log(this.state.user_list)
    json.rows.forEach(element => {
        console.log('i valuye',element.user_id)
    children.push(<Option key={element.user_id}>{element.name}</Option>)
    });{
       
    }
}
componentDidMount(){
    this.getUserList();
    this.showComment();
    this.props.refresh();
}


//commment 
like = () => {
    if(this.state.like_stat==0){
        this.setState({
        likes: this.state.likes+1,
        dislikes: this.state.dislike_stat==1?this.state.dislikes-1:this.state.dislikes,
        action: 'liked',
        like_stat:1,
        dislike_stat:0
        });
    }
  };

  dislike = () => {
    if(this.state.dislike_stat==0){
        this.setState({
        likes: this.state.like_stat==1?this.state.likes-1:this.state.likes,
        dislikes: this.state.dislikes+1,
        action: 'disliked',
        dislike_stat:1,
        like_stat:0
        });
    }
  };
  onChangeComment(e){
      this.setState({
          comment:e.target.value
      })
      console.log(this.state.comment)
  }
  async DoneComment(){
      console.log('coment:',this.state.comment)
      const response = await fetch(`http://localhost:4001/item/comment?user_id=${this.props.user_id}&list_id=${this.props.list_id}&comment=${this.state.comment}`);
      const json = await response.json();
      this.showComment();
  }



  //getting commandsss
  async showComment(){
    const response = await fetch(`http://localhost:4001/item/showComment?list_id=${this.props.list_id}`);
    const json = await response.json();
    // console.log('commentsssss availableeee:;;::::::',json.rows)
    let abc = await json.rows
    this.setState({commentList:json.rows,
    },()=>{console.log('after getting all comment List',this.state.commentList)});
  }


    render() {
        console.log('list is',this.props.list_id)
        const { likes, dislikes, action } = this.state;
        const actions = [
            <span key="comment-basic-like">
              <Tooltip title="Like">
                <Icon
                  type="like"
                  theme={action === 'liked' ? 'filled' : 'outlined'}
                  onClick={this.like}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span key=' key="comment-basic-dislike"'>
              <Tooltip title="Dislike">
                <Icon
                  type="dislike"
                  theme={action === 'disliked' ? 'filled' : 'outlined'}
                  onClick={this.dislike}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
            </span>,
            <span key="comment-basic-reply-to">Reply to</span>,
          ];
        
        console.log(this.props.user_id)
        return (
            <div><div>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Assign this task to.."
                    // defaultValue={['']}
                    onChange={this.handleChange.bind(this)}
                >
                    {children}
                </Select>
                <Button onClick={()=>this.addsubscr()}>Add this Item</Button>
            </div>
            <div>
                {
                    this.state.commentList.map(i=>(
                        <Comments refresh={this.showComment.bind(this)} name={i.name} user_id={i.user_id} comment={i.comment} avr={i.avatar} likes={i.likes} dislikes={i.dislikes} comment_id={i.comment_id} current_user={this.props.user_id}></Comments>
                    ))
                }
            </div>
            <div>
            <TextArea rows={4} onChange={this.onChangeComment.bind(this)} value={this.state.comment}/>
            <Button type="primary" onClick={this.DoneComment.bind(this)}>Comment</Button>
            </div>
            
            </div>
        )
    }
}

export default subscr
