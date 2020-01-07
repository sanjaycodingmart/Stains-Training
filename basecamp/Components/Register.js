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
        const response = await fetch('http://localhost:4000/register?name='+name+'&password='+pass);
        const json = await response.text();
        console.log(json);
    }
    onsubmit = ()=>{
        let name=this.state.name;
        let password = this.state.password;
        this.register(name,password);
    }
    
    render() {
        return (
            <div>
                <Form onSubmit={this.onsubmit}>
                    <Input placeholder="Basic usage" onChange={this.onchangename} id="name"/>
                    <Input.Password placeholder="input password" onChange={this.onchangename} id="password"/>
                    <Link to="/home"><Button type="primary" onClick={this.onsubmit}>Sign Up</Button></Link>
                </Form>
            </div>
        )
    }
}

export default Register
