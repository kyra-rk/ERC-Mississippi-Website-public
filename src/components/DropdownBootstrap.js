import React, { Component } from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar, Col, Button, Container } from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import MapTest from '../pages/MapTest'
import DemographicMap from '../components/DemographicMaps'
import '../styling/App.css';
import '../styling/Dropdown.css'
import data_general from '../data/data_general_ms.json';
import datacomplete from '../data/datacomplete.json'
import data_black from '../data/data_black.json'
import data_white from '../data/data_white.json'
import categories from '../data/Metadata'
import topic_categories from '../data/topic_categories';
import { throwStatement } from '@babel/types';
// import '../styling/font-awesome.min.css'
// @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css")
// import Map from '../components/Map.js'

const demographics = [
    {'name': 'White',
    'abbreviation': 'W',
    'class': 'White',
    'subgroup':
    [{
      'name':'Women',
      'abbreviation': 'F',
      'class': 'WhiteWomen',
      },
      {'name': 'Men',
    'abbreviation': 'M',
    'class': 'WhiteMen',}
    ]},
    {'name': 'Black',
    'abbreviation': 'B',
    'class': 'Black',
    'subgroup':
    [{
      'name':'Women',
      'abbreviation': 'F',
      'class': 'BlackWomen',
      },
      {'name': 'Men',
    'abbreviation': 'M',
    'class': 'BlackMen',}
    ]},
]

