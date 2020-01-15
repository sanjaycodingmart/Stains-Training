import React, { Component } from 'react'
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import Comments from './comments'

class comments extends Component {

state={
    likes:8,
    dislikes:2,
    like_stat:0,
        dislike_stat:0,
        action: null,
}


// async likeAdd(){
//   const responce = await fetch(`http://localhost:4001/likes?likes=${this.state.likes}&dislikes=${this.state.dislikes}&comment_id=${this.props.comment_id}`);
//   console.log(responce);
// }


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

  componentDidMount() {
      this.setState({
          likes:this.props.likes,
          dislikes:this.props.dislikes
      })
  }







    render() {
        const { likes, dislikes, action } = this.state;
        // const actions = [
        //     <span key="comment-basic-like">
        //       <Tooltip title="Like">
        //         <Icon
        //           type="like"
        //           theme={action === 'liked' ? 'filled' : 'outlined'}
        //           onClick={this.like}
        //         />
        //       </Tooltip>
        //       <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
        //     </span>,
        //     <span key=' key="comment-basic-dislike"'>
        //       <Tooltip title="Dislike">
        //         <Icon
        //           type="dislike"
        //           theme={action === 'disliked' ? 'filled' : 'outlined'}
        //           onClick={this.dislike}
        //         />
        //       </Tooltip>
        //       <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
        //     </span>,
        //     <span key="comment-basic-reply-to">Reply to</span>,
        //   ];
        return (
            <div>
                <Comment
                            // actions={actions}
                            author={<a>{this.props.name}</a>}
                            avatar={
                            <Avatar
                                src={this.props.avr}
                                alt="Han Solo"
                            />
                            }
                        content={<p>{this.props.reply}</p>}
                            // datetime={
                            // <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            //     <span>{moment().fromNow()}</span>
                            // </Tooltip>
                            // }
                        />
            </div>
        )
    }
}

export default comments
