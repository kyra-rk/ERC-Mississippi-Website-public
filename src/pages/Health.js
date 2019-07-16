/**
 * Program file for the Health Page
 * Made a const and exported it as "About" to reference in App.js
 */
import React from 'react';
import './Topic.css';
import { Col, Row, Container } from 'react-bootstrap';
import selectedQuotes from '../data/selectedQuotes'

const Health = () => {
	return <CreateQuotes />
}

const CreateQuotes = () => {
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
			<h2>Health</h2>
				<Container>
					{quotes}
				</Container>
		</div>
	)
};

export default Health