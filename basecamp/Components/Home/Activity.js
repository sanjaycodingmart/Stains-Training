import React, { Component } from 'react'
import { Card } from 'antd'

class Activity extends Component {
    render() {
        return (
            <div>
                 <Card title="Card title">
                    <p>Group title</p>
                    
                    <Card type="inner" title="Message Board" extra={<a href="#">More</a>}>
                    Inner Card content
                    </Card>
                    
                    <Card type="inner" title="To-Dos" extra={<a href="#">More</a>}>
                    Inner Card content
                    </Card> 

                    <Card type="inner" title="Docs & Files" extra={<a href="#">More</a>}>
                    Inner Card content
                    </Card> <Card type="inner" title="Campfire" extra={<a href="#">More</a>}>
                    Inner Card content
                    </Card> <Card type="inner" title="Shedule" extra={<a href="#">More</a>}>
                    Inner Card content
                    </Card> <Card type="inner" title="Automatic Check-ins" extra={<a href="#">More</a>}>
                    Inner Card content
                    </Card>    
                </Card>
            </div>
        )
    }
}

export default Activity
