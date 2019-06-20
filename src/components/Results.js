/*Results component for Data Portal*/
import React, { Component } from 'react';

class Results extends Component {
    createResultsList(){
        let results = this.props.ResultsList.map((item, i) => <ul key={i}>{item}</ul>)
        return results
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
