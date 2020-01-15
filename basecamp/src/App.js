import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Welcome from './Components/Welcome';
import Register from './Components/Register';
import Signin from './Components/Signin';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path="/home" component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
