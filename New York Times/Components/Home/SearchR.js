import React, { Component } from 'react'
import { Skeleton, List, Spin } from 'antd';
import '../Home.css'

var array = [];

class SearchR extends Component {
    state={
        files: array,
        loading:true
    }
    
//fetch list
    async getSrch(){
        array=[];
        const respons = await fetch(this.props.url);
        const jso = await respons.json();
        jso.results.forEach(Element => { 
            array.push({title:Element.title, key:Element.title});
        });
        // console.log(jso.results);
        this.addtoList();
    }
    addtoList(){
        this.setState({
            files: array
        });
        // console.log(this.state.files)
    }
    componentDidMount() {
        console.log('Search component started');
        this.getSrch();
        setTimeout(()=>{
            this.setState({
                loading: false
            })
        },2000);
    }


    render() {
        return (
            <div>
                
                {/* {
                    this.state.files.map(item => (
                        <Spin spinning={this.props.load}><Skeleton loading={this.props.load}><Card style={{ width: 500 }}><h3>{item.title}</h3></Card></Skeleton></Spin>
                    ))
                } */}
                <Spin size="large" spinning={this.state.loading}>
                <List className="mainlist"
                    size="large"
                    bordered
                    dataSource={this.state.files}
                    renderItem={item => <List.Item className="listitem"><Skeleton loading={this.state.loading}><h3 className="listitem">{item.title}</h3></Skeleton></List.Item>}
                    /></Spin>
                
            </div>
        )
    }
}

export default SearchR