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
    // if (this.state.personselected===true){
    //     return (<Router><Redirect to={`${this.props.match.path}/${this.state.name}`}/>                 
    //     <Route path={`${this.props.match.path}/:name`} component={OHPerson}/></Router>
    //     )
    // }
    
    var topiccat = selectedQuotes.map((obj) =>
	<Col lg={6} key={obj.name} id="topicrow">
		<Row>
			<Col lg={5}>
				<img id ="Topic-Image" src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
					{/* <audio controls>
						<source src={require(`../audio/${obj.audio}`)} type="audio/mp3"/>
					</audio> */}
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
			{/* Now not working
			<h1>{this.props.match.name}</h1> */}
				<Row className="justify-content-md-center">
					{topiccat}
			{/* <Router>
				<Switch>
				<Route exact path={`${this.props.match.path}/:name`} component={OHPerson}/>
				</Switch>
			</Router> */}
			</Row>
			</div>
        )
    }

} 


export default TopicCategory;



// const TopicCategory = ({match}) => {
// 	const quotes = selectedQuotes.map((obj) =>
// 		<Col lg={6} key={obj.name} id="topicrow">
// 			<Row>
// 				<Col lg={5}>
// 					<img id ="Topic-Image" src = {require(`../pictures/${obj.image}`)} alt={obj.name}/>
// 						{/* <audio controls>
// 							<source src={require(`../audio/${obj.audio}`)} type="audio/mp3"/>
// 						</audio> */}
// 				</Col>
// 				<Col lg={7} className="rightcolumn">
// 					<Row className="Quote-Container">
// 						<p>{obj.quotes.quote1}</p>
// 					</Row>
// 						<hr/>
// 					<Row className="Quote-Container">
// 						<p>{obj.quotes.quote2}</p>
// 					</Row>
// 					<Row id="buttonrow">
// 						{/* when i try to make the link redirect from this to the actual person's page, the whole thing just doesn't load up anymore  */}
// 						<Redirect from={`${match.url}/${obj.name}`} to={`/stories/people/${obj.name}`}>
//         					<Button variant="outline-info">See more</Button>
//       					</Redirect>
// 					</Row>
// 				</Col>
// 			</Row>
// 		</Col>
// 	);
// 	return (
// 		<div>
// 			<h1>{match.params.name}</h1>         
// 				<Row className="justify-content-md-center" >
// 					{quotes}
// 				</Row>
// 			<Router>
// 				<Switch>
// 				<Route exact path={`${match.path}/:name`} component={OHPerson}/>
// 				</Switch>
// 			</Router>
// 		</div>
// 	)
// };

// export default TopicCategory