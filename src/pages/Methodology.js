/**
 * Program file for the Methodology Page
 * Made a const and exported it as "Methodology" to reference in App.js
 */
import React from 'react';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import NoMatch from './NoMatch'
import DataPortalMethod from './DataPortalMethod'
import OralHistMethod from './OralHistMethod';
import EconIndexMethod from './EconIndexMethod';
import '../styling/Methodology.css'

export const Methodology = ({match}) => (
	  <div className="screenwidth">
		<div className="method">
	    <h1>Methodology</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
		<Router>
		<Row className="justify-content-center methodbuttons">
		<Button className="methodbutton bottom-padding" as={Link} to= {`${match.url}/oralhistories`} style={{backgroundColor: "teal", borderColor: "teal"}}>Stories/Oral Histories</Button>
		<Button className="methodbutton bottom-padding" as={Link} to={`${match.url}/dataportal`} style={{backgroundColor: "teal", borderColor: "teal"}}>Data Portal</Button>
		{' '}
		<Button className="methodbutton bottom-padding" as={Link} to= {`${match.url}/index`} style={{backgroundColor: "teal", borderColor: "teal"}}>Economic Security Index</Button>
		{' '}
		</Row>
		<Switch>
			<Route path={`${match.url}/dataportal`} component={DataPortalMethod}/>
			<Route path={`${match.url}/index`} component={EconIndexMethod}/>
			<Route path={`${match.url}/oralhistories`} component={OralHistMethod}/>
			<Route exact path={match.path}/>
			<Route component={NoMatch}/>
		</Switch>
		</Router>				
		</div>
	  </div>
	)

export default Methodology