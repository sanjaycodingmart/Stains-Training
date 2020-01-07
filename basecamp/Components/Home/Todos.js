import React, { Component } from 'react'
import { Card, Button, List, Avatar } from 'antd';

class Todos extends Component {
    state={
        json:[{id: 1, heading: "null", content: ['null'], cont_stat: ['null']}]
    }
    async fetch_todo(){
        const response = await fetch('http://localhost:4000/home/todo');
        const json = await response.json();
        // console.log(json);
        this.setState({
            json:json
        })
    }
    render() {
        const obj = this.state.json[0];
        console.log(obj)
        return (
            <div>
                <Button>New List</Button>
                <Card title="To-Dos">
                    {
                        this.state.json.map((ele)=>(
                            <div>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={ele.content}
                                            header={<h2>{ele.heading}</h2>}
                                            renderItem={item => (
                                            <List.Item
                                                // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                                            >
                                                <List.Item.Meta
                                                    avatar={
                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    }
                                                    title={item}
                                                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                />
                                            </List.Item>
                                            )}
                                        />
                                        <Button onClick={this.fetch_todo.bind(this)}>Add a to-do</Button>
                                    </div>
                        ))
                    }
                    
                </Card>
            </div>
        )
    }
}

export default Todos
