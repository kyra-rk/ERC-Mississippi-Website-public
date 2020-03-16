/**
 * Program file for the Oral Histories Page
 * Used several divs for each side of the card, see oralhistories.css
 * Data for flip card is in data file
 */
import React, {Component} from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
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
//redirect gets rid of flipcard component but doesnt seem to work when just typing out url
    render (){
    if (this.state.personselected===true){
        return (<Router><Redirect to={`${this.props.match.path}/${this.state.name}`}/>                 
        <Route path={`${this.props.match.path}/:name`} component={OHPerson}/></Router>
        )
    }
    
    var flipcards = flip_card_items.map((obj) =>
        <Col sm={6} md={4} key={obj.name}>
            <Card className="flipcard">
            <Card.Img variant="top" src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
            <Card.Body>
            <Card.Title>{obj.personname}</Card.Title>
            <Card.Text>
            {obj.bio}
            </Card.Text>
            <Button variant="outline-info" onClick={this.handleClick} value={obj.name} >
                            See more
                        </Button>
            </Card.Body>
            
            </Card>


            {/* <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
                        <h6>{obj.personname}</h6>
                    </div>
                    <div className="flip-card-back">
                        <h6>{obj.personname}</h6> 
                        <p>{obj.bio}</p>
                        <Button variant="outline-info" onClick={this.handleClick} value={obj.name}>
                            See more
                        </Button>
                    </div>
                </div>
            </div> */}
        </Col>
        );

        return (
            <Router>
            <Row className="justify-content-md-center">
                {flipcards}
            
                <Switch>
                <Route exact path={`${this.props.match.path}/:name`} component={OHPerson}/>
                </Switch>
                </Row>
            </Router>
            
        )
    }

} 


export default People;