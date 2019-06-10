import React, { Component } from 'react';
//wac
class Results extends Component {
    createResultsList(){
        let results = this.props.ResultsList.map((item, i) => <ul><a key={i}>{item}</a></ul>)
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
