import React, { Component } from 'react'
import '../styling/Map.css'
import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#fde8f4","#dfb9cf","#b76293","#79064b", "#30031e"]),
            variable: this.props.variable,
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.drawMap =this.drawMap.bind(this)
    }


    componentDidMount(){

    this.drawMap();
}

    drawMap() {
        // d3.selectAll("svg.singlevarsvg").remove();

        //Get the width of the column and make the svg the same size
        // let svgWidth = document.getElementsByClassName(["map"])[0].clientWidth
        // let svgWidth = 400;
        let svgWidth = this.props.width
        // var computedStyle = window.getComputedStyle(document.getElementsByClassName(["map"])[0], null)
        // svgWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        let svgHeight = this.props.height;
        
        //Create variables to store our state variables
        let variable = this.state.variable;
        let data = this.state.dataset;

        //Set projection info for the map to be placed accordingly
        const projection = d3.geoTransverseMercator()
        .rotate([88 + 50/60,-29 - 30/60])
        .fitExtent([[10, 10], [svgWidth-80, svgHeight-10]], json);

        var path = d3.geoPath().projection(projection);

        //Add SVG 
        
        var svg = d3.select(`.${this.props.className}`).append("svg")
                    .attr("class", "singlevarsvg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);
        
        //Update color domain to minimum and max of variable being visualized
        this.state.color.domain([
            d3.min(data, function(d){return parseFloat(d[variable]);}),
            d3.max(data, function(d){return parseFloat(d[variable]);})
        ]);
        let color = this.state.color;

        //Merge variable data into json
        for (var i =0; i<data.length;i++){
            var dataCounty = data[i].Id2;
            var dataValue = parseFloat(data[i][variable]).toFixed(2);
            for (var j = 0; j < json.features.length; j++) {
    
                var jsonCounty= json.features[j].properties.GEOID;
    
                if (dataCounty == jsonCounty) {
    
                    //Copy the data value into the JSON
                    json.features[j].properties[variable] = dataValue;
                    break;
    
                }
            }
        }

        var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);
        var arrow = d3.select("body").append("div")
            .attr("class", "arrow")
            .style("opacity", 0);

        //Create counties
        let counties = svg.selectAll("counties")
            .data(json.features)
            .enter()
            .append("path")
            .attr("class", function(d){
                return "counties county" + d.properties.NAME.replace(/\s+/g, '');
            })
            .attr("d", path)
            .style("fill", function(d) {
                    let value = undefined;
                    value = d.properties[variable];
                    return color(value)
                    // if (value!="NaN") {
                    //     defcolor = color(value)
                    //     return defcolor;
                    // } else {
                    //     console.log("ERROR")
                    //     return defcolor;
                    // }
            });
         
        counties.on("mouseover", function(d){
            d3.select(this).style('stroke', 'yellow').style('stroke-width', 5);
            div.transition()        
                .duration(200)      
                .style("opacity", .9);    
            arrow.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.properties.NAME + " County <br/>"  + d.properties[variable])  
                .style("left", (d3.event.pageX + 10) + "px")     
                .style("top", (d3.event.pageY - 70) + "px");    

            arrow.html("▼")
            .style("left", (d3.event.pageX + 6) + "px")     
            .style("top", (d3.event.pageY - 12) + "px")
        })
            .on("mouseout", function(d){
                d3.select(this).style('stroke', 'white').style('stroke-width', 1);
                div.transition()        
                    .duration(200)      
                    .style("opacity", 0);    
                arrow.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.selectAll("circle.county" + d.properties.NAME.replace(/\s+/g, ''))
                    .style("stroke", "none");
            });

            var x = d3.scaleLinear()
                .domain(color.domain())
                .rangeRound([.25*svgHeight, .75*svgHeight]);

            let loc = .8*svgWidth
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
                    .attr("y", function(d) { return x(d[0])+5; })
                    .attr("fill", "#000")
                    .attr("text-anchor", "start")
                    .text(function(d){return parseFloat(d[0]).toFixed(0)});

            g.append("text")
                .attr("class", "final labels")
                    .attr("x", 20)
                    .attr("y", x(color.domain()[1])+5)
                    .attr("fill", "#000")
                    .attr("text-anchor", "start")
                    .text(parseFloat(color.domain()[1]).toFixed(0));


    }

   render() {
    const className = this.props.className;
    console.log(className);
   return (
      <div className={className}>

   </div>
   )
   }
}

export default Map
