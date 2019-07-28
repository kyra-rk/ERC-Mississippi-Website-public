/**
 * Program file for the Topic Page
 * Made a const and exported it as "Topic" to reference in OralHistories.js
 */
import React from 'react';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
//import NoMatch from './NoMatch';
import TopicCategory from './TopicCategory'
import topic_categories from '../data/topic_categories';
import { Row, Container } from 'react-bootstrap';

/*created buttons const that references the categories in topic_categories*/
const Topic = ({match}) => {
  const buttons = topic_categories.map((obj) =>
    <div>
      <Link to={`${match.url}/${obj.name}`}><Button variant="outline-info">{obj.name}</Button></Link>
    </div>
  );
  return (
    <Container>
      <h1>Topic</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <Router>
        <Row className="justify-content-md-center">{buttons}</Row>
        <Switch>
          <Route path={`${match.path}/:name`} component={TopicCategory}/>
        </Switch>
      </Router>
    </Container>
  )
}

export default Topic