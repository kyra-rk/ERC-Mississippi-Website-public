/**
 * Program file for the Oral Histories Page
 * Used navbar and Router to make buttons that link to subpages of people vs. topics categorization
 */

import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Topic from './Topic'
import Story from './Story'

/**
*&nbsp puts a space between the two buttons
*@match.path keeps oralhistories in url but allows to add topic or story
*/  
export const Categories = ({ match }) => (
  <div>
    <h1>Oral Histories</h1>
    <button type="button" class="btn btn-outline-info"><Link to={`${match.url}/story`}>By People/Story</Link></button>
    &nbsp;
    <button type="button" class="btn btn-outline-info"><Link to={`${match.url}/topic`}>By Topic</Link></button>
    <Route path={`${match.path}/Topic`} component={Topic}/>
    <Route path={`${match.path}/Story`} component={Story}/>
    <Route exact path={match.path} />
  </div>
)
  
  
export default Categories
