/**
 * Program file for the About Page
 * Made a const and exported it as "About" to reference in App.js
 */
import React from 'react';
import '../styling/About.css';
import { Row, Col } from 'react-bootstrap';
import MLICCI from '../pictures/MLICCI.jpg';
import Report from '../pictures/Report.jpg';
import WinCLogo from '../pictures/WinCLogo.png'

{/* General comments/questions: 
	- Why do we have "export const About()" function and 
	"export default About" at the bottom?
	- Need some space/padding around icons and text when in mobile mode.
	- Consider changing the images - the quality is not too good.
	- Hand and WiC icons overlap with text, but the report does not. 
	  Maybe consider adding padding or a wrapper? Not 100% sure on this one.
	- Add ERC and Missisipi Class as contributors to the About. 
	- Need to add in missing text and content to this page. 
	- Maybe converge About and Contact to one page? 

*/}

export const About = () => (
	  <div className="screenwidth">
		<div className="about">
			<h1>About</h1>
				<Row className="aboutrow">
					<Col lg={3}>
					<img src = {MLICCI} alt="MLICCI"/>
					</Col>
					<Col lg={9}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>			
					</Col>
				</Row>
				<Row className="aboutrow">
					<Col lg={3}>
						<img src = {Report} alt="Report" id="Reportpic"/>
					</Col>
					<Col lg={9}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>							</Col>
				</Row>	
				<Row className="aboutrow">
					<Col lg={3}>
					<img src = {WinCLogo} alt="WinCLogo"/>
					</Col>
					<Col lg={9}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>							</Col>
				</Row>	    
		</div>
	  </div>
	)

export default About