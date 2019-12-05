/**
 * Program file for each of the categories in the oral histories topic page
 * Made a const and exported it as "TopicCategory" to reference in Topic.js
 */
import React, {Component} from 'react';
import '../styling/Topic.css';
import { Col, Row, Button } from 'react-bootstrap';
import selectedQuotes from '../data/selectedQuotes';
import {BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom';
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
    render (){
    var topiccat = selectedQuotes.map((obj) =>
	<Col lg={6} key={obj.name}>
		<Row id="personblock">
			<Col lg={4}>
				<Row className="initial">
					{obj.initials}
				</Row>
				<Row id="fullname">
					{obj.fullname}
				</Row>
			</Col>
			<Col lg={8} className="rightcolumn">
				<Row className="Quote-Container">
					<p>{obj.quotes.quote1}</p>
				</Row>
					<hr/>
				<Row className="Quote-Container">
					<p>{obj.quotes.quote2}</p>
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
			<h1>{this.props.match.params.name}</h1>
				<Row className="justify-content-md-center">
					{topiccat}
				</Row>
			</div>
        )
    }

} 


export default TopicCategory;