/**
 * Formatting topic button
 * Data for topic buttons in data folder
 */

import React from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NoMatch from '../pages/NoMatch';
import Health from '../pages/Health';
import topic_categories from '../data/topic_categories';
import { Row, Col, Container } from 'react-bootstrap';

/*Calling the CreateNavBar const that is the const lower down*/
const TopicButton = () => {
    return <CreateTopicButton />
}
/*sr-only is for screenreaders, i.e. accessibility*/
const CreateTopicButton = () => {
    const button = topic_categories.map((obj, match) =>
    <div>
    <Button variant="outline-info" href ={`${match.url}/${obj.name}`}>{obj.name}</Button>
    {' '}
    
    </div>
    );

const TopicLinks = (obj, {match}) => (
  <div>
    <Switch>
        <Route path={`${match.path}/${obj.name}`} component={Health}/>
        <Route exact path={match.path}/>
        <Route component={NoMatch}/>
    </Switch>
</div>
)

    
    return (
        <Row className="justify-content-md-center">
            {button}
            {TopicLinks}
        </Row>
    )
};

export default TopicButton;
