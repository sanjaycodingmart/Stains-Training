import React, { Component } from 'react'
import { List } from 'antd'



class item extends Component {
    state={
        items:[]
    }
//////



//////

    async getItems(){
        const response = await fetch(`http://localhost:4001/todo/getItem?list_id=${this.props.list_id}`);
        const json = await response.json();
        this.setState({
            items:json.rows
        });
    }
    componentDidMount(){
        this.getItems();
    }

    render() {
        console.log(this.state.items)
        return (
            <div>
                <List
                        size="small"
                        dataSource={this.state.items}
                        renderItem={item => (
                        <List.Item> 
                        <span>{item.item_head}</span>
                        </List.Item>
                        )}
                        />
                        

            </div>
        )
    }
}

export default item
