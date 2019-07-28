import React, { Component } from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom';
import MapTest from '../pages/MapTest'
import '../styling/App.css';


const categories = [
    {'catname': 'Demographics',
    'variant': 'Info',
    'open': false,
      'variables': 
      [{
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
        }],},
    {'catname': 'Education', 
    'variant': 'Warning',
    'open': false,
    'variables':
    [{
        'name':'Percentage of women with high school degree education by county', 
        'abbreviation': 'P_Female_High_school_graduate_(includes_equivalency)',
      },
      {
        'name':'Percentage of women with some college or Associates degree education by county', 
        'abbreviation': 'wscbc',
      },
      {
        'name':'Percentage of women with Bachelors degree education by county', 
        'abbreviation': 'wcebc',
      }]}]



class DropdownBootstrap extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentvar: '',
                match: this.props.match,
                varname: '', 
                vardesc: ''
            }
            this.createButtons = this.createButtons.bind(this)
    
        }


    
        createButtons(){
            let buttons =  categories.map((obj) => (
                    <DropdownButton
                        title={obj.catname}
                        variant={obj.variant.toLowerCase()}
                        id={`dropdown-variants-${obj.variant}`}
                        key={obj.variant}>
                    {obj.variables.map((item, i) => (
                         <Dropdown.Item eventKey={i} onClick={this.handleClick} tag={Link} href={`${this.state.match.url}/${item.abbreviation}`}>{item.name}</Dropdown.Item>
                        //  <Dropdown.Item eventKey={item.abbreviation} onClick={this.handleClick} >{item.name}</Dropdown.Item>

                    ))}
                    </DropdownButton>
            ))
        
            return buttons;
        }

        handleClick(event){
            console.log("TRIGGERED")
            // this.setState({currentvar: event.target.eventKey})
            // console.log(this.state)
            // return 
        }


        render(){
           const buttons = this.createButtons()
           let match = this.props.match;
            return (
                <div>
                <h1>
              Dropdown Bootstrap
                </h1>
                <Row className="justify-content-md-center">
                <Router> 
                   <ButtonToolbar> {buttons}
                   </ButtonToolbar>

                   <Switch>
                    <Route strict path={`${match.path}/:varabbreviation`} component={MapTest}/>
                    </Switch>
                </Router> 
                </Row>
                </div>
            )
        }
    }
    
    export default DropdownBootstrap;