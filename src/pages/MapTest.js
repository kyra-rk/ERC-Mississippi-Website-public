import React, { Component } from 'react'
import * as Papa from 'papaparse'
import MapOriginal from '../components/Map'


class Map extends Component {
     constructor(props) {
            super(props);
            // this.state = {
            //     dataset: '',
            // //     currentvar: '',
            // //     match: this.props.match,
            // //     varname: '', 
            // //     vardesc: ''
            // }
            
        }
       
    
    render(){
        // const dataset = this.state.dataset;
        console.log(this.props.location.state);
        return (<div>
            <h1>MAPTEST</h1>
            <h1>{this.props.match.params.varabbreviation}</h1>
            <h1>{this.props.location.state.varname}</h1>
            <MapOriginal datainput = {this.props.location.state.dataset} variable = {this.props.match.params.varabbreviation} varname = {this.props.location.state.varname} vardesc = {this.props.location.state.vardesc}/>
        </div>)
    }
}
// const Map = ({props, match}) => (
//         <div>
//             <h1>MAPTEST</h1>
//             <h1>{match.params.varabbreviation}</h1>
//             <h1>{props.location.state}</h1>
//         </div>
// )

export default Map