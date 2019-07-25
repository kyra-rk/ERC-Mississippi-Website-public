import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import '../styling/App.css';
import '../styling/NewDropdown.css';

let catdata = [
    {'catname': 'Demographics',
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



class NewDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: catdata,
            category: '',
            listOpen: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
        this.chooseVariable = this.chooseVariable.bind(this)
    }

    createButtons(){
        
        let buttons = this.state.categories.map((obj, index) =>
        <Col lg={2}> <Button variant="outline-info" onClick={this.handleClick} value={obj.catname}>{obj.catname}</Button>
      <div>
      {obj.open && <ul className="dd-list">
        {obj.variables.map((item) => (
            <li className="dd-list-item" key={`${item.abbreviation}`}><Button variant="outline-info" onClick={this.chooseVariable} value={item.abbreviation}>{item.name}</Button></li>
        ))}
      </ul>}
      </div>
      </Col>
      )
      return buttons;

    }

    handleClick(event){
        // this.props.chooseVariable(event.target.value)
        console.log("HANDLECLICK")
        for (var i =0;i<this.state.categories.length; i++){
            if (this.state.categories[i].catname== event.target.value){
                this.state.categories[i].open = !this.state.categories[i].open;
                this.setState({listOpen: true, category: this.state.categories[i].catname}, ()=>{
                    document.addEventListener('click', this.closeMenu);
                })
            }
            else {
                this.state.categories[i].open = false;
            }
        }
        
        this.setState({categories: this.state.categories});
        // this.props.categories.
    }

    closeMenu(){
        console.log("CLOSE")
        for (var i =0;i<this.state.categories.length; i++){
            if (this.state.categories[i].catname== this.state.category){
                this.state.categories[i].open = false;
                this.setState({listOpen: false, category:''}, ()=>{
                    document.removeEventListener('click', this.closeMenu);
                })
            }
        }
            this.setState({categories: this.state.categories});
    }

    chooseVariable(event){
        this.props.chooseVariable(event.target.value)
    
    }
    render(){
        const buttons = this.createButtons()
        return (
            <Row className="justify-content-md-center">
            
                {buttons}
            
            </Row>
        )
    }
}

export default NewDropdown;