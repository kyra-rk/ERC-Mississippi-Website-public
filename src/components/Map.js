import React, { Component } from 'react'
import './Map.css'
import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";
import csvdata from '../data/data_general_ms.csv';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#edc0da","#f9bbe0","#b2598e","#9b3070","#63053d"]),
            variable: this.props.variable
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.drawMap =this.drawMap.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }
    

    componentDidMount(){
    this.drawMap();
}

    componentDidUpdate(prevProps){

        if (this.props.variable != prevProps.variable){
            this.setState({variable: this.props.variable});
        }
        this.drawMap();
    }

    drawMap() {
        console.log(this.state);

        let svgWidth = 300;
        let svgHeight = 300;
        let variable = this.state.variable;
        let data = this.state.dataset;
        
        let projection = d3.geoTransverseMercator()
        .scale([2500])
        .translate([50+svgWidth/2,svgHeight-25])
        .rotate([88 + 50 / 60, -29 - 30 / 60]);
       
        var svg = d3.select("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
                    .attr('class','map');
        // debugger
        this.state.color.domain([
            d3.min(data, function(d){return parseFloat(d[variable]);}),
            d3.max(data, function(d){return parseFloat(d[variable]);})
        ]);
        let color = this.state.color;
        console.log(d3.min(data, function(d){return parseFloat(d[variable]);}))
        console.log(d3.max(data, function(d){return parseFloat(d[variable]);}))
        // console.log(this.state.color(30))
        var path = d3.geoPath().projection(projection);
        // console.log(data[1])
        for (var i =0; i<data.length;i++){
            var dataCounty = data[i].Id2;
            var dataValue = parseFloat(data[i][variable]).toFixed(2);
            // console.log(data[i])
            for (var j = 0; j < json.features.length; j++) {

                var jsonCounty= json.features[j].properties.GEOID;

                if (dataCounty == jsonCounty) {

                    //Copy the data value into the JSON
                    json.features[j].properties[variable] = dataValue;
                    break;

                }
            }
        }
        
        // let counties = undefined;
        // // console.log(this.state.color)
        let counties = svg.selectAll("counties")
            .data(json.features)
            .enter()
            .append("path")
            .attr("class", "counties")
            .attr("d", path)
            .style("fill", function(d) {
                // console.log(d)
                    let value = undefined;
                    // console.log(d.properties[variable])
                    value = d.properties[variable];
                    // console.log(value)
                    if (value) {
                        //If value exists…
                        return color(value);
                    } else {
                        //If value is undefined…
                        return "#ccc";
                    }
            });
        counties.on("mouseover", function(d){
        
            svg.append("rect")
                    .attr("class", "tooltip")
                    .attr("x", path.centroid(d)[0])
                    .attr("y", path.centroid(d)[1]-5)

                    .attr("fill","white")
                    .attr("opacity", 0.7);
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
            .on("mouseout", function(){
            svg.select("text.tooltiptext").remove();
            svg.select("rect.tooltip").remove();
            });     
    }

   render() {

   return <svg></svg>
   }
}

export default Map