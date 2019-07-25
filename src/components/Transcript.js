import React from 'react';
import { Row, Col, Button} from 'react-bootstrap';
//import OHPersonData from '../data/OHPersonData';
import OHPersonData from '../data/Formatted';
import '../styling/transcript.css';
import topic_categories from '../data/topic_categories';
import { create } from 'domain';

class Transcript extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
      activecat: ''
      };

  this.handleClick = this.handleClick.bind(this);
  this.createTranscript = this.createTranscript.bind(this);
  this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }

  handleClick = (event) => {
    this.setState({activecat: event.target.value})
  }


  componentDidUpdate(prevProps, prevState){
    if (this.state.activecat !== prevState.activecat){
      var matchingsentences = document.getElementsByClassName(["cat"+prevState.activecat]);
      var i;
      for (i = 0; i < matchingsentences.length; i++) {
        matchingsentences[i].classList.remove("active")
        // matchingsentences[i].className += " active";
      }
      var category = this.state.activecat;
      var matchingsentences = document.getElementsByClassName(["cat"+category]);
      var i;
      for (i = 0; i < matchingsentences.length; i++) {
        matchingsentences[i].classList.add("active");
      }
  }
}

  createTranscript(){
    let match = this.props.match
    const personname = match.params.name;
    const buttons = topic_categories.map((obj, index) =>
      <div>
        <Button variant="outline-info" onClick={this.handleClick} value={index+1}>{obj.name}</Button>
      </div>
    ); 
    var result = OHPersonData.filter(obj => obj.id == personname.substring(6));
    result = result[0];
    const name= result.interview.map((obj) => {
      const classnames = obj.cat.map(item => `cat${item}`).join(" ");
      return (<Row>
        <Col lg={2}>
          <h2>{obj.speaker}</h2>
        </Col>  
        <Col lg={10}>
          <div className={`${classnames} import${obj.important}`}><p>{obj.text}</p></div>
        </Col>
      </Row>)
    });

    return [buttons, name]
  }

  render(){

      const [buttons, name] = this.createTranscript()

      return (
        <div>
          <Row className="justify-content-md-center">{buttons}</Row>
          <div>{name}</div>
        </div>


      ); 


}

}

export default Transcript
