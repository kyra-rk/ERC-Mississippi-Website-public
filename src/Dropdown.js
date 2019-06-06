import React, { Component } from 'react';
import './App.css';

class Dropdown extends Component {
    //props (property) when you pass data between component
    constructor(props){
        super(props); //super --> super class
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value}, console.log(event.target.value))
        this.props.makeSelection(this.state.value)
    }
    
    render() {
        return (
            <div>
                <label for="categorizeData">Select category of data</label>
                <select class="form-control" id="categorizeData" onChange = { this.handleChange }>
                    <option>Demographics</option>
                    <option>Education and Employment</option>
                    <option>Income and Earnings</option>
                    <option>Health</option>
                </select>
            </div>
        );
    }
}

export default Dropdown;