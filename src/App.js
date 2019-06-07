import React, { Component } from 'react';
import './App.css';
import Dropdown from './Dropdown'
import Results from './Results'

const demographics = ['sample1', 'sample2', 'sample3']
const education_and_employment = ['sample4', 'sample5', 'sample6']


class App extends Component {
  constructor(props){
    super(props);
    this.state = {ResultsList: []};
    this.makeSelection = this.makeSelection.bind(this)
  }

  makeSelection(selection){
    let ResultsList = [...this.state.ResultsList]
      if (selection === 'demographics'){
        ResultsList.push(demographics)
      }
      else if (selection === 'education'){
        ResultsList.push(education_and_employment)
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
