/*Entry point for the app*/
import React, { Component } from 'react';
import './styling/App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DataPortal from './pages/DataPortal'
import DropdownBootstrap from './components/DropdownBootstrap'
import OralHistories from './pages/OralHistories'
import EconIndex from './pages/EconIndex'
import NavBar from './components/NavBar'
import NoMatch from './pages/NoMatch'
// import DropdownBootstrap from './components/DropdownBootstrap'


/*made home link be exact path "/" and switch makes it so that a new program file is being rendered (removing old file)*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/dataportal" component={DataPortal}/>
          {/* <Route path="/dropdown" component={DropdownBootstrap}/> */}
          <Route path="/index" component={EconIndex}/>
          <Route path="/oralhistories" component={OralHistories}/>
          <Route path="/about" component={About}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;

