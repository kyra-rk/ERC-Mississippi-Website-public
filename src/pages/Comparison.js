 import React, { Component } from 'react';
 import { Row, Dropdown, Container, Col } from 'react-bootstrap';
 
 import Octicon, {Check} from '@primer/octicons-react';

 import data_general from '../data/datacomplete.json';
import '../styling/App.css';
import ComparisonMap from '../components/ComparisonMaps'



export const Comparison = () => (
    <div>
        <Container>
	    <Row className="justify-content-md-center">
        <Col lg={4}>
                 
                 <Dropdown.Menu show>
                   <Dropdown.Header>Income</Dropdown.Header>
                   <Dropdown.Item>Variable 1</Dropdown.Item>
                   <Dropdown.Item>Percent in Poverty <Octicon id="testing" icon={Check} /> </Dropdown.Item>
                 </Dropdown.Menu>
                 </Col>
                 <Col lg={4} > 
                 <Dropdown.Menu show>
                    <Dropdown.Header>Education 
</Dropdown.Header>
                    <Dropdown.Item>Percent with a high school degree<Octicon id="testing" icon={Check} /> </Dropdown.Item>
                    <Dropdown.Item>Variable 2     </Dropdown.Item>
                  </Dropdown.Menu>
                  </Col>
             
                </Row>
                <ComparisonMap datainput = {data_general} variable ={"P_Female_IBP"} variable2 = {"P_Female_Less_than_high_school_diploma"}varname = {"Poverty"} varname2 ={"High School Education"}/>}

    </Container>
    </div>

    
)
	

export default Comparison

