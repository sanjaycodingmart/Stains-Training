import React, { Component } from 'react'
import { Comment, Icon, Tooltip, Avatar, Input, Button } from 'antd';
import moment from 'moment';
import Comments from './comments2'

class comments extends Component {

state={
    likes:-1,
    dislikes:-1,
    like_disable:false,
        dislike_disable:false,
        action: null,
        replys:[],
        rplydis:"none"
}


async likeAdd(){
  const responce = await fetch(`http://localhost:4001/likes?likes=${this.state.like_disable}&dislikes=${this.state.dislike_disable}&comment_id=${this.props.comment_id}&user_id=${this.props.current_user}`);
  console.log(responce);
  setTimeout(this.props.refresh(),500);
}


//commment 
like = () => {
    if(this.state.like_disable==false){
        this.setState({
        // likes: this.state.likes+1,
        // dislikes: this.state.dislike_stat==1?this.state.dislikes-1:this.state.dislikes,
        action: 'liked',
        like_disable:true,
        dislike_disable:false
        },()=>{this.likeAdd();});
    }
    console.log('like disabledd (true)')
  };

  dislike = () => {
    if(this.state.dislike_disable==false){
        this.setState({
        // likes: this.state.like_stat==1?this.state.likes-1:this.state.likes,
        // dislikes: this.state.dislikes+1,
        action: 'disliked',
        dislike_disable:true,
        like_disable:false
        },()=>{this.likeAdd();});
    }
    console.log('dislike disabledd (true)')
  };


///////////////////////////////////////////////////////////////

    //getting commandsss
    async showComment(){
      const response = await fetch(`http://localhost:4001/item/showReply?comment_id=${this.props.comment_id}`);
      const json = await response.json();
      console.log('commentsssss availableeee:;;::::::',json.rows)
      let abc = await json.rows
      this.setState({replys:json.rows,
      },()=>{console.log('after akk',this.state.replys)});
    }
    //addreplyyyyy to a comment
    async addReply(value){
      const response = await fetch(`http://localhost:4001/reply/add?reply=${value}&comment_id=${this.props.comment_id}&user_id=${this.props.current_user}`);
      console.log(response);
      this.setState({rplydis:"none"});
      this.showComment();
    }
    replyBox(){
      this.setState({rplydis:"block"});
    }

componentDidMount() {
  this.showComment();
  if(this.props.likes.includes(this.props.current_user)){
    console.log('current user liked already.....',this.props.current_user);
    this.setState({
      like_disable:true,
      action:'liked'
    })

  }
  else if(this.props.dislikes.includes(this.props.current_user)){
    console.log('current_user not liked ',this.props.current_user)
    this.setState({
      dislike_disable:true,
      action:'disliked'
    })
  }
}


    render() {
      const { Search } =Input;
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
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{this.props.likes.length-1}</span>
            </span>,
            <span key=' key="comment-basic-dislike"'>
              <Tooltip title="Dislike">
                <Icon
                  type="dislike"
                  theme={action === 'disliked' ? 'filled' : 'outlined'}
                  onClick={this.dislike}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{this.props.dislikes.length-1}</span>
            </span>,
            <span onClick={this.replyBox.bind(this)} key="comment-basic-reply-to">Reply to</span>,
          ];
        return (

            <div>
                <Comment
                            actions={actions}
                            author={<a>{this.props.name}</a>}
                            avatar={
                            <Avatar
                                src={this.props.avr}
                                alt="Han Solo"
                            />
                            }
                        content={<p>{this.props.comment}</p>}
                            datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment().fromNow()}</span>
                            </Tooltip>
                            }
                        >
                          <Search
                            style={{display:this.state.rplydis}}
                            placeholder="input reply text"
                            enterButton="Reply"
                            size="large"
                            onSearch={value => this.addReply(value)}
                          />
                            {
                              this.state.replys.map(e=>(
                                <Comments name={e.name} reply={e.reply} avr={e.avatar}></Comments>
                              ))
                            }



                        </Comment>
            </div>
        )
    }
}

export default comments
