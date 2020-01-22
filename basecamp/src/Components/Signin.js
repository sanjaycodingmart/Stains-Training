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
        const response = await fetch('http://localhost:4001/signin?name='+this.state.name+'&password='+this.state.password);
        console.log(response);
        if(response.status===200){
            this.props.history.push({
                pathname: '/home',
                state: { user_id: 1 }
              });
        }else{
            alert('Failed to SIGN IN');
        }
    }
    render() {
        return (
            <div className="signinContainerFirst">
                <div className="signinContainerSecond">
                    <img className="signinLogo" src="https://launchpad-asset2.37signals.com/assets/brand-wrapper-backgrounds/paperclip-logo-349bf403c234be9d67457f2825054e138f6d54affe467717f3da909cab741cba.svg" alt="logo"></img>
                    <div className="centerBoxsignin">
                        <Input placeholder="Basic usage" onChange={this.onchangename} id="name"/>
                        <Input.Password placeholder="input password" onChange={this.onchangename} id="password"/>
                        <Button type="primary" onClick={this.signin.bind(this)}>Sign In</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin
