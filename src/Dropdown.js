import React, { Component } from 'react';
import './App.css';

class Dropdown extends Component {
    //props (property) when you pass data between component
    constructor(props){
        super(props); //super --> super class
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    handleSubmit(event){
        alert('Your selected category is: ' + this.state.value);
        event.preventDefault();
        this.props.makeSelection(this.state.value)
    }
    
    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <label for="categorizeData">Select category of data</label>
                <select class="form-control" id="categorizeData" onChange = { this.handleChange }>
                    <option value='demographics'>Demographics</option>
                    <option value='education'>Education and Employment</option>
                    <option value='income'>Income and Earnings</option>
                    <option value='health'>Health</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Dropdown;