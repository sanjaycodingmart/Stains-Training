import React, { Component } from 'react'
import { Input, Button } from 'antd'

class Signin extends Component {

    state={
        name:'',
        password:''
    }


    onchangename=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    }


    async signin(){
        console.log(this.state);
        const response = await fetch('http://localhost:4000/signin?name='+this.state.name+'&password='+this.state.password);
        if(response.status===200){
            this.props.history.push('/home');
        }else{
            alert('Failed to SIGN IN');
        }
    }
    render() {
        return (
            <div>
                <Input placeholder="Basic usage" onChange={this.onchangename} id="name"/>
                <Input.Password placeholder="input password" onChange={this.onchangename} id="password"/>
                <Button type="primary" onClick={this.signin.bind(this)}>Sign In</Button>
            </div>
        )
    }
}

export default Signin
