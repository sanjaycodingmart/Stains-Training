import React, { Component } from 'react'
import { Spin } from 'antd'

const api = '9v8bhKhg9H1LAtUsWf7LQUPAY9NhTtFK';
var arr =[];

class Books extends Component {

    state = {
        search_key:this.props.search,
        images:arr,
        loading: true
    }

    async getDetails(){
        const Search_url = 'https://api.nytimes.com/svc/books/v3/lists/current/'+this.props.search+'.json?api-key='+api;
        const response = await fetch(Search_url);
        const json = await response.json();
        
        arr=[];
        json.results.books.forEach(Element => { 
            arr.push(Element.book_image);
        });
        console.log(arr);
        this.btn();
    }
    btn = () => {
        this.setState({
            images: arr
        });
        
    }
    componentDidMount() {
        this.getDetails();
        setTimeout(()=>{
            this.setState({loading:false})
        },2000)
    }

    render() {
        return (
            <div>
                <h1 className="hdng">{this.props.search}</h1>
                <Spin size="large" spinning={this.state.loading}><div className="images">
                {
                    this.state.images.map(item => (
                        <img className="image" src={item}></img>
                    ))
                }</div></Spin>
            </div>
        )
    }
}

export default Books
