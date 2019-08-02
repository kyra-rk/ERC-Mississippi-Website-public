/**
 * Program file for the Oral Histories Page
 * Used several divs for each side of the card, see oralhistories.css
 * Data for flip card is in data file
 * NEED TO ADD ICONS BELOW SEE MORE BUTTON
 */
import React, {Component} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import '../styling/FlipCard.css';
import flip_card_items from '../data/flip_card_items'
import OHPerson from './OHPerson'

/*sr-only is for screenreaders, i.e. accessibility*/

class People extends Component {
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
        <Col lg={4} key={obj.name}>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
                        <h3>{obj.name}</h3>
                    </div>
                    <div className="flip-card-back">
                        <h4>{obj.name}</h4> 
                        <p>{obj.bio}</p>
                        <Button variant="outline-info" onClick={this.handleClick} value={obj.name}>
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </Col>
        );

        return (
            <Row className="justify-content-md-center">
                {flipcards}
            <Router>
                <Switch>
                <Route exact path={`${this.props.match.path}/:name`} component={OHPerson}/>
                </Switch>
            </Router>
            </Row>
        )
    }

} 


export default People;