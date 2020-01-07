import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Lists from './Home/List';
import Books from './Home/Books';
import SearchR from './Home/SearchR';

import { Input } from 'antd';

const api = '9v8bhKhg9H1LAtUsWf7LQUPAY9NhTtFK';
var final='hello';

const { Search } = Input;


class Home extends Component {


    //om change input box
    onSearchChange = event => {
        final = event.target.value;
        console.log(final);
    }

    
    state = {
        search_value:'Hardcover Nonfiction',
        surl:'',
        loading:false
    }
        
    //calling books page
    abc = (code)=>{
        console.log(code);
        this.setState({
            search_value:code
        });
    }
   
    //changing url when search
    settt(){
        var strng = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title="+final+"&api-key="+api;
        // console.log(strng);
        this.setState({
            surl:strng,
            loading:true
        });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 5000);
        console.log(this.state.surl);
    }

    render() {
        return (
            <div>
                <Router>
                <header className="header">
                    <h2>New York Times</h2>
                    <Link to="/home/search"><Search onChange={this.onSearchChange} placeholder="Books Titles" onSearch={this.settt.bind(this)} enterButton /></Link>
                </header>
                
                
                    <main>
                    <Switch>
                        <Route path="/home/" exact component={() => <Lists fncn={this.abc}/>}/>
                        <Route path="/home/aa" exact component={()=> <Books search={this.state.search_value}/>}/>
                        <Route path="/home/search" exact component={()=> <SearchR url={this.state.surl} load={this.state.loading}/>}/>
                    </Switch>
                    </main>
                </Router>
               
            </div>
        )
    }
}

export default Home