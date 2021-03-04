/**
 * Program file for each of the categories in the oral histories topic page
 * Made a const and exported it as "TopicCategory" to reference in Topic.js
 */
import React, {Component} from 'react';
import '../styling/Topic.css';
import { Col, Row, Button } from 'react-bootstrap';
import selectedQuotes from '../data/selectedQuotes';
import {BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import OHPerson from './OHPerson'

/*created TopicCategory const that references the data in selectedQuotes*/
class TopicCategory extends Component {
    constructor(props){  
        super(props);
        this.state ={
            personselected: false,
            name: ''
        } 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
		this.setState({name: event.target.value, personselected: true}, this.props.redirectperson(event.target.value));
	}
	
//redirect gets rid of flipcard component but doesnt seem to work when just typing out url
//{obj[topic].quote1} (and for quote 2) is named this way because of the way the quotes are organized in the selectedQuotes.js file
//One person is a column that takes up half the page, then within that person, there is one row which is composed of two column--the left column contains two rows which are for the name and initial, and the right column contains two rows for the two quotes
    render (){
	var topic = this.props.match.params.name;
    var topiccat = selectedQuotes.map((obj) => 
	<Col md={6} lg={4} key={obj.name}>
		<Row id="personblock">
			<Col lg={3}>
				<Row className="initial">
					{obj.initials}
				</Row>
				<Row id="fullname">
					{obj.fullname}
				</Row>
			</Col>
			<Col lg={{span: 8, offset: 1}} className="rightcolumn">
				<Row className="Quote-Container">
					<p>{obj[topic].quote1}</p>
				</Row>
					<hr/>
				<Row className="Quote-Container">
					<p>{obj[topic].quote2}</p>
				</Row>
				<Row id="buttonrow">
					<Button variant="outline-info" onClick={this.handleClick} value={obj.name}>
						See more
					</Button>
				</Row>
			</Col>
		</Row>
	</Col>
	 );

        return (
			<div>
			<h1 className="topiccat">{this.props.match.params.name}</h1>
			<div className="screenwidth">

				<Row className="justify-content-md-center">
					{topiccat}
				</Row>
				</div>
			</div>
        )
    }

} 


export default withRouter(TopicCategory);