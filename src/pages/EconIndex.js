/**
 * Program file for the Index Page
 * Made a const and exported it as "EconIndex" to reference in App.js
 */
import React from 'react';
import './EconIndex.css';

export const EconIndex = () => (
	  <div>
	    <h2>Index</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		<img id ="EconImage" src = {require('../pictures/MSimage.png')}/>
	  </div>
	)

export default EconIndex