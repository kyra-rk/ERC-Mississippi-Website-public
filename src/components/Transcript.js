import React from 'react';
import { Row, Col, Button} from 'react-bootstrap';
import OHPersonData from '../data/OHPersonData';
import '../styling/transcript.css';
import topic_categories from '../data/topic_categories';

const Transcript = () => {
  const buttons = topic_categories.map((obj) =>
    <div>
      <Button variant="outline-info">{obj.name}</Button>
    </div>
  ); 
  const name= OHPersonData.map((obj) =>
    <Row>
      <Col lg={2}>
        <h2>{obj.speaker}</h2>
      </Col>
      <Col lg={10}>
        <div className={`import${obj.important}`}><p >{obj.text}</p></div>
      </Col>
    </Row>
    );
    
    return (
      <div>
        <Row className="justify-content-md-center">{buttons}</Row>
        {name}
      </div>
    )
  }

export default Transcript