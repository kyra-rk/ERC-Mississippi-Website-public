/**
 * Entry point for the app
 * Created navbar using bootstrap and router
 * NEED TO MAKE MENU ITEMS AN ARRAY AND HAVE IT REFERENCED RATHER THAN HARD CODE
 * Playing around with some things, don't delete the comments
 */
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DataPortal from './pages/DataPortal'
import OralHistories from './pages/OralHistories'
import EconIndex from './pages/EconIndex'
import { Navbar, Button } from 'react-bootstrap'
//import Products from './pages/Variables';

/**
*sr-only is for screenreaders, i.e. accessibility
*made home link be exact path "/" and switch makes it so that a new program file is being rendered (removing old file)
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <nav class="navbar sticky-top navbar-expand-lg navbar-light navbar-custom">
          <a class="navbar-brand text-white" href="/">MS Women Count</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon navbar-inverse">
            </span>
          </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="active">
                  <a class="nav-link text-white" href="/">Home
                    <span class="sr-only">Home</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link text-white" href="/dataportal">Data Portal
                    <span class="sr-only">Data Portal</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link text-white" href="/index">Index
                    <span class="sr-only">Index</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link text-white" href="/oralhistories">Oral Histories
                    <span class="sr-only">Oral Histories</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link text-white" href="/about">About
                    <span class="sr-only">About</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/dataportal" component={DataPortal}/>
          <Route path="/index" component={EconIndex}/>
          <Route path="/oralhistories" component={OralHistories}/>
          <Route path="/about" component={About}/>
        </Switch>

      </div>
    );
  }
}

export default App;

