import React, { Component } from 'react';
import './App.css';
import Dropdown from './Dropdown'
import Results from './Results'

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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {ResultsList: []};
    this.makeSelection = this.makeSelection.bind(this)
  }

  makeSelection(selection){
    let ResultsList = [...this.state.ResultsList]
      ResultsList = []
      if (selection === 'demographics'){
        for(i in demographics){
          ResultsList.push(demographics[i])
        }
      }
      else if (selection === 'education'){
        for (var i in education_and_employment){
          ResultsList.push(education_and_employment[i])
        }
      }
      this.setState({ResultsList: ResultsList})
  }
  
  render() {
    return (
      <div className="App">
          <h1>
            Data Portal
          </h1>
          <Dropdown makeSelection = {this.makeSelection}/>
          <Results ResultsList = {this.state.ResultsList} />
      </div>
    );
  }

}

export default App;
