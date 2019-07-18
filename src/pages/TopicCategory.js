/**
 * Program file for each of the categories in the oral histories topic page
 * Made a const and exported it as "TopicCategory" to reference in Topic.js
 */
import React from 'react';
import './Topic.css';
import { Col, Row, Container } from 'react-bootstrap';
import selectedQuotes from '../data/selectedQuotes'

/*created TopicCategory const that references the data in selectedQuotes*/
const TopicCategory = ({match}) => {
	const quotes = selectedQuotes.map((obj, index) =>
	<div>
		<Row>
			<Col lg = {4}>
				<img id = "Topic-Image" src = {require(`../pictures/${obj.image}`)}/>
				<audio controls>
					<source src={require(`../audio/${obj.audio}`)} type="audio/mp3"/>
				</audio>
			</Col>
			<Col lg = {8}>
				<div className="Quote-Container">
					<p>{obj.quote}</p>
				</div>
			</Col>
		</Row>
	</div>
	);
	return (
		<div>
			<h2>{match.params.name}</h2>
         
				<Container>
					{quotes}
				</Container>
		</div>
	)
};

export default TopicCategory