class DropdownBootstrap extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentvar: false,
                match: this.props.match,
                varname: '',
                varabbreviation: '',
                vardesc: '',
                varlocation: {index1: '', index2: ''},
                dataset: datacomplete,
                race: true,
                gender: true,
                racegender: true,
                demselected: 'A',
                genderselected: 'F',
                buttonselected: 'Women'
            }
            this.createButtons = this.createButtons.bind(this)
            this.handleClick = this.handleClick.bind(this)
            this.createDemButtons = this.createDemButtons.bind(this)
            this.handleDemClick = this.handleDemClick.bind(this)
        }

        createButtons(){
            //Maps categories to a new DropdownButton
            let buttons =  categories.map((obj, index) => (
                    <DropdownButton
                        title={obj.catname}
                        variant={obj.variant.toLowerCase()}
                        key={index}>
                    {obj.variables.map((item, i) => (
                         <Dropdown.Item eventKey={i} onClick={this.handleClick.bind(this,index, i)} key={i}>{item.name}</Dropdown.Item>
                    ))}
                    </DropdownButton>
            ))
            return buttons;
        }
        //Creates specific demographic filter buttons
        createDemButtons(){
          let racebuttons = 
          
          <Row >
            <Col><Button className="dembutton available">Everyone</Button></Col>
             <Row><Col><Button className="dembutton available">White</Button></Col>
             <Col><Button className="dembutton available">Black</Button></Col></Row>
            </Row>
           
            let genderbuttons = 
            <Row className="justify-content-md-center">
              <Col sm={"auto"}>
               
                <Row className="justify-content-md-center"><Button className="dembutton available">Women</Button></Row>
              <Row className="justify-content-md-center"><Button className="dembutton available">Men</Button></Row>
              
              </Col>

              <Col sm={"auto"}>
                <Row>
                  <Button className="dembutton available">Women</Button> 
                  <Button className="dembutton available">Women</Button>
                  </Row>
                <Row>
                <Button className="dembutton available">Men</Button>
                  <Button className="dembutton available">Men</Button>
                </Row>
              </Col>
            </Row>

            //  <Col lg={1}>

            //  <Row><Button className="dembutton available">Women</Button></Row>
            //   <Row><Button className="dembutton available">Men</Button></Row></Col>
             

let racegenderbuttons = 
<Col lg={2}>
  <Col lg={1}>
  <Row><Button className="dembutton available">Women</Button></Row>
  <Row><Button className="dembutton available">Men</Button></Row></Col>

<Col lg={1}>
  <Row><Button className="dembutton available">Women</Button></Row>
  <Row><Button className="dembutton available">Men</Button></Row></Col>
  </Col>
         
          let subbuttons =
          demographics.map((group, index)=>(
                group.subgroup.map((gender, i) => (
                  <Grid item sm={6} ><Button key={`${gender.class}`} className = {`${gender.class} dembutton ${this.state.racegender ? "available": "unavailable"} ${this.state.buttonselected=== gender.class ? "selected": ""}`}  id={`${gender.name}`} value={[group.abbreviation, gender.abbreviation, gender.class]} onClick={this.handleDemClick}>{gender.name}</Button></Grid>
                ))
          ))

          let everyonegridbutton = 
          <Grid container xs = {6} sm={6} md={4} lg={3} >
            <Grid container sm={4}>

            <Grid item xs ={12} sm={12} zeroMinWidth>
                     <Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>Everyone</Button>
            </Grid>
            </Grid>
            <Grid container xs = {12} sm={8} >

            <Grid item xs = {6} sm={6}  zeroMinWidth>
            <Button id="dembutton" key ="White" className={`White dembutton ${this.state.buttonselected==="White"? "selected": ""} ${this.state.race ? "available": "unavailable"}`} value={["W", "A", "White"]} onClick={this.handleDemClick}>White</Button>
             </Grid>
            <Grid item xs = {6} sm={6}  zeroMinWidth >
            <Button id="dembutton" key ="Black" className={`Black dembutton ${this.state.buttonselected==="Black"? "selected": ""} ${this.state.race ? "available": "unavailable"}`} value={["B", "A", "Black"]} onClick={this.handleDemClick}>Black</Button>
            </Grid>
            </Grid>
            <Grid container sm={4} >
            <Grid item xs = {6} sm={12}>
              <Button id="genderbutton" key="Women" className = {`Women dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Women"? "selected": ""}`}  value={["A", "F", "Women"]} onClick={this.handleDemClick}>Women</Button>          
            </Grid>
            <Grid item xs ={6} sm={12} >
            <Button id="genderbutton" key="Men" className = {`Men dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Men"? "selected": ""}`} value={["A", "M", "Men"]} onClick={this.handleDemClick}>Men</Button>

                     {/* <Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>MEN</Button> */}
            </Grid>

            </Grid>
            <Grid container sm={8}  >
            <Grid item xs = {6} sm={6} >
                     <Button id="Women" key ="WhiteWomen" className={`WhiteWomen dembutton available ${this.state.buttonselected==="WhiteWomen"? "selected": ""} ${this.state.racegender ? "available": "unavailable"}`} value={["W", "F", "WhiteWomen"]} onClick={this.handleDemClick}>White Women</Button>
            </Grid>
            <Grid item  xs = {6} sm={6} >
                     <Button id="Women" key ="BlackWomen" className={`BlackWomen dembutton available ${this.state.buttonselected==="BlackWomen"? "selected": ""} ${this.state.racegender ? "available": "unavailable"}`} value={["B", "F", "BlackWomen"]} onClick={this.handleDemClick}>Black Women</Button>
            </Grid>
            <Grid item  xs = {6} sm={6}>
                     <Button id="Men" key ="WhiteMen" className={`WhiteMen dembutton available ${this.state.buttonselected==="WhiteMen"? "selected": ""} ${this.state.racegender ? "available": "unavailable"}`} value={["W", "M", "WhiteMen"]} onClick={this.handleDemClick}>White Men</Button>
            </Grid>
            <Grid item  xs = {6}sm={6}>
                     <Button id="Men" key ="BlackMen" className={`BlackMen dembutton available ${this.state.buttonselected==="BlackMen"? "selected": ""} ${this.state.racegender ? "available": "unavailable"}`} value={["B", "M", "BlackMen"]} onClick={this.handleDemClick}>Black Men</Button>
            </Grid>
          </Grid>
          </Grid>
          

          let everyonebutton =
          <Col sm = {4} md={"auto"}>
            <Row><Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>Everyone</Button></Row>
            <div><Row><Button id="genderbutton" key="Women" className = {`Women dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Women"? "selected": ""}`}  value={["A", "F", "Women"]} onClick={this.handleDemClick}>Women</Button></Row>
            <Row><Button id="genderbutton" key="Men" className = {`Men dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Men"? "selected": ""}`} value={["A", "M", "Men"]} onClick={this.handleDemClick}>Men</Button></Row>
            </div>
          </Col>
          let otherbuttons =
          demographics.map((group, index)=>(
            <Col sm ={4} md={"auto"}>
              <Row><Button id="dembutton" key={`${group.class}`} className = {`${group.class} dembutton ${this.state.race ? "available": "unavailable"} ${this.state.buttonselected=== group.class ? "selected": ""}`} value={[group.abbreviation, "A", group.class]} onClick={this.handleDemClick}>{group.name}</Button></Row>
                {group.subgroup.map((gender, i) => (
                 <Row> <Button key={`${gender.class}`} className = {`${gender.class} dembutton ${this.state.racegender ? "available": "unavailable"} ${this.state.buttonselected=== gender.class ? "selected": ""}`}  id={`${gender.name}`} value={[group.abbreviation, gender.abbreviation, gender.class]} onClick={this.handleDemClick}>{gender.name}</Button></Row>
                ))}
            </Col>
          ))
          return [ everyonebutton, otherbuttons, everyonegridbutton];
        }

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

        handleClick(index,i, event){
          const matchingvar = categories[index].variables[i];
          var demselected = this.state.demselected;
          var genderselected = this.state.genderselected;
          var buttonselected = this.state.buttonselected;
          var error=false;
          if (this.state.genderselected!=="A" && this.state.demselected!=="A" && matchingvar.racegender===false){
            error = true;
          }
          else if (this.state.demselected !== "A"  && matchingvar.race === false){
            error = true;
          }
          else if (this.state.genderselected !== "A" && matchingvar.gender === false){
            error = true;
          }
          if (error === true){
            demselected = "A"
            genderselected = "A"
            if (document.getElementsByClassName(["selected"])[0]!==undefined){
              document.getElementsByClassName(["selected"])[0].classList.remove("selected");
            }
            document.getElementsByClassName(["Everyone"])[0].classList.add("selected");
            buttonselected = "Everyone"
          }
          var abbreviation = this.getabbreviation(matchingvar, demselected, genderselected);

          this.setState({currentvar: true, varlocation: {index1: index,index2: i}, varname: matchingvar.name, varabbreviation: abbreviation,
            race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender, demselected: demselected, genderselected: genderselected, buttonselected: buttonselected})
        }

        handleDemClick(event){
          if (this.state.currentvar) {
            const matchingvar = categories[this.state.varlocation.index1].variables[this.state.varlocation.index2]
            var abbreviation = this.getabbreviation(matchingvar, event.target.value[0], event.target.value[2])
            // `P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`
            this.setState({demselected: event.target.value[0], genderselected: event.target.value[2], varabbreviation: abbreviation,
          varname: matchingvar.name, buttonselected: event.target.value.slice(4,)});
          }
          else {
            this.setState({demselected: event.target.value[0], genderselected: event.target.value[2], buttonselected: event.target.value.slice(4,)})
          }
        }

        handleNewRaceDemClick(event){
          if (this.state.currentvar) {
            console.log("NewDem button clicked")
            const matchingvar = categories[this.state.varindex[0]].variables[this.state.varindex[2]]
            console.log("Matchingvar: " + matchingvar)
            var abbreviation = this.getabbreviation(matchingvar, event.target.value[0], this.state.genderselected)
            console.log("Abbreviation: " + abbreviation)
            // `P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`
            this.setState({demselected: event.target.value[0], varabbreviation: abbreviation,
          varname: matchingvar.name, buttonselected: event.target.value.slice(4,)});
          }
          else {
            this.setState({demselected: event.target.value[0],buttonselected: event.target.value.slice(4,)})
          }
        }

        handleNewGenderDemClick(event){
          if (this.state.currentvar) {
            console.log("NewDem button clicked")
            const matchingvar = categories[this.state.varindex[0]].variables[this.state.varindex[2]]
            console.log("Matchingvar: " + matchingvar)
            var abbreviation = this.getabbreviation(matchingvar, this.state.demselected, event.target.value[2])
            console.log("Abbreviation: " + abbreviation)
            // `P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`
            this.setState({ genderselected: event.target.value[2], varabbreviation: abbreviation,
          varname: matchingvar.name, buttonselected: event.target.value.slice(4,)});
          }
          else {
            this.setState({genderselected: event.target.value[2], buttonselected: event.target.value.slice(4,)})
          }
        }


        render(){
           const varbuttons = this.createButtons();
           const [everyonebuttons, dembuttons, everyonebutton] = this.createDemButtons();
           let match = this.props.match;
           let variables = [];
           let labels = [];
           if (this.state.currentvar){
            //  console.log(this.state.varlocation.index1)
            let matchingvar = categories[this.state.varlocation.index1].variables[this.state.varlocation.index2];

            if (this.state.racegender){
              let abbrev1 = this.getabbreviation(matchingvar, "W", "M");
              let abbrev2 = this.getabbreviation(matchingvar, "W", "F")
              let abbrev3 = this.getabbreviation(matchingvar, "B", "M")
              let abbrev4 = this.getabbreviation(matchingvar, "B", "F")
              variables = [abbrev1, abbrev2, abbrev3, abbrev4];
              labels = ["White Men", "White Women", "Black Men", "Black Women"];
            }
            else if (this.state.gender & !this.state.race){
              let abbrev1 = this.getabbreviation(matchingvar, "A", "M");
              let abbrev2 = this.getabbreviation(matchingvar, "A", "F");
              variables = [abbrev1, abbrev2];
              labels = ["Men", "Women"];

            }
            else if (this.state.gender & this.state.race){
              let abbrev1 = this.getabbreviation(matchingvar, "A", "M");
              let abbrev2 = this.getabbreviation(matchingvar, "A", "F");
              let abbrev3 = this.getabbreviation(matchingvar, "W", "A");
              let abbrev4 = this.getabbreviation(matchingvar, "B", "A");
              variables = [abbrev1, abbrev2, abbrev3, abbrev4];
              labels = ["Men", "Women", "White Population", "Black Population"];
            }
            else if(this.state.race) {
              let abbrev1 = this.getabbreviation(matchingvar, "W", "A");
              let abbrev2 = this.getabbreviation(matchingvar, "B", "A");
              variables = [abbrev1, abbrev2];
              labels = ["White Population", "Black Population"];
            }
          }
          console.log(variables, labels);
          console.log(this.state.varabbreviation)

            return (
                <Container fluid="True">
                {/* /* <h1>
Data Portal                </h1> */}
                 <Row className="justify-content-md-center">
                {/* <Router> */}
                   <ButtonToolbar> {varbuttons}
                   </ButtonToolbar>
                   {/* <Switch>
                    <Route strict path={`${match.path}/:varabbreviation`}
                    render={(routeProps) => (
                      <MapTest {...routeProps} datainput = {this.state.dataset} />
                      )}
                      />
                    </Switch>
                </Router> */}
                </Row>

                {/* <Row className="justify-content-center">
                  <Row className="justify-content-center">
                  {everyonebuttons}
                  {dembuttons}
                  </Row>
                  </Row> */}
                 
                 <section class="buttons">
                  <Row className="justify-content-center">
                  {everyonebutton}
                  </Row>
                 </section>

                  <p></p>
               
                  {/* <Row className="justify-content-md-center">
              
                  {racebuttons}
               
                  </Row>
                  <Row className="justify-content-md-center">
                    
                      {genderbuttons}
                
              
                                  </Row> */}


                {this.state.currentvar &&
            <MapTest datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname} group ={this.state.buttonselected}/>}
                 {this.state.currentvar && variables &&
            <DemographicMap className = "demmaps" variables = {variables} labels = {labels} datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname} group ={this.state.buttonselected}/>}
          </Container>
               
            )
        }
    }

    export default DropdownBootstrap;


    //P_High_school_graduate_(includes_equivalency)_E_F
//P_IBP_E_F
