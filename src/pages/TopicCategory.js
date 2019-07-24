/**
 * Program file for each of the categories in the oral histories topic page
 * Made a const and exported it as "TopicCategory" to reference in Topic.js
 */
import React from 'react';
import '../styling/Topic.css';
import { Col, Row, Container } from 'react-bootstrap';
import selectedQuotes from '../data/selectedQuotes'

/*created TopicCategory const that references the data in selectedQuotes*/
const TopicCategory = ({match}) => {
	const quotes = selectedQuotes.map((obj) =>
		<Col lg={6}>
			<img id = "Topic-Image" src = {require(`../pictures/${obj.image}`)}/>
				<audio controls>
					<source src={require(`../audio/${obj.audio}`)} type="audio/mp3"/>
				</audio>
			<div className="Quote-Container">
				<p>{obj.quotes.quote1}</p>
			</div>
			<hr/>
			<div className="Quote-Container">
				<p>{obj.quotes.quote2}</p>
			</div>
		</Col>
	);
	return (
		<Container>
			<h2>{match.params.name}</h2>
				<Row className="justify-content-md-center">
					{quotes}
				</Row>
		</Container>
	)
};

export default TopicCategory