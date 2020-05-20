/**
 * Program file for the Oral Histories Person Page
 */
import React from 'react';
// import person from '../pictures/person.png';
import { Row, Col, Button, Card, Accordion } from 'react-bootstrap';
// import {StickyContainer, Sticky} from 'react-sticky'
import StickyBox from 'react-sticky-box';
import '../styling/Transcript.css';
import OHPersonData from '../data/OHPersonData'
import topic_categories from '../data/topic_categories';
import flip_card_items from '../data/flip_card_items';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

class OHPerson extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
      selectedcat: '',
      linefocus: 0
      };

  this.handleClick = this.handleClick.bind(this);
  this.createTranscript = this.createTranscript.bind(this);
  this.componentDidUpdate = this.componentDidUpdate.bind(this)
  this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleClick = (event) => {
    this.setState({selectedcat: event.target.value, linefocus: 0})
  }

  handleIconClick = (val) => {
    if (val==-1 & this.state.linefocus!=0 | val==1){
      var line = this.state.linefocus+val
      this.setState({linefocus: line})
    }
    if (val==1 & this.state.lie)
    console.log(this.state)
    // elem.scrollIntoView();
  }

//for when new topic button is selected, it will change the highlighted quotes by editing classname (prevprops needed for some reason to not have delay problem)
  componentDidUpdate(prevProps, prevState){
    if (prevState.linefocus > 0){
      document.querySelectorAll(`.section-${prevState.selectedcat}-${prevState.linefocus} p#transcriptquotes`)[0].style.textShadow="none"
    }
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
      // var row = document.getElementById(`row-${this.state.selectedcat}`);
      // row.style.border = "2px solid red"
      // var newElement = document.createElement(Col);
      // newElement.setAttribute('class', "add");
      // row.appendChild(newElement);
      // newElement.style.border = "2px solid red";
  }
  if (this.state.linefocus !== prevState.linefocus & this.state.linefocus > 0){
    var color = topic_categories.filter((obj,i) => i+1 == this.state.selectedcat)[0].color

    var elem = document.getElementsByClassName(`section-${this.state.selectedcat}-${this.state.linefocus}`)[0]
    elem.scrollIntoView({behavior: "smooth", block: "center"});
    var childelem = document.querySelectorAll(`.section-${this.state.selectedcat}-${this.state.linefocus} p#transcriptquotes`)[0]
    // childelem.style.textShadow="4px 4px 12px rgba(38, 143, 255, 0.5)"
    childelem.style.textShadow=`4px 4px 12px ${color}`
  }
}


