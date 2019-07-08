/**
 * Program file for the Oral Histories Page
 * Used several divs for each side of the card, see oralhistories.css
 * Data for flip card is in data file
 * NEED TO ADD ICONS BELOW SEE MORE BUTTON
 */
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './OralHistories.css';
import flip_card_items from '../data/flip_card_items'

/*Calling the CreateNavBar const that is the const lower down*/
const FlipCard = () => {
    return <CreateFlipCard />
}
/*sr-only is for screenreaders, i.e. accessibility*/
const CreateFlipCard = () => {
    const flipcards = flip_card_items.map((obj, index) =>
        <Col lg={3}>  
            <div className = "card-container">
                <div className="card-flip">
                    <div className="card front">
                        <img src = {require('./person.png')}/>
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
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </Col>);
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                {flipcards}
            </Row>
        </Container>
    )
};

export default FlipCard;