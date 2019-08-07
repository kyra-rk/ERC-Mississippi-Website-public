import React, { Component } from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar, Col, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import MapTest from '../pages/MapTest'
import '../styling/App.css';
import '../styling/Dropdown.css'
import data_general from '../data/data_general_ms.json';
import data_black from '../data/data_black.json'
import data_white from '../data/data_white.json'
import topic_categories from '../data/topic_categories';
import Octicon, {Check} from '@primer/octicons-react';

const demographics = [
    {'name': 'White',
    'abbreviation': 'W',
    'subgroup': 
    [{
      'name':'Women', 
      'abbreviation': 'F',
      },
      {'name': 'Men', 
    'abbreviation': 'M'}
    ]},
    {'name': 'Black',
    'abbreviation': 'B',
    'subgroup': 
    [{
      'name':'Women', 
      'abbreviation': 'F',
      },
      {'name': 'Men', 
    'abbreviation': 'M'}
    ]},
    {'name': 'Other Race(s)',
    'abbreviation': 'O',
    'subgroup': 
    [{
      'name':'Women', 
      'abbreviation': 'F',
      },
      {'name': 'Men', 
    'abbreviation': 'M'}
    ]}]


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
        'name':'Percentage of Demographic Group with high school degree education by county', 
        'abbreviation': 'High_school_graduate_(includes_equivalency)',
        'race': true,
        'gender': true,
        'racegender': false
      },
      {
        'name':'Percentage of Demographic Group with some college or Associates degree education by county', 
        'abbreviation': "Some_college_or_associates_degree",
        'race': true,
        'gender': true,
        'racegender': true
      },
      {
        'name':'Percentage of women with Bachelors degree education by county', 
        'abbreviation': 'wcebc',
      }]},
      {'catname': 'Health',
      'variant': 'success',
        'variables': 
        [{
          'name':'Percentage with Health Insurance Coverage', 
          'abbreviation': 'NoHealthInsurance',
          'race': true,
          'gender': true,
          'racegender': false,
          },
          {
            'name':'Percentage with Public Health Insurance Coverage', 
            'abbreviation': 'NoHealthInsurance',
            'race': true,
            'gender': true,
            'racegender': false,
            },
            {
              'name':'Percentage with Private Health Insurance Coverage', 
              'abbreviation': 'NoHealthInsurance',
              'race': true,
              'gender': true,
              'racegender': false,
              },
          ],},
        {'catname': 'Income',
          'variant': 'Danger',
          'variables': 
          [{
            'name': 'Percent of Demographic Group with Income Below Poverty',
            'abbreviation': 'IBP',
            'race': true,
            'gender': true,
            'racegender': true,
          },
          {
            'name': 'Median Earnings',
            'abbreviation': 'IBP',
            'race': true,
            'gender': true,
            'racegender': true,
          },
          {
            'name': 'Gender Wage Gap',
            'abbreviation': 'IBP',
            'race': true,
            'gender': true,
            'racegender': true,
          },
        ],

        }]



