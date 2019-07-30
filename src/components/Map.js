import React, { Component } from 'react'
import '../styling/Map.css'
import {Row, Col } from 'react-bootstrap'
import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";
//import csvdata from '../data/data_general_ms.csv';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#edc0da","#f9bbe0","#b2598e","#9b3070","#63053d"]),
            variable: this.props.variable,
            variablename: this.props.varname,
            variabledescription: this.props.vardesc
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
        let svgWidth = document.getElementsByClassName(["mapclass"])[0].clientWidth
        let svgHeight = svgWidth;
        // let svgWidth = 300;
        // let svgHeight = 300;
        let variable = this.state.variable;
        let data = this.state.dataset;
        
        var center = d3.geoCentroid(json)
        let projection = d3.geoTransverseMercator()
        .scale([3000])
        .translate([.45*svgWidth,.85*svgHeight])
        .rotate([88 + 50 / 60, -29 - 30 / 60]);
       
        var svg = d3.select("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
                    .attr('class','map');
        this.state.color.domain([
            d3.min(data, function(d){return parseFloat(d[variable]);}),
            d3.max(data, function(d){return parseFloat(d[variable]);})
        ]);
        let color = this.state.color;
        var path = d3.geoPath().projection(projection);

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


            d3.selectAll("rect.county" + d.properties.NAME)
                .attr("opacity", .7);
            })
            .on("mouseout", function(d){
            svg.select("text.tooltiptext").remove();
            svg.select("rect.tool").remove();
            d3.selectAll("rect.county" + d.properties.NAME)
                .attr("opacity", 1);
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
          .text(function(d){return parseFloat(d[0]).toFixed(2)*100+ "%"});

      let originaldata = data;
      console.log(originaldata)
       data = data.sort(function (a, b) {
        //    console.log(b[variable]);
        //    console.log(a);
          return b[variable]-a[variable];
           // return d3.ascending(a.Percent_IBP_Women, b.Percent_IBP_Women);
        })
              
          // data = data.slice(0, 10); 
              
               data = data.filter(function(d,i){
        return i < 10;
       });
           
       var margin2 = {
        top: 15,
        right: 30,
        bottom: 15,
        left: 90
    };
  
  var width =svgWidth - margin2.left - margin2.right;
  var height = svgHeight - margin2.top - margin2.bottom;
  
  var svg2 = d3.select(".tablemap").append("svg")
        .attr("width", width + margin2.left + margin2.right)
        .attr("height", height + margin2.top + margin2.bottom)
        .append("g")
        // .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


       var x_bar = d3.scaleLinear()
       .range([0.2*svgWidth, .65*svgWidth])
       .domain([0,  d3.max(data, function(d){
         return parseFloat(d[variable]).toFixed(2)*100;
       })
       ]);
                 
         var y_ax = d3.scaleBand()
       .range([.05*svgHeight, .95*svgHeight])
       .domain(data.map(function (d, i) {
        //    console.log(d.Geography);
         return d.Geography.substring(0,d.Geography.length-20);}))
         .padding(0.05);
                 
                  var yAxis = d3.axisLeft(y_ax)
               //no tick marks
               .tickSize(0);
                 
                  var gy = svg2.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate (" + .2*svgWidth+ " 0)")
               .call(yAxis);
                

                 var bars = svg2.selectAll("bar")
               .data(data)
               .enter()
               .append("g");
                 
                 bars.append("rect")
               .attr("class", function(d, i){
                //    console.log(d.Geography.substring(0,d.Geography.length-20));
                   return "bar county" + d.Geography.substring(0,d.Geography.length-20);
               })
               .attr("y", function (d, i) {
                   
                   return y_ax(d.Geography.substring(0,d.Geography.length-20));
               })
               .attr("height", y_ax.bandwidth())
               .attr("x", .2*svgWidth)
               .attr("width", function (d) {
                   return x_bar(d[variable]*100);
               });
                 
               bars.append("text")
               .attr("class", "label_bar")
               .attr("fill", "black")
               //y position of the label is halfway down the bar
               .attr("y", function (d,i) {
                   return y_ax(d.Geography.substring(0,d.Geography.length-20)) + y_ax.bandwidth() / 2 + 4;
               })
               //x position is 3 pixels to the right of the bar
               .attr("x", function (d) {
                   return x_bar(d[variable]*100) + .22*svgWidth;
               })
               .text(function (d) {
                //    console.log(d.Geography.substring(0,d.Geography.length-20));
                   return d3.format(".1f")(d[variable]*100);
               });
               
               bars.on("mouseover", function(d){
                   d3.selectAll("path.county" + d.Geography.substring(0,d.Geography.length-20))
                   .attr("opacity", .7)
                   .style("stroke-width",3 );
                
                })
                .on("mouseout", function(d){
                    d3.selectAll("path.county" + d.Geography.substring(0,d.Geography.length-20))
                    .attr("opacity", 1)
                    .style("stroke-width",1);
                })

              
                var svg3 = d3.select(".distribution").append("svg")
                .attr("width", width + margin2.left + margin2.right)
                .attr("height", height + margin2.top + margin2.bottom)
                .append("g")

                const x_dotplot = d3.scaleLinear()
                        .rangeRound([0, width])
                        .domain([d3.min(originaldata, function(d){
                            return parseFloat(d[variable]);
                          }), d3.max(originaldata, function(d){
                            return parseFloat(d[variable]);
                          })
                          ]);
                
                const nbins = 8;

                var histogram = d3.histogram()
                .domain(x.domain())
                .thresholds(x.ticks(nbins))
                .value(function(data) {return parseFloat(data[variable]);});
                
                // console.log(histogram)
                // const bins = histogram(originaldata).map(d => console.log(d));
                // console.log(bins)

                const bins = histogram(originaldata).filter(d => d.length>0);
                // const bins = histogram(data)
                // console+.log(bins);
                let binContainer = svg3.selectAll(".gBin")
                            .data(bins);

                let binContainerEnter = binContainer.enter()
                .append("g")
                    .attr("class", "gBin")
                    .attr("transform", d => `translate(${x(d.x0)}, ${height})`);

                binContainerEnter.selectAll("circle")
                    .data(d => console.log(d)); 
                //     d.map((p, i) => {
                //         // console.log(d);
                //       return {idx: i,
                //               name: p.Name,
                //               value: p.Value,
                //               radius: (x(d.x1)-x(d.x0))/2
                //             }
                //     }))
                //   .enter()
                //   .append("circle")
                //     .attr("class", "enter")
                //     .attr("cx", 0) //g element already at correct x pos
                //     .attr("cy", function(d) {
                //         return - d.idx * 2 * d.radius - d.radius; })
                //     .attr("r", 10)
                    // .on("mouseover", tooltipOn)
                    // .on("mouseout", tooltipOff)
                    // .transition()
                    //   .duration(500)
                    //   .attr("r", function(d) {
                    //   return (d.length==0) ? 0 : d.radius; });      

                
    }

   render() {

   return (
    <Container-fluid>
       <Row className="rowblock">
           <Col lg={3} className="description">
              <h1> {this.state.variablename}</h1>
               <p>{this.state.variabledescription}</p>
           </Col>
           <Col lg={{span: 9}}>
               <Row>
                   <Col  lg={{span: 5, offset: 1}} className="mapclass">
                        <svg></svg>
                   </Col>
                   <Col lg={{span: 5, offset: 1}} className="tablemap">
                        
                   </Col>
               </Row>
               <Row className="rowblock">
                   <Col lg ={{span: 11, offset: 1}} className="distribution"></Col>
               </Row>
           </Col>
       </Row>
     </Container-fluid>
   )
   }
}

export default Map