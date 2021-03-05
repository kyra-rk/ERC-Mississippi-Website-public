/**
 * Program file for the Oral History Method Page
 * Made a const and exported it as "OralHistMethod" to reference in App.js
 */
import React from 'react';
import {Row} from 'react-bootstrap'
import ccdfmap from '../pictures/CCDF_Eligible_Map.png'
import ccdflegend from '../pictures/CCDF_EligibleLegend.png'


export const ChildCareMap = () => (
	  <div>
    <div className="headerdiv">
        <h1 className="descriptionheader"> Number of Children Eligible for CCDF
        </h1>
        </div>
        <div className="distexplanation">
		<p>This map shows the number of potentially CCDF eligible children at the PUMA level calculated using Public Use Microdata. 
            </p>
           </div>
	<div>
	<img src={ccdfmap}/>
	</div>	
    <div className="legendimage">
	<img src={ccdflegend}/>
	</div>
	<br />
		</div>
	)

export default ChildCareMap