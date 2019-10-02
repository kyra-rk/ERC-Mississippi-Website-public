import React, { Component } from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar, Col, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import MapTest from '../pages/MapTest'
import '../styling/App.css';
import '../styling/dropdown.css'
// import '../styling/teststyling.css'
import data_general from '../data/data_general_ms.json';
import data_black from '../data/data_black.json'
import data_white from '../data/data_white.json'
import topic_categories from '../data/topic_categories';
// import '../styling/font-awesome.min.css'
// @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css")
// import Map from '../components/Map.js'

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
        'name':'Percentage with a high school degree education by county', 
        'abbreviation': 'High_school_graduate_(includes_equivalency)',
        'race': true,
        'gender': true,
        'racegender': true
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
              console.log(this.state.dataset[i])
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
                        //  <Dropdown.Item eventKey={({index},{i})} tag={Link} href={`${this.state.match.url}/${item.abbreviation}`}>{item.name}</Dropdown.Item>
                         <Dropdown.Item eventKey={i} name={[index,i]} onClick={this.handleClick} >{item.name}</Dropdown.Item>
                        // <Link to={}> <Dropdown.Item eventKey={i} tag={Link} href={`${this.state.match.url}/${item.abbreviation}`}>{item.name}</Dropdown.Item> </Link> 


                    ))}

                    </DropdownButton>
            ))
        // console.log(buttons)
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
              {/* <Dropdown.Menu show> */}
              <Row><Button id="dembutton" className = {`dembutton ${this.state.race ? "available": "unavailable"}`} value={[group.abbreviation, "B"]} onClick={this.handleDemClick}>{group.name}</Button></Row>
                {group.subgroup.map((gender, i) => (
                 <Row> <Button className = {`dembutton ${this.state.racegender ? "available": "unavailable"}`} id={`${gender.name}`} value={[group.abbreviation, gender.abbreviation]} onClick={this.handleDemClick}>{gender.name}</Button></Row>
                ))}
            {/* </Dropdown.Menu> */}
            </Col>
            // {this.props.showBulkActions ? 'show' : 'hidden'}
          ))
          // console.log(otherbuttons)
          return [everyonebutton, otherbuttons];
        }

        handleClick(event){
            // console.log("TRIGGERED")
            // console.log(event.target.name[2])
           const matchingvar = categories[event.target.name[0]].variables[event.target.name[2]]
            // var genderbool;
            // if (!matchingvar.gender){
            //     genderbool = false;
            // }
            
            var abbreviation = `P_${matchingvar.abbreviation}_${this.state.demselected}_${this.state.genderselected}`;
            console.log(abbreviation)
            this.setState({currentvar: true, varindex: event.target.name, varname: matchingvar.name, varabbreviation: abbreviation, 
            race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender})
        }

        handleDemClick(event){
          // console.log(event.target.value);
          document.getElementsByClassName(["selected"])[0].classList.remove("selected");
          (event.target).classList.add("selected");
          // console.log(this.state)
          if (this.state.currentvar) {
            const matchingvar = categories[this.state.varindex[0]].variables[this.state.varindex[2]]
            // console.log(matchingvar)
            
            console.log(`P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`);

            this.setState({demselected: event.target.value[0], genderselected: event.target.value[2], varabbreviation: `P_${matchingvar.abbreviation}_${event.target.value[0]}_${event.target.value[2]}`, 
          varname: matchingvar.name});
          console.log(this.state.varname)
            // `${this.state.varname}${this.state.race? event.target.value[0] }`
            // this.setState({varname: th})
          }
          // this.setState({currentvar: true, varname: })
        }


        render(){
           const varbuttons = this.createButtons();
           const [everyonebuttons, dembuttons] = this.createDemButtons();
          //  console.log(dembuttons)
           let match = this.props.match;
            return (
                <div>
                <h1>
              Dropdown Bootstrap
                </h1>
               {/* <Container> */}
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


    //P_High_school_graduate_(includes_equivalency)_E_F
//P_IBP_E_F
