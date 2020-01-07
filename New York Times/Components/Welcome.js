import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Forme from './Form';
import './Welcome.css';

import { Icon, Input, Button, Card } from 'antd';
import "antd/dist/antd.css";

class Welcome extends Component {

    state = {
        display: 'none',
        username:'',password:''}

    onUserNameChange= (event)=> {
        this.setState({
            username: event.target.value
        })
        console.log(this.state.username);
    }
    onPasswordChange= (event)=> {
        this.setState({
            password: event.target.value
        })
        console.log(this.state.password);
    }
    signin = () => {
        var arr = JSON.parse(localStorage.getItem('users'));
        arr.forEach(element => {
            if(element.name === this.state.username && element.password === this.state.password){
                this.props.history.push('/home'); 
            }

        });
      
    }
   
    signup = () => this.setState({display: 'flex'});
    render() {
        const display = this.state.display;
        return (
            <div className="welcomeScreen">
                <h1>New York Times</h1>
                <h2>Welcome!!</h2>

                <div>
                    <Card title="User LogIn" bordered={true} style={{ width: 300 }}>
                    <form className="formsignin">
                        <div>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="user" type="text" onChange={this.onUserNameChange} placeholder="User Name"></Input>
                        </div>
                        <div>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onChange={this.onPasswordChange} placeholder="Password"></Input>
                        </div>
                        

                    </form>
                    </Card>
                </div>

                <div className="buttons_sign">
                    <Button type="primary" className="signin" onClick={this.signin}>Sign In</Button>
                    <Button className="signinbutton" onClick={this.signup}>New User?</Button>
                </div>
                <Forme visible = {display}/>
            </div>
        )
    }
}

export default Welcome
