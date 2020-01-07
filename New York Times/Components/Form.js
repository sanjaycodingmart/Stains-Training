import React, { Component, Fragment } from 'react';

class Form extends Component {
    
    state = {
            username:'',
            password:'',
            email:'',
            contact:'',
            language:'English'
    }

    onUserNameChange= (event)=> {
        this.setState({
            username: event.target.value
        })
    }
    onemailChange= (event)=> {
        this.setState({
            email: event.target.value
        })
    }
    oncontactChange= (event)=> {
        this.setState({
            contact: event.target.value
        })
    }
    ondropChange = (event) =>{
        this.setState({
            language: event.target.value
        })
    } 
    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }


    onsubmit = event => {

        const a = this.state;
        console.log(a.password.length);
        if(a.password.length < 6 || a.username.length < 5 || a.email.length < 5 || a.contact.length < 10){
            alert("Error!!!!!   Failed To SIGNIN");
        }else{
            // alert(`${this.state.username} ${this.state.language} ${this.state.contact} ${this.state.email} ${this.state.password}`);
            var arr = JSON.parse(localStorage.getItem('users'));
            if(!arr){
                arr = [];
            }
            arr.push({name:this.state.username, email:this.state.email ,contact:this.state.contact ,language:this.state.language ,password:this.state.password});
            
            localStorage.setItem("users",JSON.stringify(arr));
            console.log('Saved successfully');


            alert(localStorage.getItem("users"));
        }  
    }



    render() {
        const styles = {
            form: {
                display: this.props.visible,
            }
        }

        return (
            <Fragment> 
                <form onSubmit={this.onsubmit} className="formsignup" style={styles.form}>

                    <div>
                    <label>UserName : </label>
                    <input type="text" value={this.state.username} onChange={this.onUserNameChange}></input>
                    </div>

                    <div>
                    <label>Email : </label>
                    <input type="email" value={this.state.email} onChange={this.onemailChange}></input>
                    </div>

                    <div>
                    <label>Contact : </label>
                    <input type="number" value={this.state.contact} onChange={this.oncontactChange}></input>
                    </div>

                    <div>
                    <label>Language : </label>
                    <select onChange={this.ondropChange}>
                        <option value="English">English</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Hindi">Hindi</option>
                    </select></div>

                    <div>
                    <label>Password : </label>
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange}></input>
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
            </Fragment>
           
        )
    }
}

export default Form;