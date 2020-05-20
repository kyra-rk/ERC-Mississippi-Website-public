/**
 * Program file for the No Match Page
 * Made a const and exported it as "NoMatch" to reference in App.js
 */
import React from 'react';

/**This page should catch any links that are not existent within our website and take it to a 404 page not found */
export const NoMatch = () => (
	  <div>
	    <h1>No Match</h1>
		<p>Please select any of the items on the menu above to be directed to an existing page.</p>
	  </div>
	)

export default NoMatch