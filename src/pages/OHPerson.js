/**
 * Program file for the Oral Histories Person Page
 */
import React from 'react';
import { Row, Col, Container, Button} from 'react-bootstrap';
import Transcript from '../components/Transcript';

const OHPerson = ({match}) => (
    <div>
      <h1>{match.params.name}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <Transcript match={match}/>
    </div>
  )

export default OHPerson