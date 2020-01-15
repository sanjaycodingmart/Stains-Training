import React, { Component } from 'react'
import { Card, Button, List, Avatar, Modal, Input, Upload } from 'antd';
import { getDefaultNormalizer } from '@testing-library/react';
import Item from './../todos/item'
import { Link } from 'react-router-dom'

class Todos extends Component {
    state={
        visible: false,
        newList:'',
        hidden:'none',
    }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
 

//addList
  handleOk = e => {
    this.upload();
    this.props.passList(this.props.box_id);
    this.setState({
      visible: false,
    });
  };
  async upload(){
    const response = await fetch(`http://localhost:4001/box/addList?list_head=${this.state.newList}&box_id=${this.props.box_id}`);
    console.log("fetched....")
    const json =await response.json()
    console.log(json)
  }

  //firstmodel cancel
  handleCancel = e => {
      this.setState({
          visible: false
      })
  }


  //save input values to state
  onchange(e){
      this.setState({
          newList:e.target.value
      })
      console.log(e.target.value,this.state.newList)
  }
    render() {

        console.log('aaa: ',this.props.list_heads)
        return (
            <div className="flexboxparent">
                
                <Card className="flexbox" bordered={false} title={<header className="todoheader">
                                <Button type="primary" onClick={this.showModal}>New List</Button>
                                <Modal
                                    title="Add Heading"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    >
                                    <Input onChange={this.onchange.bind(this)}/>
                                </Modal>
                               
                                <h2>To-Dos</h2>
                                
                
                                <Button/>
                            </header>}>
                    <List
                        dataSource={this.props.list_heads}
                        renderItem={item => (
                        <List.Item> 
                            <div className="todoList">
                                <Link to="/home/list"><h3 onClick={()=>this.props.goList(item.list_id,item.list_head)}>{item.list_head}</h3></Link>
                                <Item list_id={item.list_id}/>
                            </div>
                        </List.Item>
                        )}
                        />
                    
                </Card>
            </div>
        )
    }
}

export default Todos