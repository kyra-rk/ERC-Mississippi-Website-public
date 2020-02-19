/*Entry point for the app*/
import React, { Component } from 'react';
// import './styling/App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'

import { Switch, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DataPortal from './pages/DataPortal'
import DropdownBootstrap from './components/DropdownBootstrap'
import Stories from './pages/Stories'
import EconIndex from './pages/EconIndex'
import NavBar from './components/NavBar'
import NoMatch from './pages/NoMatch'
import Methodology from './pages/Methodology'
import Contact from './pages/Contact'
import Comparison from './pages/Comparison'
import { Nav } from 'react-bootstrap';
// import DropdownBootstrap from './components/DropdownBootstrap'


/*made home link be exact path "/" , any non matching url goes to nomatch page*/

class App extends Component {
  render() {
    return (
        <Router>
        <div className="App">
        <NavBar />
          <Switch>
            <Route exact path="/" component={Home}/>
           <Route path="/dataportal" component={DropdownBootstrap}/>
          <Route path="/comparison" component={Comparison}/>
            <Route path="/indexinfo" component={EconIndex}/>
            <Route path="/stories" component={Stories}/>
            <Route path="/methodology" component={Methodology}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route component={NoMatch}/>
          </Switch>
                </div>
                </Router>

    );
  }
}

export default App;