createHeader(){
  let match = this.props.match;
  const personname = match.params.name;

  // var result = OHPersonData.filter(obj => obj.id == personname.substring(6));
  // result = result[0];

  var result = flip_card_items.filter(obj => obj.name===personname)
  result = result[0]
  const printheader = <h1 className="header">{result.personname}</h1>
  const printinitials=result.header.map((obj) => {
    return (
      <h2 className="initials">{obj.initials}</h2>
    )
  });
  const printbio=result.header.map((obj, i) => {
    return (
      <p key={i} id="personbio">{obj.longbio}</p>
    )
  });
  return [printheader, printinitials, printbio]
}

  createTranscript(){
    let match = this.props.match;
    const personname = match.params.name;
    let currentcat = this.state.selectedcat;
    const buttons = topic_categories.map((obj, index) => {
      console.log(index+1)
      console.log(currentcat)
      const header = 
      <Col sm={10}>
      <Button key={index+1} onClick={this.handleClick} value={index+1} id={`transcriptbutton ${index+1}`} className="transcriptbutton" style={{backgroundColor: obj.color, borderColor: obj.color}} >
       {obj.name}
     </Button> 
     </Col>
      if (index+1 == currentcat){
        return (<Row key={`row-${index+1}`} id={`row-${index+1}`} noGutters={true}>
        {header}
        <Col sm={1}>
        <ArrowDropDownCircleIcon key={`minusbutton-${index+1}`} value={-1} onClick={() => this.handleIconClick(-1)} className="minus reverse"></ArrowDropDownCircleIcon>
        <ArrowDropDownCircleIcon key={`addbutton-${index+1}`} value={+1} onClick={() => this.handleIconClick(1)} className="add"></ArrowDropDownCircleIcon>
        </Col>
        </Row>)
      }
      else {
        return (
        <Row key={`row-${index+1}`} id={`row-${index+1}`} noGutters={true}>
{header}</Row>)
      }
      
     } );
     const horbuttons = topic_categories.map((obj, index) => {
      return (<Col sm={2} className="filters">
      <Button key={index+1} onClick={this.handleClick} value={index+1} id={`transcriptbutton ${index+1}`} className="transcriptbutton" style={{backgroundColor: obj.color, borderColor: obj.color}} >
      {obj.name}
    </Button> </Col>)
      console.log(index+1)
      console.log(currentcat)
      const header = 

      <Button key={index+1} onClick={this.handleClick} value={index+1} id={`transcriptbutton ${index+1}`} className="transcriptbutton" style={{backgroundColor: obj.color, borderColor: obj.color}} >
       {obj.name}
     </Button> 

      if (index+1 == currentcat){
        return (
          <Col sm={"auto"}>
         
        
        <Row >
        <ArrowDropDownCircleIcon key={`minusbutton-${index+1}`} value={-1} onClick={() => this.handleIconClick(-1)} className="minus reverse"></ArrowDropDownCircleIcon>
        <ArrowDropDownCircleIcon key={`addbutton-${index+1}`} value={+1} onClick={() => this.handleIconClick(1)} className="add"></ArrowDropDownCircleIcon>
        </Row>
        <Row>
          {header}
          </Row>
          </Col>
        
        )
      }
      else {
        return (
          <Col sm={"auto"}> 
      
<Row>{header}</Row></Col>)
      }
      
     } );
    //id has person# so removing the word person then matching with number and then add cat# to name of class
    var result = OHPersonData.filter(obj => obj.id == personname.substring(6));
    result = result[0];
    var printtranscript=""
    var identifiers, ids, anchorids = ""
    if (result){
      var counts= {}
      printtranscript= result.interview.map((obj, index) => {
      const classnames = obj.cat.map(item => `cat${item}`).join(" ");
      for(var i = 0; i < obj.cat.length; i++) {
        counts[obj.cat[i]] ? counts[obj.cat[i]]++ : counts[obj.cat[i]] = 1;
      }
      identifiers = obj.cat.map((obj) => counts[obj])
      
      ids = obj.cat.map(obj  => `section-${obj}-${counts[obj]}`).join(" ");
      anchorids = obj.cat.map(obj  => `anchor-${obj}-${counts[obj]}`).join(" ");
      // console.log(identifiers)
      // previds = obj.cat.map(obj  => `section-${obj}-${counts[obj]-1} `)
      // nextids = obj.cat.map(obj  => `section-${obj}-${counts[obj]+1} `)
      var annotation = null;
      var transcriptwidth=7
      var annotationwidth = 0
      if (obj.annotation){
        annotation =
        <Card className="annotation">
          <Card.Body>{obj.annotation}</Card.Body>
        </Card>
        transcriptwidth = 5
        annotationwidth = 4

      }
      // console.log(ids, previds, nextids)
      return (<div key={index}>
        <Row >
        {/* <Col sm={2}>
        </Col>  */}

        <Col sm={12} md={9}>
          <Row className="justify-content-left">
            <Col sm={{span: 1}} id="speakername">
              <h5>{obj.speaker}</h5>
            </Col>
            {/* <Col sm={1}></Col> */}
            </Row>
          <Row className="justify-content-left" >
            <Col sm={11}>
              {/* <div className={anchorids}> </div> */}
              <div className={`${classnames} import${obj.important} ${ids}`}>
                <p id="transcriptquotes">{obj.text}</p> 
                {/* <p>{ids}</p> */}
              </div>
            </Col>
            <Col sm={1}>
              {/* <a href={`#section-${obj.cat[0]}-${identifiers[obj.cat[0]-1]-1}`}><p>prev</p></a> */}
              {/* <a href={`#section-${obj.cat[0]}-${identifiers[obj.cat[0]-1]+1}`}><p>></p></a> */}
            </Col>
          </Row>
        </Col>
        
        <Col sm={12} md={3}>
          {/* <div> */}
            {annotation}
          {/* </div> */}
        </Col>
      </Row>
      </div>)
    });
  }
    return [buttons, horbuttons, printtranscript]
  }

  render(){
      const [printheader, printinitials, printbio] = this.createHeader()
      const [buttons, horbuttons, printtranscript] = this.createTranscript()
      
      return (
        <section>
        <div>
        <Row className="ohpersonrow justify-content-center">
        {/* <Col sm={3}>
          <div className="initialdiv">
          {printinitials}
          </div>
        </Col> */}
        <Col sm={10}>
          {printheader}
          {printbio}
        </Col>
      </Row>
        <Row>
          <Col sm = {3} md={2}>
         {/* <StickyBox offsetTop={85}>
                {buttons}
           </StickyBox>  */}
           </Col>
          <Col sm={9} md={10}>{printtranscript}</Col>
        </Row>
        </div>
        <Row className="justify-content-center">
        <Row className="footer" >
          {horbuttons}
</Row>
        </Row>
        </section>

      );


}

}

export default OHPerson
