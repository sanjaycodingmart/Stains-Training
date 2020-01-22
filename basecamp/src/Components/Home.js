import React, { Component } from 'react'
import { BrowserRouter as Router ,Route , Switch } from 'react-router-dom';

import Section from './Home/Section'
import Activity from './Home/Activity';
import Todos from './Home/Todos'
import Iteme from './todos/iteme'

import { Avatar} from 'antd';
import { Drawer, Form,  Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import { message, Button } from 'antd';
const { Option } = Select;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class Home extends Component {
    

    state={  
        user_id:2,
        list_heads:[],
        list_id:0,
        lst_hd:'',
        current_box:0,
        visible: false,
        visibleEdit:false,
        user_details:[],
        dummy_details:[]
    }
    async fetchProfile(){
        const response= await fetch(`http://localhost:4001/user/get?user_id=${this.state.user_id}`);
        const json = await response.json();
        this.setState({
            user_details:json,
            dummy_details:json
        })
        console.log(this.state.user_details)
    }
    componentDidMount(){
        // this.setState({user_id:this.props.history.location.state.user_id});
        console.log('changing user_id:',this.state.user_id);
        this.fetchProfile();
    }
    //pass value to todo//////list only
    async passList(box_id){
        console.log('Passing',box_id)
      const response = await fetch(`http://localhost:4001/box/pass?box_id=${box_id}`);
      const json = await response.json();
    //   console.log(json.rows)
      this.setState({
          list_heads:json.rows
      });
      console.log(this.state.list_heads)
      this.setState({
          current_box:box_id
      })
      }  

      //drower small
      showDrawer = () => {
        this.fetchProfile();
        this.setState({
          visible: true,
        });
      };
      showDrawerEdit = () => {
        this.fetchProfile();
        this.setState({
          visibleEdit: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
          visibleEdit: false,
        });
      };
      onCloseEdit = () => {
        this.setState({
          visibleEdit: false,
        });
      };


//goto s specific list
goList(id,head){
    this.setState({
        list_id:id,
        lst_hd:head
    })
}

//edit
editProfile(){
    console.log('editinggg');
    this.onClose();
    this.setState({
        visibleEdit:true
    })
}
changeName(e){
    let temp = this.state.dummy_details;
    temp[e.target.id]=e.target.value;  
    this.setState({
        dummy_details:temp
    })
    console.log(e.target.id)
}
async ProfileUpdate(){
    this.onClose();
    let a = this.state.dummy_details;
    const response = await fetch(`http://localhost:4001/user/update`,{
      method:'post',
      headers:{'Content-Type':'application/json', 'charset':'utf-8'},
      body: JSON.stringify({
        name:a.name,
        password:a.password,
        email:a.email,
        phone:a.phone,
        gender:a.gender,
        user_id:a.user_id,
        avatar:a.avatar
      })
    });
    // const json = await response.json();
}

    render() {
        return (
            
            <div className="homeMaindiv">
                <header className="homejsHeader">
                    <div className="homejsHeader1"><img src="https://launchpad-asset2.37signals.com/assets/brand-wrapper-backgrounds/paperclip-logo-349bf403c234be9d67457f2825054e138f6d54affe467717f3da909cab741cba.svg"></img><span>BaseCamp</span></div>
                    <div className="headerMiddle">
                        <a href="/home">Home</a>
                        <a>Pings</a>
                        <a>Hey!</a>
                        <a>Activity</a>
                        <a>My Stuff</a>
                        <a>Find</a>
                    </div>
                    <div><Avatar onClick={this.showDrawer} src={this.state.user_details.avatar} /></div>
                    <Drawer
                        title={<div><Avatar onClick={this.showDrawer} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />{this.state.user_details.name}<Button type="link" onClick={this.editProfile.bind(this)}>edit</Button></div>}
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        >
                        <p>{this.state.user_details.email}</p>
        <p>{this.state.user_details.phone}</p>
        <p>{this.state.user_details.gender}.</p>
                        </Drawer>
                        <Drawer
          title="Edit Your Credentials"
          width={300}
          onClose={this.onCloseEdit}
          visible={this.state.visibleEdit}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Form.Item label="Name & Email">
                  <Input placeholder="Please enter user name" value={this.state.dummy_details.name} onChange={this.changeName.bind(this)} id="name"/>
                  <Input placeholder="Please enter email" value={this.state.dummy_details.email} onChange={this.changeName.bind(this)} id="email"/>
                  <Input placeholder="Please enter url for profile image" value={this.state.dummy_details.avatar} onChange={this.changeName.bind(this)} id="avatar"/>
                </Form.Item>
            </Row>
            <Row gutter={16}>
              
                <Form.Item label="Gender">
                  
                    <Select placeholder="Please choose" defaultValue={'Male'}>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>
              
            </Row>
            <Row gutter={16}>
              
              
                <Form.Item label="Password">
                 
                <Input.Password placeholder="input password" value={this.state.dummy_details.password} onChange={this.changeName.bind(this)} id="password"/>
                <Input.Password placeholder="Re-enter Password" value={this.state.dummy_details.password} onChange={this.changeName.bind(this)} id="password"/>
                </Form.Item>
            
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Phone">
                <Input placeholder="Please enter phone Number" value={this.state.dummy_details.phone} onChange={this.changeName.bind(this)} id="phone"/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.ProfileUpdate.bind(this)} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
                </header>
                <Router>
                    <div className="homeParent">
                    <div className="homeContent">
                    <Switch>
                        <Route path="/home/" exact component={()=> (
                            <div>  <Section user_id={this.state.user_id} box_type="Teams" passList={this.passList.bind(this)}/>
                                    <Section user_id={this.state.user_id} box_type="Projects" passList={this.passList.bind(this)}/></div>
                            )}/>
                        <Route path="/home/activity" exact component={()=> <Activity list_heads={this.state.list_heads}/>}></Route>
                        <Route path="/home/todo" exact component={()=><Todos list_heads={this.state.list_heads} goList={this.goList.bind(this)} box_id={this.state.current_box} passList={this.passList.bind(this)}/>}/>
                        <Route path="/home/list" exact component={()=><Iteme user_id={this.state.user_id} list_id={this.state.list_id} list_head={this.state.lst_hd} box_id={this.state.current_box}/>}/>
                    </Switch>
                    </div>
                    </div>
                </Router>
                
            </div>
        )
    }
}

export default Home
