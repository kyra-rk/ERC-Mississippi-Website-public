/**
 * Program file for the Oral Histories Person Page
 */
import React from 'react';
import Transcript from '../components/Transcript';
// import flip_card_items from '../data/flip_card_items';

const OHPerson = ({match}) => (
    <div>
      <h1>{match.params.name}</h1>
      <Transcript match={match}/>
    </div>
  )

export default OHPerson