class DropdownBootstrap extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentvar: false,
                match: this.props.match,
                varname: '', 
                varabbreviation: '',
                vardesc: '',
                varindex: '',
                dataset: data_general,
                race: true,
                gender: true,
                racegender: true,
                demselected: 'E',
                genderselected: 'F',
            }
            this.createButtons = this.createButtons.bind(this)
            this.handleClick = this.handleClick.bind(this)
            this.createDemButtons = this.createDemButtons.bind(this)
            this.handleDemClick = this.handleDemClick.bind(this)
            this.componentDidMount = this.componentDidMount(this)
        }

        componentDidMount() {
            for (var i=0; i<this.state.dataset.length; i++){
              var result = data_black.filter(obj => obj.Geography == this.state.dataset[i].Geography)
              this.state.dataset[i].P_IBP_B_M = result[0].Percent_IBP_Men
              this.state.dataset[i].P_IBP_B_F = result[0].Percent_IBP_Women
              result = data_white.filter(obj => obj.Geography == this.state.dataset[i].Geography)
              this.state.dataset[i].P_IBP_W_M = result[0].Percent_IBP_Men
              this.state.dataset[i].P_IBP_W_F = result[0].Percent_IBP_Women
            }

        }
    
        createButtons(){
            let buttons =  categories.map((obj, index) => (
                    <DropdownButton
                        title={obj.catname}
                        variant={obj.variant.toLowerCase()}
                        id={`dropdown-variants-${obj.variant}`}
                        key={obj.variant}>
                    {obj.variables.map((item, i) => (
                         <Dropdown.Item eventKey={i} name={[index,i]} onClick={this.handleClick} >{item.name}</Dropdown.Item>
                    ))}

                    </DropdownButton>
            ))
            return buttons;
        }

        createDemButtons(){
          let everyonebutton = 
          <Col lg={1}>
            <Row><Button id="dembutton" className="dembutton available" value={["E", "B"]} onClick={this.handleDemClick}>Everyone</Button></Row>
            <Row><Button className = {`dembutton ${this.state.gender ? "available selected": "unavailable"}`} id="Women" value={["E", "F"]} onClick={this.handleDemClick}>Women</Button></Row>
            <Row><Button className = {`dembutton ${this.state.gender ? "available": "unavailable"}`}id="Men" value={["E", "M"]} onClick={this.handleDemClick}>Men</Button></Row>

          </Col>
          let otherbuttons =
          demographics.map((group, index)=>(
            <Col lg={1}>
              <Row><Button id="dembutton" className = {`dembutton ${this.state.race ? "available": "unavailable"}`} value={[group.abbreviation, "B"]} onClick={this.handleDemClick}>{group.name}</Button></Row>
                {group.subgroup.map((gender, i) => (
                 <Row> <Button className = {`dembutton ${this.state.racegender ? "available": "unavailable"}`} id={`${gender.name}`} value={[group.abbreviation, gender.abbreviation]} onClick={this.handleDemClick}>{gender.name}</Button></Row>
                ))}
            </Col>
          ))
          return [everyonebutton, otherbuttons];
        }

        handleClick(event){
           const matchingvar = categories[event.target.name[0]].variables[event.target.name[2]]
            var genderbool;
            if (!matchingvar.gender){
                genderbool = false;
            }
            
            var abbreviation = `P_${matchingvar.abbreviation}_${this.state.demselected}_${this.state.genderselected}`;
            this.setState({currentvar: true, varindex: event.target.name, varname: matchingvar.name, varabbreviation: abbreviation, gender: genderbool, 
            race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender})
        }

        handleDemClick(event){
          document.getElementsByClassName(["selected"])[0].classList.remove("selected");
          (event.target).classList.add("selected");
          if (this.state.currentvar) {
            const matchingvar = categories[this.state.varindex[0]].variables[this.state.varindex[2]]
            this.setState({demselected: event.target.value[0], genderselected: event.target.value[2], varabbreviation: `P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`, 
          varname: matchingvar.name});
          }
        }


        render(){
           const varbuttons = this.createButtons();
           const [everyonebuttons, dembuttons] = this.createDemButtons();
           let match = this.props.match;
            return (
                <div>
                <h1>
              Dropdown Bootstrap
                </h1>
                 <Row className="justify-content-md-center">
                <Router> 
                   <ButtonToolbar> {varbuttons}
                   </ButtonToolbar>
                   <Switch>
                    <Route strict path={`${match.path}/:varabbreviation`} 
                    render={(routeProps) => (
                      <MapTest {...routeProps} datainput = {this.state.dataset} />
                      )}
                      />
                    </Switch>
                </Router> 
                </Row>
                <br></br>
                <Row className="justify-content-md-center">
                  <Col lg={3.5}></Col>
                  {everyonebuttons}
               {dembuttons}
               <Col lg={3.5}></Col>
                </Row>
                {this.state.currentvar &&
            <MapTest datainput = {this.state.dataset} variable ={this.state.varabbreviation} varname = {this.state.varname}/>}
                </div>
            )
        }
    }
    
    export default DropdownBootstrap;