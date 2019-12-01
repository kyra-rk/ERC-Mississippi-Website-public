import React, { Component } from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar, Col, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import MapTest from '../pages/MapTest'
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
    {'name': 'Other Race(s)',
    'abbreviation': 'O',
     'class': 'OtherRaces',
    'subgroup':
    [{
      'name':'Women',
      'abbreviation': 'F',
      'class': 'OtherRacesWomen',
      },
      {'name': 'Men',
    'abbreviation': 'M',
    'class': 'OtherRacesMen',}
    ]}]

class DropdownBootstrap extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentvar: false,
                match: this.props.match,
                varname: '',
                varabbreviation: '',
                vardesc: '',
                varindex: '',
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
            // this.componentDidMount = this.componentDidMount(this)
        }

        // componentDidMount() {
        //     for (var i=0; i<this.state.dataset.length; i++){
        //       var result = data_black.filter(obj => obj.Geography === this.state.dataset[i].Geography)
        //       this.state.dataset[i].P_IBP_B_M = result[0].Percent_IBP_Men
        //       this.state.dataset[i].P_IBP_B_F = result[0].Percent_IBP_Women
        //       result = data_white.filter(obj => obj.Geography === this.state.dataset[i].Geography)
        //       this.state.dataset[i].P_IBP_W_M = result[0].Percent_IBP_Men
        //       this.state.dataset[i].P_IBP_W_F = result[0].Percent_IBP_Women
        //     }

        // }

        createButtons(){
            let buttons =  categories.map((obj, index) => (
                    <DropdownButton
                        title={obj.catname}
                        variant={obj.variant.toLowerCase()} //Not necessarily needed
                        key={index}>
                    {obj.variables.map((item, i) => (
                          //Dropdown.Item refers to ever item within the dropdown
                         <Dropdown.Item eventKey={i} name={[index,i]} onClick={this.handleClick} key={i}>{item.name}</Dropdown.Item>
                    ))}

                    </DropdownButton>
            ))
            return buttons;
        }

        createDemButtons(){
          let everyonebutton =
          <Col lg={1}>
            <Row><Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>Everyone</Button></Row>
            <Row><Button key="Women" className = {`Women dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Women"? "selected": ""}`} id="Women" value={["A", "F", "Women"]} onClick={this.handleDemClick}>Women</Button></Row>
            <Row><Button key="Men" className = {`Men dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Men"? "selected": ""}`} id="Men" value={["A", "M", "Men"]} onClick={this.handleDemClick}>Men</Button></Row>

          </Col>
          let otherbuttons =
          demographics.map((group, index)=>(
            <Col lg={1}>
              <Row><Button id="dembutton" key={`${group.class}`} className = {`${group.class} dembutton ${this.state.race ? "available": "unavailable"} ${this.state.buttonselected=== group.class ? "selected": ""}`} value={[group.abbreviation, "A", group.class]} onClick={this.handleDemClick}>{group.name}</Button></Row>
                {group.subgroup.map((gender, i) => (
                 <Row> <Button key={`${gender.class}`} className = {`${gender.class} dembutton ${this.state.racegender ? "available": "unavailable"} ${this.state.buttonselected=== gender.class ? "selected": ""}`}  id={`${gender.name}`} value={[group.abbreviation, gender.abbreviation, gender.class]} onClick={this.handleDemClick}>{gender.name}</Button></Row>
                ))}
            </Col>
          ))
          return [everyonebutton, otherbuttons];
        }

        createNewDemButtons(){
          let racesButtons =
          <Row>
            <Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>All races</Button>
            <Button id="dembutton" key ="White" className={`White dembutton available ${this.state.buttonselected==="White"? "selected": ""}`} value={["A", "A", "White"]} onClick={this.handleDemClick}>White</Button>
            <Button id="dembutton" key ="Black" className={`Black dembutton available ${this.state.buttonselected==="Black"? "selected": ""}`} value={["A", "A", "Black"]} onClick={this.handleDemClick}>Black</Button>
            <Button id="dembutton" key ="OtherRaces" className={`OtherRaces dembutton available ${this.state.buttonselected==="OtherRaces"? "selected": ""}`} value={["A", "A", "OtherRaces"]} onClick={this.handleDemClick}>Other races</Button>
          </Row>
          let genderButtons =
          <Row>
            <Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>All genders</Button>
            <Button id="dembutton" key ="Women" className={`Women dembutton available ${this.state.buttonselected==="Women"? "selected": ""}`} value={["A", "F", "Women"]} onClick={this.handleDemClick}>Women</Button>
            <Button id="dembutton" key ="Men" className={`Men dembutton available ${this.state.buttonselected==="Men"? "selected": ""}`} value={["A", "M", "Men"]} onClick={this.handleDemClick}>Men</Button>
          </Row>
          return [racesButtons, genderButtons];
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

        handleClick(event){
          const matchingvar = categories[event.target.name[0]].variables[event.target.name[2]];
          var demselected = this.state.demselected;
          var genderselected = this.state.genderselected;
          var buttonselected = this.state.buttonselected;
          var error=false;
          if (this.state.genderselected!=="A" && this.state.demselected!=="A" && matchingvar.racegender===false){
            error = true;
            console.log("first condition")
          }
          else if (this.state.demselected !== "A"  && matchingvar.race === false){
            error = true;
            console.log("second condition")

          }
          else if (this.state.genderselected !== "A" && matchingvar.gender === false){
            error = true;
            console.log("third condition")

          }
          if (error === true){
            // this.setState({demselected: "A", genderselected: "A"});
            demselected = "A"
            genderselected = "A"
            if (document.getElementsByClassName(["selected"])[0]!==undefined){
              document.getElementsByClassName(["selected"])[0].classList.remove("selected");
              console.log("Removed selected")
            }
            document.getElementsByClassName(["Everyone"])[0].classList.add("selected");
            buttonselected = "Everyone"
            console.log("CHANGED")
          }
          var abbreviation = this.getabbreviation(matchingvar, demselected, genderselected);


          // var abbreviation = `P_${matchingvar.abbreviation}_${this.state.demselected}_${this.state.genderselected}`;
          // var abbreviation = "P_IBP_B_M";
          this.setState({currentvar: true, varindex: event.target.name, varname: matchingvar.name, varabbreviation: abbreviation,
            race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender, demselected: demselected, genderselected: genderselected, buttonselected: buttonselected})
        }

        handleDemClick(event){
          // if (document.getElementsByClassName(["selected"])[0]!==undefined){
          //   document.getElementsByClassName(["selected"])[0].classList.remove("selected");
          // }
          // (event.target).classList.add("selected");
          if (this.state.currentvar) {
            const matchingvar = categories[this.state.varindex[0]].variables[this.state.varindex[2]]
            var abbreviation = this.getabbreviation(matchingvar, event.target.value[0], event.target.value[2])
            // `P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`
            this.setState({demselected: event.target.value[0], genderselected: event.target.value[2], varabbreviation: abbreviation,
          varname: matchingvar.name, buttonselected: event.target.value.slice(4,)});
          }
          else {
            this.setState({demselected: event.target.value[0], genderselected: event.target.value[2], buttonselected: event.target.value.slice(4,)})
          }
        }


        render(){
           const varbuttons = this.createButtons();
           const [everyonebuttons, dembuttons] = this.createDemButtons();
           const [racesButtons, genderButtons] = this.createNewDemButtons();
           let match = this.props.match;
            return (
                <div>
                <h1>
Data Portal                </h1>
                 <Row className="justify-content-md-center">
                <Router>
                   <ButtonToolbar> {varbuttons}
                   </ButtonToolbar>
                   <Switch>
                    <Route strict path={`${match.path}/:varabbreviation`}
                    render={(routeProps) => (
                      <MapTest {...routeProps} datainput = {this.state.dataset} />
                      )}
                      />
                    </Switch>
                </Router>
                </Row>

                <Row className="justify-content-md-center">
                  <Col lg={3.5}></Col>
                  {everyonebuttons}
                  {dembuttons}
                  </Row>
                  <p></p>

                  <Row className="justify-content-md-center">
                  <Col lg={3.5}></Col>
               <Col lg={3.5}>
               {racesButtons}
               {genderButtons}
              </Col>
                </Row>



                {this.state.currentvar &&
            <MapTest datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname}/>}
                </div>
            )
        }
    }

    export default DropdownBootstrap;


    //P_High_school_graduate_(includes_equivalency)_E_F
//P_IBP_E_F
