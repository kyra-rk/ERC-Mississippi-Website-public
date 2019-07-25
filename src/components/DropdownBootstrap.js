import React, { Component } from 'react';
import { Button, Col, Row, DropdownButton, Dropdown, ButtonToolbar, Nav } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom';
import MapTest from '../pages/MapTest'
import '../styling/App.css';
import * as Papa from 'papaparse'

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
        'description' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

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
                vardesc: '',
                dataset: ''
            }
            this.createButtons = this.createButtons.bind(this)
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
    
        createButtons(){
            let data = this.state.dataset;
            let buttons =  categories.map((obj, index) => (
                    <DropdownButton
                        title={obj.catname}
                        variant={obj.variant.toLowerCase()}
                        id={`dropdown-variants-${obj.variant}`}
                        key={obj.variant}>
                    {obj.variables.map((item, i) => (
                        //  <Dropdown.Item eventKey={i} tag={Link} to={`${this.state.match.url}/${item.abbreviation}`}>{item.name}</Dropdown.Item>
                        //  <Dropdown.Item eventKey={i}><Link to={`${this.state.match.url}/${item.abbreviation}`}>{item.name}</Link></Dropdown.Item>
                         <Dropdown.Item eventKey={i}><Link to={{pathname: `${this.state.match.url}/${item.abbreviation}`, state: {varname: item.name, vardesc: item.description, dataset: {data} }}}>{item.name}</Link></Dropdown.Item>

                    ))}
                    </DropdownButton>
            ))
        
            return buttons;
        }


        render(){
           const buttons = this.createButtons()
           let match = this.props.match;
            return (
                <div>
                <h1>
              Dropdown Bootstrap
                </h1>
                
                <Router> 
                <Row className="justify-content-md-center">
                   <ButtonToolbar> {buttons}
                   </ButtonToolbar>
                   </Row>
                   <Switch>
                    <Route strict path={`${match.path}/:varabbreviation`} component={MapTest}/>
                    </Switch>
                </Router> 
               
                </div>
            )
        }
    }
    
    export default DropdownBootstrap;