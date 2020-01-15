import React, { Component } from 'react'
import { Card,List,Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './Home.css';
const gridStyle = {
    width: '33.33%',
    height:"max-content",
    textAlign: 'center',
    overflow:"hidden"
  };

class Activity extends Component {
    render() {
        console.log('actu:',this.props.list_heads);
        return (
            <div className="flexboxparent" >
                <Card className="flexbox" bordered={false} style={{textAlign:"center",fontWeight:"bolder"}} title={this.props.head}>
                    <Card.Grid  style={gridStyle}>
                        <Card type="inner" title="Message Board">
                            <div className="gapinact"><img src="https://3.basecamp.com/assets/icons/content_types/outlined/message-bg-3362b580bdf21b3b47eed9b7ca9de3c3e279e52a9627bc1646b843442cdacea5.svg"></img>
                            <p>Post announcements, pitch ideas, progress updates, etc. and keep feedback on-topic.</p></div>
                            </Card>
                        </Card.Grid>



                    <Card.Grid style={gridStyle}>
                        <Link to="/home/todo">
                        <Card type="inner" title="To-Dos">
                                <div style={{height:"200px",overflow:"hidden"}}><List
                                        dataSource={this.props.list_heads}
                                        renderItem={item => (
                                        <List.Item className="activitySmallIte">
                                            <div className="activitySmallItem">
                                                <h4>{item.list_head}</h4>
                                        {/* <p className="pinact">{item.content.map((v)=>(<span>{v}</span>))}</p> */}
                                            </div>
                                        </List.Item>
                                        )}
                                /></div>

                            </Card> 
                            </Link>
                    </Card.Grid>



                    <Card.Grid style={gridStyle}>
                        <Card type="inner" title="Docs & Files">
                        <div className="gapinact"><img src="https://bc3-production-assets-cdn.basecamp-static.com/assets/icons/content_types/outlined/document-bg-d01e203dbb9d4c8550c004fcc534c5e1fff6086c65864f0e81d612b49f4294a0.svg"></img>
                            <p>Share docs, files, images, and spreadsheets. Organize in folders so they’re easy to find.</p></div>   
                            </Card>
                        </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Card type="inner" title="Campfire">
                        <div className="gapinact"><img src="https://bc3-production-assets-cdn.basecamp-static.com/assets/icons/content_types/outlined/chat-bg-e2534f29e044a125769b0b5d315755dbcb5955604fac2eb2667b3d6ea622d2c5.svg"></img>
                            <p>Chat casually with the group, ask random questions, and share stuff without ceremony.</p></div>
                            </Card>
                        </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Card type="inner" title="Shedule">
                        <div className="gapinact"><img src="https://bc3-production-assets-cdn.basecamp-static.com/assets/icons/content_types/outlined/event-bg-86f8d497d3d1373900e41ad78b06e7bdb7cd3a0560b2f630521c0d28dc5644ce.svg"></img>
                            <p>Set important dates on a shared schedule. Subscribe to events in Google Cal, iCal, or Outlook.</p></div>

                            </Card>
                        </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Card type="inner" title="Automatic Check-ins">
                        <div className="gapinact"><img src="https://bc3-production-assets-cdn.basecamp-static.com/assets/icons/content_types/outlined/question-bg-22b02e57924978ed53d1c46934115df02c44feafb4e20f869f94bc23417e4b7d.svg"></img>
                            <p>Create recurring questions so you don't have to pester your team about what’s going on.</p></div>
                            </Card>
                        </Card.Grid>
                </Card>
            </div>
        )
    }
}

export default Activity
