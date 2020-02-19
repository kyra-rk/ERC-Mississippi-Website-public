/**
 * Program file for the Oral Histories Person Page
 */
import React from 'react';
// import person from '../pictures/person.png';
import { Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import '../styling/Transcript.css';
import OHPersonData from '../data/OHPersonData'
import topic_categories from '../data/topic_categories';
import flip_card_items from '../data/flip_card_items';

class OHPerson extends React.Component {
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

//for when new topic button is selected, it will change the highlighted quotes by editing classname (prevprops needed for some reason to not have delay problem)
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

createHeader(){
  let match = this.props.match;
  const personname = match.params.name;

  // var result = OHPersonData.filter(obj => obj.id == personname.substring(6));
  // result = result[0];

  var result = flip_card_items.filter(obj => obj.name===personname)
  result = result[0]
  const printheader = <h1>{result.personname}</h1>
  const printinitials=result.header.map((obj) => {
    return (
      <h1 className="initials">{obj.initials}</h1>
    )
  });
  const printbio=result.header.map((obj) => {
    return (
      <p id="personbio">{obj.longbio}</p>
    )
  });
  return [printheader, printinitials, printbio]
}

  createTranscript(){
    let match = this.props.match;
    const personname = match.params.name;

    const buttons = topic_categories.map((obj, index) =>
   <Button onClick={this.handleClick} value={index+1} className="transcriptbutton" style={{backgroundColor: obj.color, borderColor: obj.color}} >
        {obj.name}
      </Button>
    );
    //id has person# so removing the word person then matching with number and then add cat# to name of class
    var result = OHPersonData.filter(obj => obj.id == personname.substring(6));
    result = result[0];
    var printtranscript=""
    if (result){
    printtranscript= result.interview.map((obj) => {
      const classnames = obj.cat.map(item => `cat${item}`).join(" ");
      var annotation = null;
      var transcriptwidth=7
      var annotationwidth = 0
      if (obj.annotation){
        annotation =
        <Card>
  <Card.Body>{obj.annotation}</Card.Body>
</Card>
transcriptwidth = 5
annotationwidth = 4
        // <Accordion defaultActiveKey="1">
        //     <Card>
        //       <Accordion.Toggle as={Card.Header} eventKey="0">
        //         Learn more
        //       </Accordion.Toggle>
        //       <Accordion.Collapse eventKey="0">
        //         <Card.Body>{obj.annotation}</Card.Body>
        //       </Accordion.Collapse>
        //     </Card>
        //   </Accordion>
      }
      return (<div><Row >
        {/* <Col sm={1}>
        </Col> */}
        <Col sm={{span: 1}} id="speakername">
          <h5>{obj.speaker}</h5>
        </Col>
        <Col sm={1}></Col>
        </Row>
        <Row>
        <Col sm={1}></Col>
        <Col sm={9}>
          <div className={`${classnames} import${obj.important}`}>
            <p id="transcriptquotes">{obj.text}</p>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            {annotation}
          </div>
        </Col>
      </Row>
      </div>)
    });
  }
    return [buttons, printtranscript]
  }

  render(){
      const [printheader, printinitials, printbio] = this.createHeader()
      const [buttons, printtranscript] = this.createTranscript()
      return (
        <div>
        <Row className="ohpersonrow justify-content-center">
        {/* <Col sm={3}>
          <div className="initialdiv">
          {printinitials}
          </div>
        </Col> */}
        <Col sm={10}>
          <h1>{printheader}</h1>
          {printbio}
        </Col>
      </Row>
        <Row>
          <Col sm={2} className="buttonsbar">
          {buttons}
          </Col>
          <Col sm={10}>{printtranscript}</Col>
        </Row>
        </div>


      );


}

}

export default OHPerson
