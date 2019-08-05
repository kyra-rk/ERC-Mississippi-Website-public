/*Program file for the Data Portal Page*/
import React, { Component } from 'react';
import Dropdown from '../components/Dropdown'
import NewDropdown from '../components/NewDropdown'
//import DropdownBootstrap from '../components/DropdownBootstrap'
import {Container} from 'react-bootstrap';
import Results from '../components/Results'
import Map from '../components/Map'
//import * as Papa from 'papaparse';
import data_general from '../data/data_general_ms.json'

const demographics = [
    {
    'name':'Percentage of women by county', 
    'abbreviation': 'wbc',
    },
    {
      'name':'Percentage of black women by county', 
      'abbreviation': 'bwbc',
    },
    {
      'name':'Percentage of white women by county', 
      'abbreviation': 'wwbc',
    }
  ]

  const education_and_employment = [
    {
      'name':'Percentage of women with high school degree education by county', 
      'abbreviation': 'P_Female_High_school_graduate_(includes_equivalency)',
      'description' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      'name':'Percentage of women with some college or Associates degree education by county', 
      'abbreviation':  "P_Female_Some_college_or_associates_degree",
      'description': ''
    },
    {
      'name':'Percentage of women with Bachelors degree education by county', 
      'abbreviation': 'wcebc',
      'description': ''
    }
  ]
  
  class DataPortal extends Component {
    constructor(props){
      super(props);
      this.state = {ResultsList: [], currentvar: '', varname: '', vardesc: '', varChosen: false, dataset:data_general};
      this.makeSelection = this.makeSelection.bind(this)
      this.chooseVariable = this.chooseVariable.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
      let tempresults = {}
      // var results = Papa.parse("https://cdn.glitch.com/9464a98c-0c3d-4d5a-9f8e-6fb666dea3f2%2FData_General.csv?1552623990370", {
      //   header: true,
      //   download: true,
      //   complete: (results) => {
      //     // console.log(results);
      //     this.setState({dataset: results.data});
      //   }
      // })   
  }
  
    makeSelection(selection){
      let ResultsList = [...this.state.ResultsList]
        ResultsList = [];
        var i;
        if (selection === 'demographics'){
          ResultsList = demographics
        }
        else if (selection === 'education'){
          ResultsList = education_and_employment
        }
        this.setState({ResultsList: ResultsList, varChosen: false})
    }

    chooseVariable(selectedvar){
      this.setState({currentvar: selectedvar, varChosen: true});
      let ResultsList = [...this.state.ResultsList]
      for (var j = 0; j < this.state.ResultsList.length; j++) {
        var abbrv = ResultsList[j].abbreviation;
        if (selectedvar == abbrv) {
          console.log(ResultsList[j].description)
          this.setState({varname: ResultsList[j].name, vardesc: ResultsList[j].description});
          break;
        }
        // var jsonCounty= json.features[j].properties.GEOID;

        // if (dataCounty == jsonCounty) {

        //     //Copy the data value into the JSON
        //     json.features[j].properties[variable] = dataValue;
        //     break;

        // }
    }

    }
    
    render() {
      // console.log(this.state.dataset)
      return (
        <Container>
        <div className="DataPortal">
            <h1>
              Data Portal
            </h1>
            <Dropdown makeSelection = {this.makeSelection}/>
            {/* {!this.state.varChosen && <NewDropdown chooseVariable={this.chooseVariable}/>} */}
            {!this.state.varChosen && <Results ResultsList ={this.state.ResultsList} chooseVariable={this.chooseVariable}/>}
            {this.state.currentvar && this.state.varChosen &&
            <Map datainput = {this.state.dataset} variable = {this.state.currentvar} varname = {this.state.varname} vardesc = {this.state.vardesc}/>}
        </div>
        </Container>
      );
    }
  
  }
  
  export default DataPortal;