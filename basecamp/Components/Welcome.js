import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <div>
                <Link to="/signin"><Button type="primary">Sign in</Button></Link>
                <Link to="/register"><Button type="primary">Try in FREE</Button></Link>
            </div>
        )
    }
}

export default Welcome
