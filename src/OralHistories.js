import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Topic from './Topic'
import Story from './Story'

export const Category = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )
  
  
  export const Categories = ({ match }) => (
    <div>
      <h1>Oral History</h1>
      <button type="button" class="btn btn-outline-info"><Link to={`${match.url}/story`}>People/Story</Link></button>
      &nbsp;
      <button type="button" class="btn btn-outline-info"><Link to={`${match.url}/topic`}>By Topic</Link></button>
  
      <Route path={`${match.path}/Topic`} component={Topic}/>
      <Route path={`${match.path}/Story`} component={Story}/>
      <Route exact path={match.path} />
    </div>
  )
  
  
export default Categories
