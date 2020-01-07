import React from 'react';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'

import './App.css';

import Welcome from './Components/Welcome'
import Home from './Components/Home'

function App() {
  return (
    <Router>
      
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/home" component={Home}/>
        </Switch>
      </div>
    </Router>

  );
}
export default App;