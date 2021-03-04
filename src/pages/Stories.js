/**
 * Program file for the Stories (formerly known as Oral Histories) Page
 * Used navbar and Router to make buttons that link to subpages of people vs. topics categorization
 */

import React from 'react';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Topic from './Topic'
import People from './People'
import NoMatch from './NoMatch'
import '../styling/Stories.css'

/**
 * match.path keeps oralhistories in url but allows to add topic or story
 * {' '} creates space between buttons
 * Not super sure what <Route exact path={match.path}/> does but if i delete it, it seems fine
 * Created a nomatch page
 */  
export const Stories = ({ match }) => (
  <div>
    <div className="ohtop">
      <div className="screenwidth">
    <h1>Stories</h1>
    <p>
      Participants from the <strong>Women in Construction Program</strong> (WinC) were interviewed about their experiences as women and mothers training to work in the 
      construction industry. By showcasing their narratives, we hope to deepen people's understanding on women's economic security in Mississippi as well as bring
      a more qualitative aspect to the economic security index.
    </p>
    </div>
    </div>
    <div className="oh">

    <div className="screenwidth">
    <h3>How do I navigate this page?</h3>
    <p>
      If you are more interested in reading about one person's story, then select "By Person" button. You will see a biography of the WinC participant and the full transcript of their interview. You can highlight transcript text by topic to easily find relevant quotations. 
      If you are more interested in reading quotes related to a topic, then select "By Topic" button. You can toggle between the topics and see relevant quotes. Check our Methodology page to understand what each of the topics mean.
    </p>
    </div>

    <Router>
    <Button as={Link} className="ohbutton" to={`${match.url}/people`} style={{backgroundColor: "teal", borderColor: "teal"}}>By Person</Button>
    {' '}
    <Button as={Link} className="ohbutton" to= {`${match.url}/topic`} style={{backgroundColor: "teal", borderColor: "teal"}}>By Topic</Button>
      <Switch>
        <Route path={`${match.url}/people`} component={People}/>
        <Route path={`${match.url}/topic`} component={Topic}/>
        <Route exact path={match.path}/>
        <Route component={NoMatch}/>
      </Switch>
    </Router>
    </div>
  </div>
)
  
  
export default Stories
