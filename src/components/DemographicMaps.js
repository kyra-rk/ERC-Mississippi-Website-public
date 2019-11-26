import React, { Component } from 'react'

import '../styling/Map.css'
import {Row, Col, Container} from 'react-bootstrap'
import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";
import { tsImportEqualsDeclaration } from '@babel/types';

class DemographicMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#fde8f4","#dfb9cf","#b76293","#79064b", "#30031e"]),
            variables: this.props.variables,
        };
        this.mapElement = React.createRef();
        this.componentDidMount = this.componentDidMount.bind(this)
        this.drawMap =this.drawMap.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.setUp =this.setUp.bind(this)
        this.insertLegend = this.insertLegend.bind(this)
    }


    componentDidMount(){

        const [width, height, projection, missing] = this.setUp();
        console.log("didmount: ", width)
        let variables = this.props.variables;
        let labels = this.props.labels;
        variables.forEach((obj, i) => this.drawMap(`.demmapclass${i}`, obj, width, height, projection))
        // this.drawMap
        // this.drawMap(".demmapclass1", variables[0], width, height, projection);
        // this.drawMap(".demmapclass2", variables[1], width, height, projection);
        // this.drawMap(".demmapclass3", variables[2], width, height, projection);
        // this.drawMap(".demmapclass4", variables[3], width, height, projection);
        this.insertLegend(missing);

}

    componentDidUpdate(prevProps){
        if (this.props.variables != prevProps.variables){
            const [width, height, projection, missing] = this.setUp();
            console.log("didupdate: ", width)
            let variables = this.props.variables;
            let labels = this.props.labels;
            variables.forEach((obj, i) => this.drawMap(`.demmapclass${i}`, obj, width, height, projection))

            // this.drawMap(".demmapclass1", this.props.variables[0],width, height, projection);
            // this.drawMap(".demmapclass2", variables[1], width, height, projection);
            // this.drawMap(".demmapclass3", variables[2], width, height, projection);
            // this.drawMap(".demmapclass4", variables[3], width, height, projection);
            this.insertLegend(missing);
        }
        
    }

    setUp() {
        var missing;
        // // let svgWidth = ReactDOM.findDOMNode(this.mapElement).width
        // let svgWidth = this.mapElement.current.clientWidth;
        let svgWidth = document.getElementsByClassName(["demmapclass0"])[0].clientWidth
        var computedStyle = window.getComputedStyle(document.getElementsByClassName(["demmapclass0"])[0], null)
        svgWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        var svgHeight;
        console.log(this.props.labels.length)
        if (this.props.labels.length==2){
            svgHeight = .75*svgWidth;
        }
        else {
            svgHeight = svgWidth*1.1;
        }
        // console.log(svgWidth, svgHeight)
        const projection = d3.geoTransverseMercator()
        .rotate([88 + 50/60,-29 - 30/60])
        .fitExtent([[10, 10], [svgWidth-10, svgHeight-10]], json);

        let variables = this.props.variables;
        let data = this.state.dataset;
        
        var max = d3.max(data, function(d){
            return Math.max(...variables.map((obj, i) => {return d[variables[i]];}));
        });
        var min = d3.min(data, function(d){
            return Math.min(...variables.map((obj, i) => {return d[variables[i]];}));
        });

        // console.log(min, max)
        let color = this.state.color
        color.domain([
            Math.floor(min),
            Math.ceil(max)
        ]);
        for (var i =0; i<data.length;i++){
            var dataCounty = data[i].Id2;
            // var dataValue = parseFloat(data[i][variable]).toFixed(2);
            for (var j = 0; j < json.features.length; j++) {
    
                var jsonCounty= json.features[j].properties.GEOID;
    
                if (dataCounty == jsonCounty) {
                    for (var k=0; k<variables.length; k++){
                    //Copy the data value into the JSON
                        var dataValue = parseFloat(data[i][variables[k]]).toFixed(2)
                        json.features[j].properties[variables[k]] = dataValue;
                        if (dataValue === "NaN"){
                            missing = true;
                        }
                    }
                    break;
    
                }
            }
        }
        return [svgWidth, svgHeight, projection, missing]
    }

    drawMap(selector, variable, svgWidth, svgHeight, projection) {
        // console.log("drawMap called for ", selector, variable)
        //Get the width of the column and make the svg the same size
        //Create variables to store our state variables
        let data = this.state.dataset;
        // let variable = this.state.variable;
        //Set projection info for the map to be placed accordingly
        var path = d3.geoPath().projection(projection);

        // console.log(selector)
        // console.log(selector.substring(1, selector.length))
        //Add SVG 
        d3.select(`${selector} svg`).remove();
    
       var svg = d3.select(selector).append("svg")
                    .attr("class", `${selector} svg`)
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);
        
        // var svg = d3.select(`${selector} svg`)
        
        //Update color domain to minimum and max of variable being visualized
        let color = this.state.color;

        //Merge variable data into json


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
                    // console.log(color(value))
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
                div.transition()        
                    .duration(200)      
                    .style("opacity", 0);    
                arrow.transition()
                    .duration(200)
                    .style("opacity", 0);
               

            });


    }

    insertLegend(missing){
        // let svgWidth = this.mapElement.current.clientWidth;

        let svgWidth = document.getElementsByClassName(["demmapclass0"])[0].clientWidth
        var computedStyle = window.getComputedStyle(document.getElementsByClassName(["demmapclass0"])[0], null)
        svgWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        svgWidth *= 2;
        let svgHeight = 50;


        d3.select(".legend.svg").remove();

        var svg = d3.select(".legend").append("svg")
        .attr("class", "legend svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

        
        var color =this.state.color;

        if (missing){
            var x = d3.scaleLinear()
            .domain(color.domain())
            .rangeRound([.25*svgWidth, .85*svgWidth]);
        }
        else {
            var x = d3.scaleLinear()
            .domain(color.domain())
            .rangeRound([.15*svgWidth, .85*svgWidth]);
        }
        

        
    let loc = .25*svgHeight
    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", `translate(0, ${loc})`);

    g.selectAll("rect")
        .data(color.range().map(function(d) {
            d = color.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
            }))
        .enter().append("rect")
            .attr("height", .25*svgHeight )
            .attr("x", function(d) { return x(d[0]); })
            .attr("width", function(d) {return x(d[1]) - x(d[0]); })
            .attr("fill", function(d) { return color(d[0]); })
            .attr("stroke", "purple")
            .attr("stroke-width", 1);


    g.selectAll("text")
        .data(color.range().map(function(d) {
            d = color.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .enter().append("text")
            .attr("class", "labels")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", .5*svgHeight)
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .text(function(d){return parseFloat(d[0]).toFixed(0)});

    g.append("text")
        .attr("class", "final labels")
            .attr("x", x(color.domain()[1]))
            .attr("y", .5*svgHeight )
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .text(parseFloat(color.domain()[1]).toFixed(0));
    


    if (missing){
        var diff = (x.range()[1] - x.range()[0])/5;

        g.append("text")
        .attr("class", "missing labels")
            .attr("x", x(color.domain()[0]) - diff)
            .attr("y",.5*svgHeight )
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .text("Missing");
        g.append("rect")
            .attr("height", .25*svgHeight )
            .attr("x",   x(color.domain()[0]) - diff)
            .attr("width", diff )
            .attr("fill", "steelblue")
            .attr("stroke", "purple")
            .attr("stroke-width", 1);;
    }
   
        }


   render() {
    //    console.log("TESTING");
    //    console.log(this.)
       
        const mapstest = this.props.labels.map(function(obj, i)
            {if (i!=0){
                return <Col>
                <Row className="justify-content-md-center"><div className="maptitle"><h1>{obj}</h1></div></Row>
                <Row><Col className={`demmapclass${i}`}></Col></Row>
     </Col>
            }}
        )
          
        
    // const maps = this.props.variables.map((obj) => 

    //    );
   return (
      <Container fluid="True">
       <Row className="rowblock">
            <Row>
                <Col>

               <div className="headerdiv"><h1 className="descriptionheader">Demographic Maps</h1></div>

            </Col>
            </Row>
            <Row>
            <Col>
              <div className="distexplanation">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
               {/* <p>Quick description here</p> */}
           </Col>
           </Row>
        </Row>
        {/* <Row className="rowblock"> */}
            <Col lg={{span: 12}}>
               <Row className="rowblock" >
                   
                   <Col>
                       <Row className="justify-content-md-center"><div className="maptitle"><h1> {this.props.labels[0]}</h1></div></Row>
                       <Row><Col className="demmapclass0"></Col></Row>
                   </Col>
                   {mapstest}
                   {/* <Col lg={{span: 3}}>
                       <Row className="justify-content-md-center"><div className="maptitle"><h1> Map 2</h1></div></Row>
                       <Row><Col className="demmapclass1"></Col></Row>
                   </Col>
                   <Col lg={{span: 3}}>
                       <Row className="justify-content-md-center"><div className="maptitle"><h1> Map 3</h1></div></Row>
                       <Row><Col className="demmapclass2"></Col></Row>
                   </Col>

                   <Col lg={{span: 3}}>
                       <Row className="justify-content-md-center"><div className="maptitle"><h1> Map 4</h1></div></Row>
                       <Row><Col className="demmapclass3"></Col></Row>
                   </Col> */}
               </Row>
               {/* <Row className="rowblock justify-content-md-center"><Col className="legend"></Col></Row> */}
           </Col>
       {/* </Row> */}
       </Container>
   )
   }
}

export default DemographicMaps
