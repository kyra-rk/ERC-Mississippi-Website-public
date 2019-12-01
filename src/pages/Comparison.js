 import React, { Component } from 'react';
 import { Row, Dropdown, Container, Col } from 'react-bootstrap';
 
 import Octicon, {Check} from '@primer/octicons-react';

 import data_general from '../data/data_general_ms.json';
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
                <ComparisonMap datainput = {data_general} variable ={"P_IBP_E_F"} variable2 = {"P_High_school_graduate_(includes_equivalency)_E_F"}varname = {"Poverty"} varname2 ={"High School Education"}/>}

    </Container>
    </div>

    
)
	

export default Comparison

