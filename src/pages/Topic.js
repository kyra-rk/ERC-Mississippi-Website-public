/**
 * Program file for the Topic Page
 * Made a const and exported it as "Topic" to reference in OralHistories.js
 */
import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Switch, Link, Redirect} from 'react-router-dom';
import { Button } from 'react-bootstrap';
//import NoMatch from './NoMatch';
import TopicCategory from './TopicCategory'
import topic_categories from '../data/topic_categories';
import { Row } from 'react-bootstrap';
import OHPerson from './OHPerson'

/*created TopicCategory const that references the data in selectedQuotes*/
class Topic extends Component {
  constructor(props){  
      super(props);
      this.state ={
          personselected: false,
          name: ''
      } 
      this.handleClick = this.handleClick.bind(this);
      this.redirectperson=this.redirectperson.bind(this);
  }

  handleClick(event){
      this.setState({name: event.target.value, personselected: true});
  }

  redirectperson(name){
    this.setState({name: name, personselected: true});
  }

//redirect gets rid of flipcard component but doesnt seem to work when just typing out url
  render (){
  if (this.state.personselected===true){
    // console.log(this.props.history.length);
    // console.log(this.props.history.location.pathname.split("/")[1])
    var prevpath = "/" + this.props.history.location.pathname.split("/")[1] + "/people"
  // console.log(this.props.match.path, this.state.name)
      return (<Router><Redirect to={`${prevpath}/${this.state.name}`}/>                 
      <Route path={`${prevpath}/:name`} component={OHPerson}/></Router>
      )
  }
  
  var buttons = topic_categories.map((obj) =>
    <div key={obj.name}>
      <Link to={`${this.props.match.path}/${obj.name}`}>
        <Button className="topicbutton" style={{backgroundColor: obj.color, borderColor: obj.color}}>{obj.name}</Button>
      </Link>
    </div>
  );
      return (
        <div>
        <h1>Choose a Topic</h1>
        <Router>
          <Row className="justify-content-md-center">{buttons}</Row>
          <Switch>
            <Route path={`${this.props.match.path}/:name`} render={(props) => <TopicCategory {...props} redirectperson={this.redirectperson}/>}/>                
            <Route exact path={`/stories/people/:name`} component={OHPerson}/>
          </Switch>
        </Router>
      </div>
    )
  }

} 


export default Topic;


// /*created buttons const that references the categories in topic_categories*/
// const Topic = ({match}) => {
//   const buttons = topic_categories.map((obj) =>
//     <div key={obj.name}>
//       <Link to={`${match.url}/${obj.name}`}>
//         <Button className="topicbutton" style={{backgroundColor: obj.color, borderColor: obj.color}}>{obj.name}</Button>
//       </Link>
//     </div>
//   );
//   return (
//     <div>
//       <h1>Choose a Topic</h1>
//       <Router>
//         <Row className="justify-content-md-center">{buttons}</Row>
//         <Switch>
//           <Route path={`${match.path}/:name`} component={TopicCategory}/>
//         </Switch>
//       </Router>
//     </div>
//   )
// }

// export default Topic