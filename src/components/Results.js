/*Results component for Data Portal*/
import React, { Component } from 'react';

class Results extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
      }


    createResultsList(){
        let results = this.props.ResultsList.map((item, i) => <li key={i}><button onClick={this.handleClick} value={item.abbreviation}>{item.name}</button></li>)
        return results;
    }

    handleClick(event){
        this.props.chooseVariable(event.target.value)
    
    }


    render() { 
        const results = this.createResultsList()
        return (
            <ul>
                { results }
            </ul>
        );
    }
}

export default Results;
