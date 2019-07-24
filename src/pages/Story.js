/**
 * Program file for the Oral Histories Page
 * Used several divs for each side of the card, see oralhistories.css
 * Data for flip card is in data file
 * NEED TO ADD ICONS BELOW SEE MORE BUTTON
 */
import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom';
import '../styling/FlipCard.css';
import flip_card_items from '../data/flip_card_items'
import OHPerson from './OHPerson'

/*sr-only is for screenreaders, i.e. accessibility*/
const Story = ({match}) => {
    const flipcards = flip_card_items.map((obj) =>
        <Col lg={4}>  
            <div className = "card-container">
                <div className="card-flip">
                    <div className="card front">
                        <img src = {require('../pictures/person.png')}/>
                        <div className= "card-text">   
                            <h4>{obj.name}</h4>
                        </div>
                    </div>
                    <div className="card back">
                        <div className= "card-header">
                            <h4>{obj.name}</h4>
                        </div>
                        <div className="card block">
                            <h4 className="card-title">Bio</h4>
                        <div className="card-text">
                            <p>{obj.bio}</p>
                        </div>
                            <Link to={`${match.url}/${obj.name}`}><Button variant="outline-info">See more</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Col>);
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                {flipcards}
            <Switch>
                <Route strict path={`${match.path}/:name`} component={OHPerson}/>
            </Switch>
            </Row>
        </Container>
    )
};

export default Story;