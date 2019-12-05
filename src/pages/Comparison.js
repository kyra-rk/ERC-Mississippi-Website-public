import React, { Component } from 'react';
 import { Row, Dropdown, Container, Col, ButtonToolbar, Card, Button } from 'react-bootstrap';
 import AddCircleIcon from '@material-ui/icons/AddCircle';
 import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
 import Octicon, {Check, Plus, Dash} from '@primer/octicons-react';

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
    varselected: "P_High_school_graduate_(includes_equivalency)_E_F",
  };

  this.handleClick = this.handleClick.bind(this);
}


  handleClick(event){
    console.log(event.target)
    for (var i=0; i<2; i++){
      for (var j=0; j<2; j++){
        console.log(data[i].vars[j].name)
        if(data[i].vars[j].name===event.target.value){
          data[i].vars[j].icon=(data[i].vars[j].icon==="Plus")? "Minus":"Plus"
        }

      }
    }
    console.log(this.state.varselected)
    this.setState({varselected: event.target.value})
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
        <Button variant="outline-primary" key={i} onClick={this.handleClick} value={item.name}>{item.name} {icon}</Button>
      )})}
      </Card>
    )
    return (
<div>
        <Container>
	    <Row className="justify-content-center">
{cards}
                </Row>
               
                <ComparisonMap datainput = {data_general} variable ={"P_IBP_E_F"} variable2 = {"P_High_school_graduate_(includes_equivalency)_E_F"}varname = {"Poverty"} varname2 ={"High School Education"}/>

                </Container>
    </div>
    )
  }

}


export default Comparison
