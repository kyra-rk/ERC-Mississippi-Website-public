import React, { Component } from 'react'
import '../styling/Map.css'
import {Row, Col, Container, Jumbotron, ThemeProvider} from 'react-bootstrap'
import { DropdownButton, Dropdown, ButtonToolbar,Button } from 'react-bootstrap';
import Octicon, {Check} from '@primer/octicons-react';

import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#edc0da","#f9bbe0","#b2598e","#9b3070","#63053d"]),
            color2: d3.scaleQuantile().range(["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"]),
            variable: this.props.variable,
            variablename: this.props.varname1,
            variable2: this.props.variable2,
            variablename2: this.props.varname2,
            variabledescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.drawMap =this.drawMap.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }
    

    componentDidMount(){
        console.log(this.state)

    this.drawMap();
}

    componentDidUpdate(prevProps){

        if (this.props.variable != prevProps.variable){
            this.setState({variable: this.props.variable, variablename: this.props.varname});
        }
        // console.log("REDRAWING")
        this.drawMap();
    }

    drawMap() {
        // console.log("REDRAWING")
        d3.selectAll("svg.comparisonmap").remove();
        let svgWidth = document.getElementsByClassName(["mapclass"])[0].clientWidth
        let svgHeight = svgWidth;
        // let svgWidth = 300;
        // let svgHeight = 300;
        let variable = this.state.variable;
        let variable2 = this.state.variable2;
        let data = this.state.dataset;
        
        var center = d3.geoCentroid(json)
        let projection = d3.geoTransverseMercator()
        .scale([3000])
        .translate([.5*svgWidth,.75*svgHeight])
        .rotate([88 + 50 / 60, -29 - 30 / 60]);
       console.log(center)
        var svg = d3.select(".mapclass").append("svg")
                    .attr("class", "comparisonmap")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);

        this.state.color.domain([
            d3.min(data, function(d){return parseFloat(d[variable]);}),
            d3.max(data, function(d){return parseFloat(d[variable]);})
        ]);

        this.state.color2.domain([
            d3.min(data, function(d){return parseFloat(d[variable2]);}),
            d3.max(data, function(d){return parseFloat(d[variable2]);})
        ]);
        let color = this.state.color;
        let color2 = this.state.color2;
        var path = d3.geoPath().projection(projection);

        for (var i =0; i<data.length;i++){
            var dataCounty = data[i].Id2;
            var dataValue = parseFloat(data[i][variable]).toFixed(2);
            var dataValue2 = parseFloat(data[i][variable2]).toFixed(2);
            for (var j = 0; j < json.features.length; j++) {

                var jsonCounty= json.features[j].properties.GEOID;

                if (dataCounty == jsonCounty) {

                    //Copy the data value into the JSON
                    json.features[j].properties[variable] = dataValue;
                    json.features[j].properties[variable2] = dataValue2;

                    break;

                }
            }
        }
        
        let counties = svg.selectAll("counties")
            .data(json.features)
            .enter()
            .append("path")
            .attr("class", function(d){
                // console.log(d.properties.NAME);
                return "counties county" + d.properties.NAME;
            //    return "county" + d.
            })
            .attr("d", path)
            .style("fill", function(d) {
                    let value = undefined;
                    value = d.properties[variable];
                    if (value) {
                        return color(value);
                    } else {
                        return "#ccc";
                    }
            });
        counties.on("mouseover", function(d){
        
            svg.append("rect")
                    .attr("class", "tool")
                    .attr("x", path.centroid(d)[0])
                    .attr("y", path.centroid(d)[1]-5)
                    .attr("width", 140)
                    .attr("height", 40)
                    .style('fill',"white")
                    .style("opacity", .7);

            svg.append("text")
            .attr("class", "tooltiptext")
            .attr("x", path.centroid(d)[0] + 20)
            .attr("y", path.centroid(d)[1] + 10)
            .attr("fill","black")
                .append('tspan')
                .attr('x', path.centroid(d)[0]+ 20)
                .attr('y', path.centroid(d)[1]+ 13)
            .attr("class", "name")
                .text(d.properties.NAME + " County")
                .append('svg:tspan')
                .attr("class", "value")
                .attr('x', path.centroid(d)[0]+ 33)
                .attr('y', path.centroid(d)[1] + 30)
                .text(d.properties[variable]);

            })
            .on("mouseout", function(d){
            svg.select("text.tooltiptext").remove();
            svg.select("rect.tool").remove();
                
            });     

            var x = d3.scaleLinear()
            .domain(color.domain())
            .rangeRound([.25*svgHeight, .75*svgHeight]);

            let loc = .75*svgWidth
            var g = svg.append("g")
                .attr("class", "key")
                .attr("transform", `translate(${loc},0)`);
            
                g.selectAll("rect")
       .data(color.range().map(function(d) {
           d = color.invertExtent(d);
           if (d[0] == null) d[0] = x.domain()[0];
           if (d[1] == null) d[1] = x.domain()[1];
           return d;
         }))
       .enter().append("rect")
         .attr("width", 10 )
         .attr("y", function(d) { return x(d[0]); })
         .attr("height", function(d) { return x(d[1]) - x(d[0]); })
         .attr("fill", function(d) { return color(d[0]); });


    g.selectAll("text")
    .data(color.range().map(function(d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))
      .enter().append("text")
          .attr("class", "labels")
          .attr("x", 20)
          .attr("y", function(d) { return x(d[0])+15; })
          .attr("fill", "#000")
          .attr("text-anchor", "start")
          .text(function(d){return parseFloat(d[0]).toFixed(2)+ "%"});

      

           // console.log("REDRAWING")

        // let svgWidth = 300;
        // let svgHeight = 300;
        
       
        var svg = d3.select(".mapclass2").append("svg")
                    .attr("class", "comparisonmap")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);

                //     var svg3 = d3.select(".distribution").append("svg")
                // .attr("width", width + margin2.left + margin2.right)
                // .attr("height", height + margin2.top + margin2.bottom)
                // .append("g")
                    // .attr('class','map');
        var path2 = d3.geoPath().projection(projection);

        let counties2 = svg.selectAll("counties")
            .data(json.features)
            .enter()
            .append("path")
            .attr("class", function(d){
                // console.log(d.properties.NAME);
                return "counties county" + d.properties.NAME;
            //    return "county" + d.
            })
            .attr("d", path2)
            .style("fill", function(d) {
                    let value = undefined;
                    value = d.properties[variable2];
                    if (value) {
                        return color2(value);
                    } else {
                        return "#ccc";
                    }
            });
        counties2.on("mouseover", function(d){
        
            svg.append("rect")
                    .attr("class", "tool")
                    .attr("x", path2.centroid(d)[0])
                    .attr("y", path2.centroid(d)[1]-5)
                    .attr("width", 140)
                    .attr("height", 40)
                    .style('fill',"white")
                    .style("opacity", .7);

            svg.append("text")
            .attr("class", "tooltiptext")
            .attr("x", path2.centroid(d)[0] + 20)
            .attr("y", path2.centroid(d)[1] + 10)
            .attr("fill","black")
                .append('tspan')
                .attr('x', path2.centroid(d)[0]+ 20)
                .attr('y', path2.centroid(d)[1]+ 13)
            .attr("class", "name")
                .text(d.properties.NAME + " County")
                .append('svg:tspan')
                .attr("class", "value")
                .attr('x', path2.centroid(d)[0]+ 33)
                .attr('y', path2.centroid(d)[1] + 30)
                .text(d.properties[variable2]);

            })
            .on("mouseout", function(d){
            svg.select("text.tooltiptext").remove();
            svg.select("rect.tool").remove();
                
            });     

            var x2 = d3.scaleLinear()
            .domain(color2.domain())
            .rangeRound([.25*svgHeight, .75*svgHeight]);

            var g2 = svg.append("g")
                .attr("class", "key")
                .attr("transform", `translate(${loc},0)`);
            
                g2.selectAll("rect")
       .data(color2.range().map(function(d) {
           d = color2.invertExtent(d);
           if (d[0] == null) d[0] = x2.domain()[0];
           if (d[1] == null) d[1] = x2.domain()[1];
           return d;
         }))
       .enter().append("rect")
         .attr("width", 10 )
         .attr("y", function(d) { return x2(d[0]); })
         .attr("height", function(d) { return x2(d[1]) - x2(d[0]); })
         .attr("fill", function(d) { return color2(d[0]); });


    g2.selectAll("text")
    .data(color2.range().map(function(d) {
        d = color2.invertExtent(d);
        if (d[0] == null) d[0] = x2.domain()[0];
        if (d[1] == null) d[1] = x2.domain()[1];
        return d;
      }))
      .enter().append("text")
          .attr("class", "labels")
          .attr("x", 20)
          .attr("y", function(d) { return x2(d[0])+15; })
          .attr("fill", "#000")
          .attr("text-anchor", "start")
          .text(function(d){return parseFloat(d[0]).toFixed(2)+ "%"});
                
    }

   render() {

   return (
    // <Container>
       <Row className="rowblock">
           <Col lg={{span: 12}}>
               <Row noGutters={true}>
                   
                   <Col  lg={{span: 5, offset: 1}} className="mapclass">
                       <h1>{this.state.variablename}</h1> {/* <svg class="map"></svg> */}
                   </Col>
                   <Col  lg={{span: 5, offset: 1}} className="mapclass2">
                   <h1>{this.state.variablename2}</h1> {/* <svg class="map"></svg> */}
                   </Col>
               </Row>

           </Col>
       </Row>
    //  </Container>
   )
   }
}

export default Map