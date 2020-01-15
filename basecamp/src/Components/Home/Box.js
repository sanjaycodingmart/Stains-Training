import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button,Avatar } from 'antd';


class Box extends Component {

    state = {
        src:[]
    }


getAva(){
    this.props.box.user_id_array.map(e=>{
        this.avaa(e);
        // console.log('srccccccccccccccccc',ava)
    })
}
async avaa(a){
    const responce = await fetch(`http://localhost:4001/avatar?user_id=${a}`);
    const json = await responce.json();
    let abcc =this.state.src;
    abcc.push(json);
    this.setState({
        src:abcc
    },()=>{console.log(this.state.src)})
}
componentDidMount() {
    this.getAva();
}


    render() {
        return (
             <div className="box">
                 <div className="flnebox">
                    <Link to="/home/activity?box=1" onClick={()=>this.props.passList(this.props.box.box_id)}>
                    <h3>{this.props.box.box_head}</h3></Link>
                
                    <Button onClick={()=>this.props.delete_box(this.props.box.box_id)}>x</Button>


                 </div>
             <div>
             {
                    this.state.src.map(e=>(
                        <Avatar src={e.avatar} alt="Han Solo" />
                    ))
                }
                </div>
         </div>
        )
    }
}

export default Box
