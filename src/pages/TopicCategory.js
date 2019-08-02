/**
 * Program file for each of the categories in the oral histories topic page
 * Made a const and exported it as "TopicCategory" to reference in Topic.js
 */
import React from 'react';
import '../styling/Topic.css';
import { Col, Row, Button } from 'react-bootstrap';
import selectedQuotes from '../data/selectedQuotes';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom';
import OHPerson from './OHPerson'

/*created TopicCategory const that references the data in selectedQuotes*/
const TopicCategory = ({match}) => {
	const quotes = selectedQuotes.map((obj) =>
		<Col lg={6} key={obj.name} id="topicrow">
			<Row>
				<Col lg={5}>
					<img id ="Topic-Image" src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
						<audio controls>
							<source src={require(`../audio/${obj.audio}`)} type="audio/mp3"/>
						</audio>
				</Col>
				<Col lg={7} className="rightcolumn">
					<Row className="Quote-Container">
						<p>{obj.quotes.quote1}</p>
					</Row>
						<hr/>
					<Row className="Quote-Container">
						<p>{obj.quotes.quote2}</p>
					</Row>
					<Row id="buttonrow">
						<Link to={`${match.url}/${obj.name}`}>
        					<Button variant="outline-info">See more</Button>
      					</Link>
					</Row>
				</Col>
			</Row>
		</Col>
	);
	return (
		<div>
			<h1>{match.params.name}</h1>         
				<Row className="justify-content-md-center" >
					{quotes}
				</Row>
			<Router>
				<Switch>
				<Route exact path={`${match.path}/:name`} component={OHPerson}/>
				</Switch>
			</Router>
		</div>
	)
};

export default TopicCategory