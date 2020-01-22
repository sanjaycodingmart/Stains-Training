import React, { Component } from 'react'
import Subscr from './subscr'
import { List, Input } from 'antd'

class iteme extends Component {
    state={
        items:[],
        newItem:'',
        user_id:1,
        list_id:0
    }

    async getItems(){
        const response = await fetch(`http://localhost:4001/todo/getItem?list_id=${this.props.list_id}`);
        const json = await response.json();
        this.setState({
            items:json.rows
        });
    }
    componentDidMount(){
        this.getItems().then(data=>{
            if(data[0]!=undefined){
                this.setState({list_id:data[0].list_id});
            }else{
                this.setState({list_id:1})
            }
        })
    }

    async addvalue(){
        console.log('addding:',this.state.newItem);
        const response = await fetch(`http://localhost:4001/item/addvalue?list_id=${this.props.list_id}&item_head=${this.state.newItem}`);
        const json = await response.json();
        console.log('gooooooooot',json)
        this.getItems();
        return json.item_id
    }
    handleChange(e){
        this.setState({
            newItem:e.target.value
        })
    }

    componentDidMount(){
        this.setState({
            user_id:this.props.user_id,
        })
    }


    render() {
        return (
            <div>
                <h1>{this.props.list_head}</h1>
                <List
                        size="small"
                        dataSource={this.state.items}
                        renderItem={item => (
                        <List.Item> 
                            <span>{item.item_head}</span>
                            
                        </List.Item>
                        )}
                        />
                <Input onChange={this.handleChange.bind(this)}/>
                <Subscr box_id={this.props.box_id} addvalue={this.addvalue.bind(this)} user_id={this.props.user_id} list_id={this.props.list_id} refresh={this.getItems.bind(this)}/>
            </div>
        )
    }
}

export default iteme
