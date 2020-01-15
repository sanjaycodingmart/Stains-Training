import React, { Component } from 'react'
import { Button, Modal, Input } from 'antd'
import Box from './Box'

class Section extends Component {   

state = {
  newHead: '', 
  visible: false,
  confirmLoading: false,
  box_head:[]
};
    
showModal = () => {
  this.setState({ 
    visible: true,
  });
};
    
handleOk = () => {
  this.handleSubmit();
  this.setState({
    confirmLoading: true,
  });
  setTimeout(() => {
  this.setState({
    visible: false,
    confirmLoading: false,
  });
}, 1000);
};
  
handleCancel = () => {
  this.setState({
    visible: false,
  });
};
onType(e){
    var a = e.target.value;
    this.setState({
        newHead:a
    })
}
async handleSubmit(){       
    const response = await fetch(`http://localhost:4001/box/new?box_head=${this.state.newHead}&user_id=${this.props.user_id}&box_type=${this.props.box_type}`);
    const json = await response.json();
    console.log(json);    
    this.refresh();
}
async refresh(){
  console.log('Refreshing')
const response = await fetch(`http://localhost:4001/box/refresh?user_id=${this.props.user_id}&box_type=${this.props.box_type}`);
const json = await response.json();
console.log(json.rows)
this.setState({
    box_head:json.rows
});
}  
componentDidMount(){
  this.refresh();
}
//deleting content
async delete_box(id){
  console.log('Deleting')
const response = await fetch(`http://localhost:4001/box/delete?user_id=${this.props.user_id}&box_type=${this.props.box_type}&box_id=${id}`);
const json = await response.json();
console.log(json.rows)
this.refresh();
}  
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div className="flexboxparent">
                <div className="flexbox">
                    <header className="sectionjsHeader">
                        <Button type="primary" onClick={this.showModal}>New</Button>
                        <Modal
                            title="Title"
                            visible={visible}
                            onOk={this.handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel}
                            >
                                <Input onChange={this.onType.bind(this)}/>
                            </Modal>
                            <hr></hr>
                          <h2>ITEMS</h2>
                          {/* <h2>{this.props.head}</h2> */}
                          <hr></hr>
                          <Button></Button>
                        </header>
                    <content className="sectionContent">
                    {
                        this.state.box_head.map(item=>(
                            <Box box={item} delete_box={this.delete_box.bind(this)} passList={this.props.passList}/>
                                        
                        ))
                    }
                    </content>
                    
                </div>
            </div>
        )
    }
}

export default Section;
