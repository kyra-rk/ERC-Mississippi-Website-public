
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

let data = 
[{name: "Income", 
vars: [{name: "Variable 1", icon: "Plus"}, {name: "Percent in Poverty", icon: "Plus"}]}, 
{name: "Education", 
vars: [{name: "Percent with high school degree", icon: "Plus"}, {name: "Variable 2", icon: "Plus"}]}

]



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
    let selectedbuttons = [{varname1: "", varabbreviation1: ""}, {varname2: "", varabbreviation2: ""}]
    // this.createButtons = this.createButtons.bind(this)
    this.handleClick = this.handleClick.bind(this)
}
// createButtons(){
//   //Maps categories to a new DropdownButton
//   let buttons =  categories.map((obj, index) => (
//           <DropdownButton
//               title={obj.catname}
//               variant={obj.variant.toLowerCase()}
//               key={index}>
//           {obj.variables.map((item, i) => (
//                <Dropdown.Item eventKey={i} onClick={this.handleClick.bind(this,index, i)} key={i}>{item.name}</Dropdown.Item>
//           ))}
//           </DropdownButton>
//   ))
//   return buttons;
// }

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

  handleClick(index, i){
    //console.log(event.target.value)
    console.log(index, i)
    const matchingvar = categories[index].variables[i];
    console.log(matchingvar)
    // var desc = matchingvar.description;
    // var longerdesc = matchingvar.longdesc;
    // console.log(desc)
    // const matchingvar = categories[].variables[event.target.name[2]]
    // var demselected = this.state.demselected;
    // var genderselected = this.state.genderselected;
    // var buttonselected = this.state.buttonselected;
    // console.log("This is the")
    // console.log(matchingvar.name)
    // var abbreviation = this.getabbreviation(matchingvar, demselected, genderselected);
    // if(this.selectedbuttons[0].varname1 != "" && this.selectedbuttons[1].varname2 == ""){
    //   this.selectedbuttons[1].varname2 = matchingvar.name
    //   this.selectedbuttons[1].varabbreviation2 = abbreviation
    // }
    // else if(this.selectedbuttons[0].varname1 == "" && this.selectedbuttons[1].varname2 != ""){
    //   this.selectedbuttons[0].varname1 = matchingvar.name
    //   this.selectedbuttons[0].varabbreviation1 = abbreviation
    // }
    // else if(this.selectedbuttons[0].varname1 == matchingvar.name){
    //   this.selectedbuttons[0].varname1 = ""
    //   this.selectedbuttons[0].varabbreviation1 = ""
    // }
    // else if(this.selectedbuttons[1].varname2 == matchingvar.name){
    //   this.selectedbuttons[1].varname2 = ""
    //   this.selectedbuttons[1].varabbreviation2 = ""
    // }
    // this.setState({currentvar: true, varname1: this.selectedbuttons[0].varname1,  varname2: this.selectedbuttons[1].varname2, varabbreviation1: this.selectedbuttons[0].varabbreviation1, varabbreviation2: this.selectedbuttons[1].varabbreviation2,
    //   race: matchingvar.race, gender: matchingvar.gender, racegender: matchingvar.racegender, demselected: demselected, genderselected: genderselected, buttonselected: buttonselected, vardesc: desc, varlongdesc: longerdesc})
  }

  render(){
    // let icon = Plus
    // if (varselected==="P_High_school_graduate_(includes_equivalency)_E_F") {
    //   icon = Dash}
    const cards = data.map((obj, index) => 
    <Card>
      <Card.Header>{obj.name}</Card.Header>
      {obj.vars.map((item, i) => {
        let icon = ""
        let itemName = item.name
        if (item.icon==="Plus"){

          icon = <AddCircleIcon value={itemName} onClick={this.handleClick}className="add"></AddCircleIcon>
          // icon = <Octicon className="plus" icon={Plus}></Octicon>
        }
        else {
          icon = <RemoveCircleIcon value={itemName} onClick={this.handleClick} className="minus"></RemoveCircleIcon>

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
               
                <ComparisonMap datainput = {this.state.dataset} variable ={"P_IBP_E_F"} variable2 = {"P_High_school_graduate_(includes_equivalency)_E_F"}varname = {"Poverty"} varname2 ={"High School Education"}/>

                </Container>
    </div>
    )
  }

}


export default Comparison
