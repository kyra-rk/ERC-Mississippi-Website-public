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



const dem_list = [
  {key: 1, id: "dembutton", name: "Everyone", race: "A", gender: "A", text: "Everyone"},
  {key: 2, id: "dembutton", name: "White", race: "W", gender: "A", text: "White"},
  {key: 3, id: "dembutton", name: "Black", race: "B", gender: "A", text: "Black"},
  {key: 4, id: "genderbutton", name: "Women", race: "A", gender: "F", text: "Women"},
  {key: 5, id: "genderbutton", name: "Men", race: "A", gender: "M", text: "Men"}, 
  {key: 6, id: "Women", name: "WhiteWomen", race: "W", gender: "F", text: "White Women"},
  {key: 7, id: "Women", name: "BlackWomen", race: "B", gender: "F", text: "Black Women"},
  {key: 8, id: "Men", name: "WhiteMen", race: "W", gender: "M", text: "White Men"},
  {key: 9, id: "Men", name: "BlackMen", race: "B", gender: "M", text: "Black Men"}
];

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
            // console.log(categories2)
            return buttons;
        }

        /**
         * Takes in a list of demographics and returns Grid wrapped buttons for those demographics only. 
         * Is used by createDemButtons() method.
         * @param {*} specificDems is a list of demographic names that should be included when returning buttons.
         * @param {*} xsGrid to set the xs = {} attribute for the Grid. 
         * @param {*} smGrid to set the sm = {} attribute for the Grid. 
         * @returns a list of Grid-wrapped buttons with the id, key, className, value and onClick methods 
         * associated with that demographic. See dem_list const at the top of the class. 
         */
        demListToButton(specificDems, xsGrid, smGrid) {
          // uses the Array.prototype.map() function to apply to all items in dem_list.
          return dem_list.map((dem) => {
            // if the button is in the specificDems list, then return it
            if (specificDems.indexOf(dem.name) !== -1) {
              return ( <Grid xs={xsGrid} sm={smGrid}>
                <Button 
                  id={dem.id} // the id for styling purposes
                  key={dem.name} // the key
                  className={`${dem.name} dembutton 
                    ${this.state.gender ? "available" : "unavailable"} 
                    ${this.state.buttonselected === dem.name ? "selected" : ""}`} // the className for styling purposes
                  value={[dem.race, dem.gender, dem.name]} // the value eg. ['A', 'A', 'Everyone]
                  onClick={this.handleDemClick} // the onClick handler 
                >
                  {dem.text} 
                </Button> </Grid> );
            }
            return null; // if not in the specificDems list, return null 
          });
        }

        /**
         * Splits demographic buttons into 4 groups: Everyone, Race, Gender, and RaceGender 
         * to follow along with demo and keep Everyone at the top as the window shortens.
         * @returns a Row component with Grid items for each demographic button.
         */
        createDemButtons(){
          let dem_buttons = (
            <Row className="justify-content-center">
              <Grid className="step2" container xs={8} sm={8} md={6} lg={4}>
                <Grid container className="Everyone" sm={4}>
                  {/* passes in a list of the demographics included in this section and the sm and xs attributes of the grid */}
                {this.demListToButton(["Everyone"], 12, 12)}
                </Grid>
                <Grid container className="Race step3" xs={12} sm={8}>
                  {this.demListToButton(["White", "Black"], 6, 6)}
                </Grid>
                <Grid container className="Gender step4" sm={4}>
                  {this.demListToButton(["Women", "Men"], 6, 12)}
                </Grid>
                <Grid container className="RaceGender step5" sm={8}>
                  {this.demListToButton(["WhiteWomen", "BlackWomen", "WhiteMen", "BlackMen"], 6, 6)}
                </Grid>
              </Grid>
            </Row>
          );

          return dem_buttons;
        }

        getabbreviation(matchingvar, demselected, genderselected){
          // console.log("GET ABBREVIATION", demselected, genderselected, matchingvar.universe, matchingvar.type)
          var abbrev = "";
<<<<<<< HEAD
          // console.log("matchingvar:" +  matchingvar);
=======
          // console.log(matchingvar);
>>>>>>> 08a491e897935ea588b56203e8b8ca785df85ed9
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
          // console.log(abbrev)
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
<<<<<<< HEAD
          // console.log("Single household info: ", matchingvar.race)
=======
>>>>>>> 08a491e897935ea588b56203e8b8ca785df85ed9
          if (this.state.genderselected!=="A" && this.state.demselected!=="A" && matchingvar.racegender===false){
            error = true;
          }
          else if (this.state.demselected !== "A"  && matchingvar.race === false){
            error = true;
          }
          else if (this.state.genderselected !== "A" && matchingvar.gender === false){
            error = true;
          }
<<<<<<< HEAD
          // console.log("ERROR", error);
=======
>>>>>>> 08a491e897935ea588b56203e8b8ca785df85ed9
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
            console.log(event.target.value) // A,F,Women --> race, gender, overall dem name
            {/* this.state.varlocation.index1 --> the number associated with the category */}
            {/* this.state.varlocation.index2 --> the number associated with the sub-topic */}
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
           const dembuttons = this.createDemButtons();
           const {stepsEnabled,steps,initialStep} = this.state;
           let match = this.props.match;
<<<<<<< HEAD
          //  if (this.state.currentvar){
          //   //  console.log(this.state.varlocation.index1)
          //   let matchingvar = categories2[this.state.varlocation.index1].variables[this.state.varlocation.index2];
          // }

          let variables = [];
          let labels = [];
          if (this.state.currentvar){
           //  console.log(this.state.varlocation.index1)
           let matchingvar = categories[this.state.varlocation.index1].variables[this.state.varlocation.index2];
           if (!this.state.varabbreviation in this.state.dataset[0]){
              // console.log
           }
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
=======
           if (this.state.currentvar){
            //  console.log(this.state.varlocation.index1)
            let matchingvar = categories2[this.state.varlocation.index1].variables[this.state.varlocation.index2];
            // console.log(matchingvar);
          }
>>>>>>> 08a491e897935ea588b56203e8b8ca785df85ed9

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
                  <Col lg={10}>{dembuttons}</Col>
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

<div className="demmapscontainer">
                {/* {this.state.currentvar &&
            <MapTest datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname} group ={this.state.buttonselected}/>} */}
                 {this.state.currentvar && variables &&
            <DemographicMap className = "demmaps" variables = {variables} labels = {labels} datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname} group ={this.state.buttonselected}/>}
</div>
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
