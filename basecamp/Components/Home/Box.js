import React, { Component } from 'react'

class Box extends Component {
    render() {
        var a=this.props.element;
        return (
            <div style={{width:"200px",height:"200px",backgroundColor:"blue"}}>
                <h1>{a.heading}</h1>
                <p>{a.content}</p>
            </div>
        )
    }
}

export default Box
