
import React, { Component } from 'react';
 import { Row, DropdownButton, Dropdown, Container, Col, ButtonToolbar, Card, Button } from 'react-bootstrap';
 import AddCircleIcon from '@material-ui/icons/AddCircle';
 import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
 import Octicon, {Check, Plus, Dash} from '@primer/octicons-react';
import datacomplete from '../data/datacomplete.json'
import categories from '../data/Metadata'
 import data_general from '../data/data_general_ms.json';
import ComparisonMap from '../components/ComparisonMaps'
import styling from '../styling/Comparison.css'
const varselected = "P_High_school_graduate_(includes_equivalency)_E_F"

// let data = 
// [{name: "Income", 
// vars: [{name: "Variable 1", icon: "Plus"}, {name: "Percent in Poverty", icon: "Plus"}]}, 
// {name: "Education", 
// vars: [{name: "Percent with high school degree", icon: "Plus"}, {name: "Variable 2", icon: "Plus"}]}

// ]



class Comparison extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentvar: true,
      match: this.props.match,
      varname1: "",
      varname2: "",
      varabbreviation1: "",
      varabbreviation2: "",
      varlocation: {index1: 0, index2: 0},
      dataset: datacomplete,
      race: true,
      gender: true,
      racegender: true,
      demselected: 'A',
      genderselected: 'F',
      buttonselected: 'Women',
    }
    this.selectedbuttons = {var1: {varname1: "", varabbreviation1: ""}, var2:{varname2: "", varabbreviation2: ""}}
    this.handleClick = this.handleClick.bind(this)
}

  // handleClick(event){
  //   console.log(event.target)
  //   for (var i=0; i<2; i++){
  //     for (var j=0; j<2; j++){
  //       console.log(data[i].vars[j].name)
  //       if(data[i].vars[j].name===event.target.value){
  //         data[i].vars[j].icon=(data[i].vars[j].icon==="Plus")? "Minus":"Plus"
  //       }

  //     }
  //   }
  //   console.log(this.state.varselected)
  //   this.setState({varselected: event.target.value})
  // }
  getabbreviation(matchingvar, demselected, genderselected){
    var abbrev = "";
    var genderabbrev = "";
    var totalabbrev = "";
    if (matchingvar.type === "P"){
      abbrev+= "P_";
    }
    if (matchingvar.universe==="H"){
      if (genderselected==="F"){
        genderabbrev = "_FemaleNoHusband"
      }
      else if (genderselected==="M"){
        genderabbrev = "_MaleNoWife"
      }
      else if (genderselected==="A"){
        totalabbrev = "Total_"
      }
      abbrev= abbrev + totalabbrev + matchingvar.abbreviation + genderabbrev
      if (demselected !== "A"){
        abbrev += "_" + demselected;
      }
    }
    else if (matchingvar.universe==="I"){
      if (genderselected==="A"){
        genderabbrev= "Total_"
      }
      if (genderselected==="F"){
        genderabbrev = "Female_"
      }
      else if (genderselected==="M"){
        genderabbrev = "Male_"
      }
      abbrev = abbrev+ genderabbrev + matchingvar.abbreviation
      if (demselected !== "A"){
        abbrev += "_" + demselected;
      }
    }
    return abbrev;

  }

  handleClick(index, i, event){
    //console.log(event.target.value)
    console.log(index, i)
    const matchingvar = categories[index].variables[i];
    console.log(matchingvar)
    // const matchingvar = categories[].variables[event.target.name[2]]
    var demselected = this.state.demselected;
    var genderselected = this.state.genderselected;
    var buttonselected = this.state.buttonselected;
    console.log("This is the")
    console.log(matchingvar.name)
    console.log(this.selectedbuttons.var1.varname1)
    var abbreviation = this.getabbreviation(matchingvar, demselected, genderselected);
    if(this.selectedbuttons.var1.varname1 === ""){
      this.selectedbuttons.var1.varname1 = matchingvar.name
      this.selectedbuttons.var1.varabbreviation1 = abbreviation
    }
    else if(this.selectedbuttons.var2.varname2 === "" && this.selectedbuttons.var1.varname1 !== matchingvar.name){
      console.log("SHOULD UPDATE SECOND VAR")
      this.selectedbuttons.var2.varname2 = matchingvar.name
      this.selectedbuttons.var2.varabbreviation2 = abbreviation
    }
    else if(this.selectedbuttons.var1.varname1 === matchingvar.name){
      this.selectedbuttons.var1.varname1 = ""
      this.selectedbuttons.var1.varabbreviation1 = ""
    }
    else if(this.selectedbuttons.var2.varname2 === matchingvar.name){
      this.selectedbuttons.var2.varname2 = ""
      this.selectedbuttons.var2.varabbreviation2 = ""
    }
    // console.log(event.target)
    // for (var i=0; i<2; i++){
    //   for (var j=0; j<2; j++){
    //     console.log(data[i].vars[j].name)
    //     if(data[i].vars[j].name===event.target.value){
    //       data[i].vars[j].icon=(data[i].vars[j].icon==="Plus")? "Minus":"Plus"
    //     }

    //   }
    // }
    // console.log(this.state.varselected)
    console.log("This is the second var at the moment!")
    console.log(this.selectedbuttons.var2.varname2)
    this.setState({currentvar: true, varname1: this.selectedbuttons.var1.varname1,  varname2: this.selectedbuttons.var2.varname2, varabbreviation1: this.selectedbuttons.var1.varabbreviation1, varabbreviation2: this.selectedbuttons.var2.varabbreviation2,
      race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender, demselected: demselected, genderselected: genderselected, buttonselected: buttonselected})
    console.log("UPDATED state")
    console.log(this.state)
  }

  render(){
    // let icon = Plus
    // if (varselected==="P_High_school_graduate_(includes_equivalency)_E_F") {
    //   icon = Dash}
    const cards = categories.map((obj, index) => 
    <Card>
      <Card.Header>{obj.catname}</Card.Header>
      {obj.variables.map((item, i) => {
        let icon = ""
        let itemName = item.name
        if (item.icon==="Plus"){

          icon = <AddCircleIcon value={itemName} onClick={this.handleSelection}className="add"></AddCircleIcon>
          // icon = <Octicon className="plus" icon={Plus}></Octicon>
        }
        else {
          icon = <RemoveCircleIcon value={itemName} onClick={this.handleSelection} className="minus"></RemoveCircleIcon>

          // icon = <Octicon className="minus" icon={Dash}></Octicon>
        }
        return (
        <Button variant="outline-primary" key={i} onClick={() => this.handleClick(index, i)} value={item.name}>{item.name} {icon}</Button>
      )})}
      </Card>
    )
    return (
<div>
        <Container>
	    <Row className="justify-content-center">
{cards}
                </Row>
               
                <ComparisonMap datainput = {this.state.dataset} variable ={this.state.varabbreviation1} variable2 = {this.state.varabbreviation2}varname = {this.state.varname1} varname2 ={this.state.varname2}/>

                </Container>
    </div>
    )
  }

}


export default Comparison
