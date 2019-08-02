/**
 * Program file for the Methodology Page
 * Made a const and exported it as "Methodology" to reference in App.js
 */
import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import NoMatch from './NoMatch'
import DataPortalMethod from './DataPortalMethod'
import OralHistMethod from './OralHistMethod';
import EconIndexMethod from './EconIndexMethod';

export const Methodology = ({match}) => (
	  <div className="screenwidth">
	    <h1>Methodology</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		<Button variant="outline-info" href ={`${match.url}/dataportal`}>Data Portal</Button>
		{' '}
		<Button variant="outline-info" href = {`${match.url}/index`}>Economic Security Index</Button>
		{' '}
		<Button variant="outline-info" href = {`${match.url}/oralhistories`}>Oral Histories</Button>
		<Router>
		<Switch>
			<Route path={`${match.url}/dataportal`} component={DataPortalMethod}/>
			<Route path={`${match.url}/index`} component={EconIndexMethod}/>
			<Route path={`${match.url}/oralhistories`} component={OralHistMethod}/>
			<Route exact path={match.path}/>
			<Route component={NoMatch}/>
		</Switch>
		</Router>	  
	  </div>
	)

export default Methodology