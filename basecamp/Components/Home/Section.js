import React, { Component } from 'react'
import { Button, Modal, Input } from 'antd'
import Box from './Box'

class Section extends Component {   

    state = {
        ModalText: '',
        visible: false,
        confirmLoading: false,
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({
          confirmLoading: true,
        });
        this.handleSubmit();
        setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    };
  
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    };
    onType(e){
        var a = e.target.value;
        this.setState({
            ModalText:a
        })
        console.log(this.state.ModalText)
    }
    async handleSubmit(){
        const value = this.state.ModalText;
        const tab =this.props.head;
        console.log(tab);
        const response = await fetch('http://localhost:4000/home/new?head='+value+'&table='+tab);
        // const json = await response.json();
        console.log(response);
       
    }
     
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <div className="flexbox">
                    <h2>{this.props.head}
                        <Button onClick={this.showModal}>New</Button>
                        <Modal
                            title="Title"
                            visible={visible}
                            onOk={this.handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel}
                            >
                                <Input onChange={this.onType.bind(this)}/>
                            </Modal>
                        </h2>
                    {
                        this.props.array.map(item=>(
                            <Box element={item} key={item.content}/>
                        ))
                    }
                    
                </div>
            </div>
        )
    }
}

export default Section;
