import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card, List, Spin } from 'antd';


const api = '9v8bhKhg9H1LAtUsWf7LQUPAY9NhTtFK';
const list_url = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key='+api;
var arr =[];



class Lists extends Component {
    state = {
        arr: arr,
        loading: true
    }
//fetch list
    async getList(){
        arr=[];
        const respons = await fetch(list_url);
        const jso = await respons.json();
        console.log(jso.results);
        jso.results.forEach(Element => { 
            arr.push({name:Element.display_name, code:Element.list_name_encoded, key:Element.list_name_encoded});
        });
        this.addList();
    }
    addList(){
        this.setState({
            arr: arr
        });
    }
    componentDidMount() {
        this.getList();
        setTimeout(()=>{
            this.setState({
                loading: false
            })
        },2000);
    }
    eventClick(code){
        this.props.fncn(code)
    }


    render() {
        return (
            <div>
                {/* {
                    this.state.arr.map(item => (
                        <Link to="/home/aa" key={item.code}>
                        <Card style={{ width: 500 }}><h3 onClick={()=>this.eventClick(item.code)}>{item.name}</h3></Card></Link>
                    ))
                } */}
                <Spin size="large" spinning={this.state.loading}>
                <List className="mainlist"
                    size="large"
                    bordered
                    dataSource={this.state.arr}
                    renderItem={item => <List.Item className="listitem"><Link to="/home/aa" key={item.code}><h3 onClick={()=>this.eventClick(item.code)}>{item.name}</h3></Link></List.Item>}
                    /></Spin>
            </div>
        )
    }
}

export default Lists
