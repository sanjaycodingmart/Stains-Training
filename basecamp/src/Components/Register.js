import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';

class Register extends Component {
    state = {
        name:'',
        password:''
    }

    onchangename=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    async register(name,pass){
        if(name.length>5 && pass.length>=4){
            const response = await fetch('http://localhost:4001/register?name='+name+'&password='+pass);
            const json = await response.text();
            console.log(json);

            this.props.history.push({
                pathname: '/home',
                state: { user_id: 1 }//changeeee
              });
        }else{
            alert('not valid');
        }
        
    }
    onsubmit = ()=>{
        let name=this.state.name;
        let password = this.state.password;
        this.register(name,password);
    }
    
    render() {
        return (
            <div className="regDiv">
                
                <div className="regDiv1">
                <img className="signinLogo" src="https://launchpad-asset2.37signals.com/assets/brand-wrapper-backgrounds/paperclip-logo-349bf403c234be9d67457f2825054e138f6d54affe467717f3da909cab741cba.svg" alt="logo"></img>
                <Form onSubmit={this.onsubmit}>
                    <Input placeholder="Basic usage" onChange={this.onchangename} id="name"/>
                    <Input.Password placeholder="input password" onChange={this.onchangename} id="password"/>
                    <Button type="primary" onClick={this.onsubmit}>Sign Up</Button>
                </Form>
            </div></div>
        )
    }
}

export default Register
