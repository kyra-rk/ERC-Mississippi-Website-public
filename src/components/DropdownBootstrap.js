import React, { Component } from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar, Col, Button, Container } from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import MapTest from '../pages/MapTest'
import DemographicMap from '../components/DemographicMaps'
import ChildCareMap from '../components/ChildCareMap'
import '../styling/App.css';
import '../styling/Dropdown.css'
import data_general from '../data/data_general_ms.json';
// import datacomplete from '../data/datacomplete.json'
import datacomplete from '../data/Data_Complete_20210302-2.json'
import datacomplete2 from '../data/Data_Test_2022_12_23.json'
import data_black from '../data/data_black.json'
import data_white from '../data/data_white.json'
import categories from '../data/Metadata'
import categories2 from '../data/Metadata_2022_12_23'
import topic_categories from '../data/topic_categories';
import { throwStatement } from '@babel/types';
import {Steps} from 'intro.js-react';
import '../styling/introjs.css'
import { Fab, IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';
import { borderRight } from '@material-ui/system';
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
                childcare: false,
                currentvar: true,
                match: this.props.match,
                varname: "Population Estimates",
                varabbreviation: 'Female_Population',
                vardesc: '',
                varlongdesc: '',
                varlocation: {index1: 0, index2: 0},
                dataset: datacomplete2,
                race: true,
                gender: true,
                racegender: true,
                demselected: 'A',
                genderselected: 'F',
                buttonselected: 'Women',
                stepsEnabled: true,
                initialStep:0,
                steps: [
                  {
                    element: '.step1',
                    intro: 'Take this tour to understand how to use this tool. You can skip the tour by clicking on the Skip button. The first step to using this tool is selecting a category to explore and choosing a variable from it.',
                  },
                  {
                    element: '.step2',
                    intro: 'Choose a demographic here to see data only for that group. Choose everyone if you want to see the distribution for the whole population.',
                  },
                  {
                    element: '.step3',
                    intro: 'Choose one of these options to see data for the Black Population or the white population.',
                  },
                  {
                    element: '.step4',
                    intro: 'Choose one of these options to see data on Women or Men.',
                  },
                  {
                    element: '.step5',
                    intro: 'Choose one of these if you are interested in a subgroup of race and gender. Not all groups are available for all variables. Buttons will gray out if they are not available for certain variables.',
                  },
                  {
                    element: '.step6',
                    intro: 'Explore a map showing the distribution of the variable by County. Hover over a county to see its exact value.',
                    position: "right"
                  },
                  {
                    element: '.step7',
                    intro: 'This is a dotplot showing the distribution of the variable. Each circle corresponds to a single county. Each stack of circles corresponds to a range of values. Hover over a circle to see its exact value. Note that the axis does not always start at 0!',
                    position: "left",
                  },
                  {
                    element: '.step8',
                    intro: 'Get a quick summary of the variable by seeing the top 10 counties and their values here.',
                    position: 'left',
                  },
                  {
                    element: '.step9',
                    intro: 'See the variation in the variable by different demographic groups here. Note the title above each map to see what demographic is being represented. These will change according to what is available for a specific variable.',
                    position: "right",
                  },

                ],
            }
            this.createButtons = this.createButtons.bind(this)
            this.handleClick = this.handleClick.bind(this)
            this.createDemButtons = this.createDemButtons.bind(this)
            this.handleDemClick = this.handleDemClick.bind(this)
            this.handleChildCareClick = this.handleChildCareClick.bind(this)
        }

        handleChildCareClick(){
          this.setState({childcare: true, race: false,
            gender: false,
            racegender: false});
        }

        createButtons(){
            //Maps categories to a new DropdownButton
            let buttons =  categories2.map((obj, index) => (
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

          let everyonegridbutton =
          <Row className="justify-content-center">
          <Grid className = "step2" container xs = {8} sm={8} md={6} lg={4} >
            <Grid container className="Everyone" sm={4}>

            <Grid item xs ={12} sm={12} zeroMinWidth>
                     <Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>Everyone</Button>
            </Grid>
            </Grid>
            <Grid container className="Race step3" xs = {12} sm={8} >

            <Grid item xs = {6} sm={6}  zeroMinWidth>
            <Button id="dembutton" key ="White" className={`White dembutton ${this.state.buttonselected==="White"? "selected": ""} ${this.state.race ? "available": "unavailable"}`} value={["W", "A", "White"]} onClick={this.handleDemClick}>White</Button>
             </Grid>
            <Grid item xs = {6} sm={6}  zeroMinWidth >
            <Button id="dembutton" key ="Black" className={`Black dembutton ${this.state.buttonselected==="Black"? "selected": ""} ${this.state.race ? "available": "unavailable"}`} value={["B", "A", "Black"]} onClick={this.handleDemClick}>Black</Button>
            </Grid>
            </Grid>
            <Grid container className="Gender step4" sm={4} >
            <Grid item xs = {6} sm={12}>
              <Button id="genderbutton" key="Women" className = {`Women dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Women"? "selected": ""}`}  value={["A", "F", "Women"]} onClick={this.handleDemClick}>Women</Button>
            </Grid>
            <Grid item xs ={6} sm={12} >
            <Button id="genderbutton" key="Men" className = {`Men dembutton ${this.state.gender ? "available": "unavailable"} ${this.state.buttonselected==="Men"? "selected": ""}`} value={["A", "M", "Men"]} onClick={this.handleDemClick}>Men</Button>

                     {/* <Button id="dembutton" key ="Everyone" className={`Everyone dembutton available ${this.state.buttonselected==="Everyone"? "selected": ""}`} value={["A", "A", "Everyone"]} onClick={this.handleDemClick}>MEN</Button> */}
            </Grid>

            </Grid>
            <Grid container className="RaceGender step5" sm={8}  >
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
</Row>


          return [ everyonegridbutton];
        }

        getabbreviation(matchingvar, demselected, genderselected){
          // console.log("GET ABBREVIATION", demselected, genderselected, matchingvar.universe, matchingvar.type)
          var abbrev = "";
          console.log(matchingvar);
          abbrev = matchingvar.abbreviation + "_" + genderselected + "_" + demselected
          // var genderabbrev = "";
          // var totalabbrev = "";
          // if (matchingvar.type === "P"){
          //   abbrev+= "P_";
          // }
          // if (matchingvar.universe==="H"){
          //   if (genderselected==="F"){
          //     genderabbrev = "_FemaleNoHusband"
          //   }
          //   else if (genderselected==="M"){
          //     genderabbrev = "_MaleNoWife"
          //   }
          //   else if (genderselected==="A"){
          //     totalabbrev = "Total_"
          //   }
          //   abbrev= abbrev + totalabbrev + matchingvar.abbreviation + genderabbrev
          //   if (demselected !== "A"){
          //     abbrev += "_" + demselected;
          //   }
          // }
          // else if (matchingvar.universe==="I"){
          //   if (genderselected==="A"){
          //     genderabbrev= "Total_"
          //   }
          //   if (genderselected==="F"){
          //     genderabbrev = "Female_"
          //   }
          //   else if (genderselected==="M"){
          //     genderabbrev = "Male_"
          //   }
          //   abbrev = abbrev+ genderabbrev + matchingvar.abbreviation
          //   if (demselected !== "A"){
          //     abbrev += "_" + demselected;
          //   }
          // }
          console.log(abbrev)
          return abbrev;

        }

        handleClick(index,i, event){
          const matchingvar = categories2[index].variables[i];
          var desc = matchingvar.description;
          var longerdesc = matchingvar.longdesc;
          var demselected = this.state.demselected;
          var genderselected = this.state.genderselected;
          var buttonselected = this.state.buttonselected;
          var error=false;
          console.log("Single household info: ", matchingvar.race
          )
          if (this.state.genderselected!=="A" && this.state.demselected!=="A" && matchingvar.racegender===false){
            error = true;
          }
          else if (this.state.demselected !== "A"  && matchingvar.race === false){
            error = true;
          }
          else if (this.state.genderselected !== "A" && matchingvar.gender === false){
            error = true;
          }
          console.log("ERROR", error);
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

          this.setState({childcare: false, currentvar: true, varlocation: {index1: index,index2: i}, varname: matchingvar.name, varabbreviation: abbreviation,
            race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender, demselected: demselected, genderselected: genderselected, buttonselected: buttonselected, vardesc: desc, varlongdesc: longerdesc})
        }

        handleDemClick(event){
          if (this.state.currentvar) {
            const matchingvar = categories2[this.state.varlocation.index1].variables[this.state.varlocation.index2]
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
           const everyonebutton = this.createDemButtons();
           const {stepsEnabled,steps,initialStep} = this.state;
           let match = this.props.match;
           if (this.state.currentvar){
            //  console.log(this.state.varlocation.index1)
            let matchingvar = categories2[this.state.varlocation.index1].variables[this.state.varlocation.index2];
          }


            return (
                <Container fluid="True">
                {/* /* <h1>
Data Portal                </h1> */}
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onStart={this.onStart}
                    onExit={this.onExit}/>

                 <Row className="justify-content-center">
                {/* <Router> */}
                {/* <Col sm={1}></Col> */}
                <Col sm={12} lg={10}>
                   <ButtonToolbar className="step1"> {varbuttons}
                    <DropdownButton
                        title="Childcare"
                        variant={"info"}>
                         <Dropdown.Item onClick={this.handleChildCareClick}>CCDF Eligible Children</Dropdown.Item>
                    </DropdownButton>
                   </ButtonToolbar>
                   <section class="buttons">
                  <Row className="justify-content-center">
                  <Col lg={10}>{everyonebutton}</Col>
                  </Row>
                 </section>
                </Col>
                   <Col lg={12} className="demobutton">
                   <IconButton color="default" className="iconbutton" onClick={this.onStart}>
                      <HelpIcon color="primary" />
                      <p>Click here for Demo</p>
                    </IconButton>
                    </Col>
                   {/* <Switch>
                    <Route strict path={`${match.path}/:varabbreviation`}
                    render={(routeProps) => (
                      <MapTest {...routeProps} datainput = {this.state.dataset} />
                      )}
                      />
                    </Switch>
                </Router> */}
                </Row>


                {!this.state.childcare &&
            <MapTest datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname} group ={this.state.buttonselected} vardesc={this.state.vardesc} longdesc={this.state.varlongdesc}/>
          }
                 {this.state.childcare &&
                 <ChildCareMap />}
                 {/* {this.state.currentvar && variables &&
            <DemographicMap className = "demmaps" variables = {variables} labels = {labels} datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname} group ={this.state.buttonselected}/>} */}

          </Container>

            )
        }
        onStart = () => {
          this.setState(() => ({ stepsEnabled: true }));
        };

        onExit = () => {
          this.setState(() => ({stepsEnabled: false}));
        }
    }

    export default DropdownBootstrap;


    //P_High_school_graduate_(includes_equivalency)_E_F
//P_IBP_E_F
