/**
 * Program file for the Oral Histories Page
 * Used several divs for each side of the card, see oralhistories.css
 * Data for flip card is in data file
 * NEED TO ADD ICONS BELOW SEE MORE BUTTON
 */
import React, {Component} from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch, Link, Redirect} from 'react-router-dom';
import '../styling/FlipCard.css';
import flip_card_items from '../data/flip_card_items'
import OHPerson from './OHPerson'
import Transcript from '../components/Transcript';

/*sr-only is for screenreaders, i.e. accessibility*/

class Story extends Component {
    constructor(props){  
        super(props);
        this.state ={
            personselected: false,
            name: ''
        } 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.setState({name: event.target.value, personselected: true});
    }

    render (){
    if (this.state.personselected===true){
        return (<Router><Redirect to={`${this.props.match.path}/${this.state.name}`}/>                 
        <Route path={`${this.props.match.path}/:name`} component={OHPerson}/></Router>
        )
    }
    
    var flipcards = flip_card_items.map((obj) =>
        <Col lg={4}>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
                        <h3>{obj.name}</h3>
                    </div>
                    <div class="flip-card-back">
                        <h4>{obj.name}</h4> 
                        <p>{obj.bio}</p>
                        <Button variant="outline-info" onClick={this.handleClick} value={obj.name}>See more</Button>
                    </div>
                </div>
            </div>
        </Col>);

        return (
        <Container>
            <Row className="justify-content-md-center">
                {flipcards}
            <Router>
                <Switch>
                <Route exact path={`${this.props.match.path}/:name`} component={OHPerson}/>
                </Switch>
            </Router>
            </Row>
        </Container>
        )
    }

} 


export default Story;