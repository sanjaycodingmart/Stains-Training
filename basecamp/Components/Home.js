import React, { Component } from 'react'
import Section from './Home/Section'
import Activity from './Home/Activity';
import Todos from './Home/Todos'


class Home extends Component {

    state={
        teams:[{heading:'nohead',content:'nodata'}],
        projects:[{heading:'nohead',content:'nodata'}]
    }

    async abc(){
        const response = await fetch('http://localhost:4000/home/teams');
        const json = await response.json();
        this.setState({
            teams:json
        })
    }
    async abcd(){
        const response = await fetch('http://localhost:4000/home/projects');
        const json = await response.json();
        this.setState({
            projects:json
        })
    }
    componentDidMount(){
        this.abc();
        this.abcd();
    }
    
    render() {
        return (
            <div>
                {/* <Section head="Teams" array={this.state.teams}/> */}
                {/* <Section head="Projects" array={this.state.projects}/> */}
                {/* <Activity/> */}
                <Todos/>
            </div>
        )
    }
}

export default Home
