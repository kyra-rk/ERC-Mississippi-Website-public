import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

export const Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )
  
  
  export const Topics = ({ match }) => (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/story`}>
            By Story
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/topic`}>
            By Topic
          </Link>
        </li>
      </ul>
  
      <Route path={`${match.path}/:topicId`} component={Topic}/>
      <Route exact path={match.path} render={() => (
        <h3>Please select.</h3>
      )}/>
    </div>
  )
  
  
export default Topics
