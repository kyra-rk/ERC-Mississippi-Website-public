import React from 'react';
import { Row, Col, Button} from 'react-bootstrap';
//import OHPersonData from '../data/OHPersonData';
import OHPersonData from '../data/Formatted';
import '../styling/Transcript.css';
import topic_categories from '../data/topic_categories';
import person from '../pictures/person.png'

class Transcript extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
      selectedcat: '',
      };

  this.handleClick = this.handleClick.bind(this);
  this.createTranscript = this.createTranscript.bind(this);
  this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }

  handleClick = (event) => {
    this.setState({selectedcat: event.target.value})
  }


  componentDidUpdate(prevProps, prevState){
    if (this.state.selectedcat !== prevState.selectedcat){
      var matchingsentences = document.getElementsByClassName(["cat"+prevState.selectedcat]);
      var i;
      for (i = 0; i < matchingsentences.length; i++) {
        matchingsentences[i].classList.remove("selected")
        matchingsentences[i].style.color="black";
      }
      var category = this.state.selectedcat;
      var matchingsentence = document.getElementsByClassName(["cat"+category]);
      var matchingcategory= topic_categories.filter((obj,i) => i+1 == category)
      var index;
      for (index = 0; index < matchingsentence.length; index++) {
        matchingsentence[index].classList.add("selected");
        matchingsentence[index].style.color=matchingcategory[0].color;

        
      }
  }
}

  createTranscript(){
    let match = this.props.match
    const personname = match.params.name;
    const buttons = topic_categories.map((obj, index) =>
      <Button onClick={this.handleClick} value={index+1} className="transcriptbutton" style={{backgroundColor: obj.color, borderColor: obj.color}} >
        {obj.name}
      </Button>
    ); 
    var result = OHPersonData.filter(obj => obj.id == personname.substring(6));
    result = result[0];
    const printtranscript= result.interview.map((obj) => {
      const classnames = obj.cat.map(item => `cat${item}`).join(" ");
      return (<Row className="transcriptcontent">
        <Col xl={1} id="speakername">
          <h5>{obj.speaker}</h5>
        </Col>  
        <Col xl={9}>
          <div className={`${classnames} import${obj.important}`}>
            <p id="transcriptquotes">{obj.text}</p>  
          </div>
        </Col>
      </Row>)
    });

    return [buttons, printtranscript]
  }

  render(){

      const [buttons, printtranscript] = this.createTranscript()

      return (
        <div>
          <Row className="justify-content-md-center">
          {buttons}
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={10}>
              <p id="personbio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Col>
            <Col lg={2}>
            <img src = {person} alt="transcriptpic" id ="transcriptpic"/>
            </Col>
          </Row>
          <h3>Interview Transcript</h3>
          <div>{printtranscript}</div>
        </div>


      ); 


}

}

export default Transcript