import React, { Component } from 'react';
 import { Row, Dropdown, Container, Col, ButtonToolbar, Card, Button } from 'react-bootstrap';
 
 import Octicon, {Check, Plus} from '@primer/octicons-react';

 import data_general from '../data/data_general_ms.json';
import ComparisonMap from '../components/ComparisonMaps'



export const Comparison = () => (
    <div>
        <Container>
	    <Row className="justify-content-md-center">
        {/* <Col lg={4}> */}

        <Card>
  <Card.Header>Income</Card.Header>
  <Button variant="outline-primary">Variable 1</Button>
  <Button variant="outline-primary">Percent in Poverty</Button>
</Card>
<Card >
  <Card.Header>Education</Card.Header>
  <Button variant="outline-primary">Percent with a high school degree <Octicon id="testing" size="small" icon={Plus} /></Button>
  <Button variant="outline-primary">Variable 2</Button>
</Card>
                </Row>
                
                <ComparisonMap datainput = {data_general} variable ={"P_IBP_E_F"} variable2 = {"P_High_school_graduate_(includes_equivalency)_E_F"}varname = {"Poverty"} varname2 ={"High School Education"}/>}

                </Container>
    </div>

    
)
	

export default Comparison
