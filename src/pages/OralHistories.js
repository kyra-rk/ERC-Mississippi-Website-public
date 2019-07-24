/**
 * Program file for the Oral Histories Page
 * Used navbar and Router to make buttons that link to subpages of people vs. topics categorization
 */

import React from 'react';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Topic from './Topic'
import Story from './Story'
import NoMatch from './NoMatch'

/**
 * match.path keeps oralhistories in url but allows to add topic or story
 * {' '} creates space between buttons
 * Not super sure what <Route exact path={match.path}/> does but if i delete it, it seems fine
 * Created a nomatch page
 */  
export const Categories = ({ match }) => (
  <div>
    <h1>Oral Histories</h1>
    <Link to ={`${match.url}/story`}><Button variant="outline-info">By People/Narrative</Button></Link>
    {' '}
    <Link to ={`${match.url}/topic`}><Button variant="outline-info">By Topic</Button></Link>
    <Switch>
      <Route path={`${match.path}/topic`} component={Topic}/>
      <Route path={`${match.path}/story`} component={Story}/>
      <Route exact path={match.path}/>
      <Route component={NoMatch}/>
    </Switch>
  </div>
)
  
  
export default Categories
