 import React, { Component } from 'react';
 import { Row, Dropdown, Container, Col } from 'react-bootstrap';
 
 import Octicon, {Check} from '@primer/octicons-react';


 import datacomplete from '../data/datacomplete.json'
 import categories from '../data/Metadata'
import '../styling/App.css';
import ComparisonMap from '../components/ComparisonMaps'

class Comparison extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentvar: false,
          match: this.props.match,
          varname1: '',
          varname2: '',
          varabbreviation1: '',
          varabbreviation2: '',
          varindex1: '',
          varindex2: '',
          dataset: datacomplete,
          race: true,
          gender: true,
          racegender: true,
          demselected: 'A',
          genderselected: 'F',
          buttonselected: 'Women'
      }
      this.handleClick = this.handleClick.bind(this)
      // this.createDemButtons = this.createDemButtons.bind(this)
      // this.handleDemClick = this.handleDemClick.bind(this)
    }

    //Obtains abbreviation based on altered state
    getabbreviation(matchingvar, demselected, genderselected){
      var abbrev = "";
      var genderabbrev = "";
      if (matchingvar.type === "P"){
        abbrev+= "P_";
      }
      if (matchingvar.universe==="H"){
        if (genderselected==="F"){
          genderabbrev = "_FemaleNoHusband"
        }
        else if (genderselected==="M"){
          genderabbrev = "_MaleNoWife"
        }
        abbrev= abbrev + matchingvar.abbreviation + genderabbrev
        if (demselected !== "A"){
          abbrev += "_" + demselected;
        }
      }
      else if (matchingvar.universe==="I"){
        if (genderselected==="A"){
          genderabbrev= "Total_"
        }
        if (genderselected==="F"){
          genderabbrev = "Female_"
        }
        else if (genderselected==="M"){
          genderabbrev = "Male_"
        }
        abbrev = abbrev+ genderabbrev + matchingvar.abbreviation
        if (demselected !== "A"){
          abbrev += "_" + demselected;
        }
      }
      return abbrev;

    }

    //Handles click of every key indicator selected from any of the variables
    handleClick(event){
      console.log("CLICK CATEGORY INDEX "+event.target.name[0])
      console.log("CLICK VARIABLE INDEX "+ event.target.name[2])
      const matchingvar = categories[event.target.name[0]].variables[event.target.name[2]];
      console.log(matchingvar);
      var demselected = this.state.demselected;
      var genderselected = this.state.genderselected;
      var buttonselected = this.state.buttonselected;
      var abbreviation = this.getabbreviation(matchingvar, demselected, genderselected);
      this.setState({currentvar: true, varindex1: event.target.name, varname1: matchingvar.name, varabbreviation1: abbreviation,
        race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender, demselected: demselected, genderselected: genderselected, buttonselected: buttonselected})
      console.log(this.state)
      console.log(this.state.varabbreviation1)
    }

    // createDemButtons(){
    //   let everyonebutton =
    //   <Col lg={1}>
    //     <Row><Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>Everyone</Button></Row>
    //     <Row><Button key="Women" className = {`Women dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Women"? "selected": ""}`} id="Women" value={["A", "F", "Women"]} onClick={this.handleDemClick}>Women</Button></Row>
    //     <Row><Button key="Men" className = {`Men dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Men"? "selected": ""}`} id="Men" value={["A", "M", "Men"]} onClick={this.handleDemClick}>Men</Button></Row>
    //   </Col>
    //   let otherbuttons =
    //     demographics.map((group, index)=>(
    //       <Col lg={1}>
    //         <Row><Button id="dembutton" key={`${group.class}`} className = {`${group.class} dembutton ${this.state.race ? "available": "unavailable"} ${this.state.buttonselected=== group.class ? "selected": ""}`} value={[group.abbreviation, "A", group.class]} onClick={this.handleDemClick}>{group.name}</Button></Row>
    //           {group.subgroup.map((gender, i) => (
    //            <Row> <Button key={`${gender.class}`} className = {`${gender.class} dembutton ${this.state.racegender ? "available": "unavailable"} ${this.state.buttonselected=== gender.class ? "selected": ""}`}  id={`${gender.name}`} value={[group.abbreviation, gender.abbreviation, gender.class]} onClick={this.handleDemClick}>{gender.name}</Button></Row>
    //           ))}
    //       </Col>
    //     ))
    //     return [everyonebutton, otherbuttons];
    //   }

  render(){
    // const varbuttons = this.createButtons();
    // const [everyonebuttons, dembuttons] = this.createDemButtons();
    // const [racesButtons, genderButtons] = this.createNewDemButtons();
    // let match = this.props.match;
    return (
      <div>
        <Container>
          
	      <Row className="justify-content-md-center">
        <Col lg={4}>
          <Dropdown.Menu show>
            <Dropdown.Header>Income</Dropdown.Header>
            <Dropdown.Item eventKey="test1" name={[2,0]} onClick={this.handleClick} key="test1" >People with Income Above Poverty</Dropdown.Item>
            <Dropdown.Item eventKey="test2" name={[2,1]} onClick={this.handleClick} key="test2" >People with Income Below Poverty <Octicon id="testing" icon={Check} /> </Dropdown.Item>
          </Dropdown.Menu>
        </Col>
        <Col lg={4}>
          <Dropdown.Menu show>
            <Dropdown.Header>Health</Dropdown.Header>
              <Dropdown.Item eventKey="test3" name={[3,0]} onClick={this.handleClick} key="test3" >Health insurance</Dropdown.Item>
              <Dropdown.Item eventKey="test4" name={[3,1]} onClick={this.handleClick} key="test4" >People above 64 with health insurance</Dropdown.Item>
              <Dropdown.Item eventKey="test5" name={[3,2]} onClick={this.handleClick} key="test5" >People with private health insurance <Octicon id="testing" icon={Check} /> </Dropdown.Item>
          </Dropdown.Menu>
        </Col>
        <Col lg={4} > 
          <Dropdown.Menu show>
            <Dropdown.Header>Education</Dropdown.Header>
              <Dropdown.Item eventKey="test6" onClick={this.handleClick} key="test6" >Percent with a high school degree<Octicon id="testing" icon={Check} /> </Dropdown.Item>
              <Dropdown.Item eventKey="test7" onClick={this.handleClick} key="test7" >Variable 2 </Dropdown.Item>
          </Dropdown.Menu>
        </Col>
        
        </Row>
        <ComparisonMap datainput = {this.state.dataset} variable ={this.state.varabbreviation1} variable2 = {"P_Female_IBP"}varname = {this.state.varname1} varname2 ={"High School Education"}/>}
        </Container>
    </div>
  // <div>
  // <h1>Data Portal</h1>
  // <Row className="justify-content-md-center">
  //   <Router>
  //     <ButtonToolbar> {varbuttons}</ButtonToolbar>
  //           <Switch>
  //            <Route strict path={`${match.path}/:varabbreviation`}
  //            render={(routeProps) => (
  //              <MapTest {...routeProps} datainput = {this.state.dataset} />
  //              )}
  //              />
  //            </Switch>
  //        </Router>
  //        </Row>

  //        <Row className="justify-content-md-center">
  //          <Col lg={3.5}></Col>
  //          {everyonebuttons}
  //          {dembuttons}
  //          </Row>
  //          <p></p>

  //          <Row className="justify-content-md-center">
  //          <Col lg={3.5}></Col>
  //       <Col lg={3.5}>
  //       {racesButtons}
  //       {genderButtons}
  //      </Col>
  //        </Row>

  //      <h1> {this.state.varabbreviation}</h1>

  //        {this.state.currentvar &&
  //    <MapTest datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname}/>}
  //        </div>
     )
 }
}


