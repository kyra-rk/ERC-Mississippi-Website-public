/*Program file for the Data Portal Page*/
import React, { Component } from 'react';
import Dropdown from '../components/Dropdown'
import Results from '../components/Results'
import Map from '../components/Map'
import * as Papa from 'papaparse'

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
      'abbreviation': 'P_Female_High_school_graduate_(includes_equivalency)'
    },
    {
      'name':'Percentage of women with some college or Associates degree education by county', 
      'abbreviation': 'wscbc',
    },
    {
      'name':'Percentage of women with Bachelors degree education by county', 
      'abbreviation': 'wcebc',
    }
  ]
  
  class DataPortal extends Component {
    constructor(props){
      super(props);
      this.state = {ResultsList: [], currentvar: '', varChosen: false};
      this.makeSelection = this.makeSelection.bind(this)
      this.chooseVariable = this.chooseVariable.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
      let tempresults = {}
      var results = Papa.parse("https://cdn.glitch.com/9464a98c-0c3d-4d5a-9f8e-6fb666dea3f2%2FData_General.csv?1552623990370", {
        header: true,
        download: true,
        complete: (results) => {
          // console.log(results);
          this.setState({dataset: results.data});
        }
      })   
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

    }
    
    render() {
      return (
        <div className="DataPortal">
            <h1>
              Data Portal
            </h1>
            <Dropdown makeSelection = {this.makeSelection}/>
            {!this.state.varChosen && <Results ResultsList ={this.state.ResultsList} chooseVariable={this.chooseVariable}/>}
            {this.state.currentvar && this.state.varChosen &&
            <Map datainput = {this.state.dataset} variable = {this.state.currentvar}/>}
        </div>
      );
    }
  
  }
  
  export default DataPortal;


