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
import DropdownBootstrap_2 from './components/DropdownBootstrap_2'
import Stories from './pages/Stories'
import EconIndex from './pages/EconIndex'
import NavBar from './components/NavBar'
import NoMatch from './pages/NoMatch'
import Methodology from './pages/Methodology'
import Contact from './pages/Contact'
import Comparison from './pages/Comparison'
import People from './pages/People'
import { Nav } from 'react-bootstrap';
import OHPerson from './pages/OHPerson';
import TopicCategory from './pages/TopicCategory'
// import DropdownBootstrap from './components/DropdownBootstrap'

const nav_bar_items = [{url: "/", name: "Home"}, 
                         //  {url: "/dataportal", name: "Data Portal"},
                           {url: "/dataportal", name: "Data Portal"},
                          //  {url: "/dataportal2", name: "Data Portal2"},
                          //  {url: "/comparison", name: "Compare Data"}, 
                           {url: "/indexinfo", name: "Index"}, 
                           {url: "/stories", name: "Stories"},
                           {url: "/methodology", name: "Methodology"},
                           {url: "/about", name: "About"}];
                          //  {url: "/contact", name: "Contact"}]; 
/*made home link be exact path "/" , any non matching url goes to nomatch page*/

class App extends Component {
  render() {
    return (
        <Router>
        <div className="App">
        <NavBar links={nav_bar_items} brand="Make Women Count"/>
          <Switch>
            <Route exact path="/" component={Home}/>
           <Route path="/dataportal" component={DropdownBootstrap}/>
           {/* <Route path="/dataportal2" component={DropdownBootstrap_2}/> */}
          {/* <Route path="/comparison" component={Comparison}/> */}
            <Route path="/indexinfo" component={EconIndex}/>
            <Route path="/stories" component={Stories}/>
            <Route path="/methodology" component={Methodology}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            {/* <Route exact path="/stories/people" component={Stories}/> */}
            <Route path="/stories/people/:name" component={OHPerson}/>
            <Route path="/stories/topic/:name" component={TopicCategory}/>

            {/* <Route path="/people/:name" component={OHPerson}/> */}
            {/* <Route path="/stories/:name" component={OHPerson}/> */}

            <Route component={NoMatch}/>
          </Switch>
                </div>
                </Router>

    );
  }
}

export default App;

