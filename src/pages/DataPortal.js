/*Program file for the Data Portal Page*/
import React, { Component } from 'react';
import Dropdown from '../components/Dropdown'
import Results from '../components/Results'

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
      'name':'Percentage of women with college degree education by county', 
      'abbreviation': 'wcebc',
    },
    {
      'name':'Percentage of black women with college degree education by county', 
      'abbreviation': 'bwcebc',
    },
    {
      'name':'Percentage of white women with college degree education by county', 
      'abbreviation': 'wwcebc',
    }
  ]
  
  class DataPortal extends Component {
    constructor(props){
      super(props);
      this.state = {ResultsList: []};
      this.makeSelection = this.makeSelection.bind(this)
    }
  
    makeSelection(selection){
      let ResultsList = [...this.state.ResultsList]
        ResultsList = [];
        var i;
        if (selection === 'demographics'){
          for(i in demographics){
            ResultsList.push(demographics[i]['name'])
          }
        }
        else if (selection === 'education'){
          for (i in education_and_employment){
            ResultsList.push(education_and_employment[i]['name'])
          }
        }
        this.setState({ResultsList: ResultsList})
    }
    
    render() {
      return (
        <div className="DataPortal">
            <h1>
              Data Portal
            </h1>
            <Dropdown makeSelection = {this.makeSelection}/>
            <Results ResultsList = {this.state.ResultsList} />
        </div>
      );
    }
  
  }
  
  export default DataPortal;


