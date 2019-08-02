/**
 * Program file for the Oral Histories Person Page
 */
import React from 'react';
import Transcript from '../components/Transcript';
import person from '../pictures/person.png';
import { Row, Col } from 'react-bootstrap';
// import flip_card_items from '../data/flip_card_items';
import '../styling/Transcript.css';

const OHPerson = ({match}) => (
    <div>
      <Row className="ohpersonrow">
        <Col lg={2}>
          <img src = {person} alt="transcriptpic" id ="transcriptpic"/>
        </Col>
        <Col lg={10}>
          <h1>Kandy Nickles</h1>
          <p id="personbio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>        
        </Col>
      </Row>
      <Transcript match={match}/>
    </div>
  )

export default OHPerson