// export const Comparison = () => (
//     <div>
//         <Container>
// 	    <Row className="justify-content-md-center">
//         <Col lg={4}>
                 
//                  <Dropdown.Menu show>
//                    <Dropdown.Header>Income</Dropdown.Header>
//                    <Dropdown.Item eventKey="test" onClick={this.handleClick} key="ok" >Variable 1</Dropdown.Item>
//                    <Dropdown.Item>Percent in Poverty <Octicon id="testing" icon={Check} /> </Dropdown.Item>
//                  </Dropdown.Menu>
//               </Col>
//               <Col lg={4}>
//                  <Dropdown.Menu show>
//                    <Dropdown.Header>Health</Dropdown.Header>
//                    <Dropdown.Item>Health insurance</Dropdown.Item>
//                    <Dropdown.Item>People above 64 with health insurance</Dropdown.Item>
//                    <Dropdown.Item>People with private health insurance <Octicon id="testing" icon={Check} /> </Dropdown.Item>
//                  </Dropdown.Menu>
//               </Col>
//                  <Col lg={4} > 
//                  <Dropdown.Menu show>
//                     <Dropdown.Header>Education</Dropdown.Header>
//                     <Dropdown.Item>Percent with a high school degree<Octicon id="testing" icon={Check} /> </Dropdown.Item>
//                     <Dropdown.Item>Variable 2 </Dropdown.Item>
//                 </Dropdown.Menu>
//                   </Col>
             
//                 </Row>
//                 <ComparisonMap datainput = {data_general} variable ={"P_IBP_E_F"} variable2 = {"P_High_school_graduate_(includes_equivalency)_E_F"}varname = {"Poverty"} varname2 ={"High School Education"}/>}

//     </Container>
//     </div>

    
// )

	

export default Comparison

