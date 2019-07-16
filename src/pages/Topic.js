/**
 * Program file for the Topic Page
 * Made a const and exported it as "Topic" to reference in OralHistories.js
 */
import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NoMatch from './NoMatch';
import Health from './Health';
import Education from './Education';

export const Topic = ({match}) => (
  <div>
    <h2>Topic</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <Button variant="outline-info" href ={`${match.url}/education`}>Education</Button>
    {' '}
    <Button variant="outline-info" href = {`${match.url}/health`}>Health</Button>
    <Switch>
      <Route path={`${match.path}/education`} component={Education}/>
      <Route path={`${match.path}/health`} component={Health}/>
      <Route exact path={match.path}/>
      <Route component={NoMatch}/>
    </Switch>
</div>
)

export default Topic