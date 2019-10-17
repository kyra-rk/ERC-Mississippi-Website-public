import React, { Component } from 'react'
import '../styling/Map.css'
import {Row, Col, Container} from 'react-bootstrap'
import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#fde8f4","#dfb9cf","#b76293","#79064b", "#30031e"]),
            variable: this.props.variable,
            variablename: this.props.varname,
            variabledescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
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
            this.setState({variable: this.props.variable, variablename: this.props.varname});
        }
        this.drawMap();
    }

    drawMap() {
        d3.selectAll("svg").remove();
        let svgWidth = document.getElementsByClassName(["mapclass"])[0].clientWidth
        // let svgHeight = document.getElementsByClassName(["mapclass"])[0].clientHeight
        let svgHeight = svgWidth/1.3
        // let newsvgHeight = svgWidth
        console.log(svgWidth)
        // let svgHeight = svgWidth;
        let variable = this.state.variable;
        let data = this.state.dataset;
        
        var center = d3.geoCentroid(json)
        let projection = d3.geoTransverseMercator()
        .scale([4800])
        .translate([.55*svgWidth,1.1*svgHeight])
        .rotate([88 + 50 / 60, -29 - 30 / 60]);
       
        var svg = d3.select(".mapclass").append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);
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
                return "counties county" + d.properties.NAME.replace(/\s+/g, '');
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


            d3.selectAll("circle.county" + d.properties.NAME.replace(/\s+/g, ''))
                .style("stroke", "yellow")
                .style("stroke-width", 3);
            })
            .on("mouseout", function(d){
            svg.select("text.tooltiptext").remove();
            svg.select("rect.tool").remove();
            d3.selectAll("circle.county" + d.properties.NAME.replace(/\s+/g, ''))
                .attr("opacity", 1)
                .style("stroke", "none");
                
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
          .text(function(d){return parseFloat(d[0]).toFixed(0)});

      let originaldata = data;
       data = data.sort(function (a, b) {
          return b[variable]-a[variable];
           // return d3.ascending(a.Percent_IBP_Women, b.Percent_IBP_Women);
        })
              
        data = data.filter(function(d,i){
        return i < 10;
       });
           
       var margin2 = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    var newsvgWidth = document.getElementsByClassName(["distribution"])[0].clientWidth
    // let svgHeight = document.getElementsByClassName(["mapclass"])[0].clientHeight
//    svgHeight = svgWidth/1.3
  var newwidth =newsvgWidth - margin2.left - margin2.right;
  var width = svgWidth - margin2.left - margin2.right;
  var height = svgHeight - margin2.top - margin2.bottom;
  
  var svg2 = d3.select(".tablemap").append("svg")
        .attr("width", width + margin2.left + margin2.right)
        .attr("height", height + margin2.top + margin2.bottom)
        .append("g")


       var x_bar = d3.scaleLinear()
       .range([0.2*svgWidth, .65*svgWidth])
       .domain([0,  d3.max(data, function(d){
         return parseFloat(d[variable]).toFixed(2);
       })
       ]);
                 
         var y_ax = d3.scaleBand()
       .range([.05*svgHeight, .95*svgHeight])
       .domain(data.map(function (d, i) {
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
                   return "bar county" + d.Geography.substring(0,d.Geography.length-20);
               })
               .attr("y", function (d, i) {
                   
                   return y_ax(d.Geography.substring(0,d.Geography.length-20));
               })
               .attr("height", y_ax.bandwidth())
               .attr("x", .2*svgWidth)
               .attr("width", function (d) {
                   return x_bar(d[variable]);
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
                   return x_bar(d[variable]) + .22*svgWidth;
               })
               .text(function (d) {
                   return d3.format(".1f")(d[variable]);
               });
               
               bars.on("mouseover", function(d){
                   d3.selectAll("path.county" + d.Geography.substring(0,d.Geography.length-20).replace(/\s+/g, ''))
                   .attr("opacity", .7)
                   .style("stroke-width",3 )
                   .style("fill", "yellow")
                   .style("stroke", "yellow");
                   d3.selectAll("circle.county" + d.Geography.substring(0,d.Geography.length-20).replace(/\s+/g, ''))
                .style("stroke", "yellow")
                .style("stroke-width", 3);
                
                })
                .on("mouseout", function(d){
                    d3.selectAll("path.county" + d.Geography.substring(0,d.Geography.length-20).replace(/\s+/g, ''))
                    .attr("opacity", 1)
                    .style("stroke-width",1)
                    .style("fill",function(d) {
                        let value = undefined;
                        value = d.properties[variable];
                        if (value) {
                            return color(value);
                        } else {
                            return "#ccc";
                        }
                })
                    .style("stroke", "white")
                    ;
                    d3.selectAll("circle.county" + d.Geography.substring(0,d.Geography.length-20))
                    .attr("opacity", 1)
                    .style("stroke", "none");
                })

                
                var svg3 = d3.select(".distribution").append("svg")
                .attr("width", newwidth + margin2.left)
                .attr("height", height + margin2.top + margin2.bottom)
                .append("g")
                const minval = d3.min(originaldata, function(d){
                    return parseFloat(d[variable]);
                  });
                const maxval = d3.max(originaldata, function(d){
                    return parseFloat(d[variable]);
                  });

//                 const nearest = Math.pow(10, Math.floor(Math.log10(maxval-minval)))
                var rounding = 10
                if (maxval>10000){
                    rounding = 10000
                }
                if (maxval>1000){
                    rounding = 1000
                }
                const min = Math.floor(minval/rounding)*rounding;
                console.log(min)
                const max = Math.ceil(maxval/rounding)*rounding;
                console.log(max)
                var bindist = Math.floor((max-min)/10)
                // bindist = Math.ceil(bindist/(rounding/10))*(rounding/10);
                console.log(bindist)
                const thresholds = []
                
                var val=0
                i=0
                while (val<max){
                    // console.log(val, max)
                    thresholds[i] = min+bindist*(i+1)
                    val = thresholds[i]
                    i+=1
                }
                const x_dotplot = d3.scaleLinear()
                        .rangeRound([margin2.left*6,  newwidth])
                        .domain([min, max]);
//                 const nbins = 10;
                
                var histogram = d3.histogram()
                .domain(x_dotplot.domain())
                .thresholds(thresholds)
                .value(function(data) {return parseFloat(data[variable]);});

                const bins = histogram(originaldata).filter(d => d.length>0);
                console.log(bins);
                var maxinabin = d3.max(bins, function(d){return d.length})

                var maxy = Math.ceil(maxinabin/10)*10;
                var y_dotplot = d3.scaleLinear()
                .rangeRound([height-margin2.bottom, 0 ])
                .domain([0,maxy]);
                var yradius = (y_dotplot(0) - y_dotplot(1)-1)/2
                var xradius = (x_dotplot(min + (bins[0].x1 - bins[0].x0))-x_dotplot(min))/2
                console.log(yradius, xradius)
                var radius = Math.min(xradius, yradius)
                console.log(radius)

                var ylimit = (radius*2)*maxy
                 y_dotplot.rangeRound([height-margin2.bottom*3, height-ylimit]);

                let binContainer = svg3.selectAll(".gBin")
                            .data(bins);
                
                let adjustheight = height - margin2.bottom
                svg3.append("g")
                .attr("class", "axis--x")
                .attr("transform", "translate(0," + (adjustheight-margin2.bottom*2) + ")")
                .call(d3.axisBottom(x_dotplot).ticks(thresholds.length));
              
                                  svg3.append("g")
                                  .attr("class", "axis--y")
                                  .attr("transform", "translate(" + margin2.left*6 + ",0)")
                                  .call(d3.axisLeft(y_dotplot).ticks(maxinabin/5))
                let binContainerEnter = binContainer.enter()
                .append("g")
                    .attr("class", "gBin")
                    .attr("transform", d => `translate(${x_dotplot(d.x0)}, ${adjustheight})`);

                binContainerEnter.selectAll("circle")
                    .data(d => 
                        
                    d.map((p, i) => {
                      return {idx: i,
                              name: p.Geography,
                              value: parseFloat(p[variable])                            }
                    }))
                  .enter()
                  .append("circle")
                    .attr("class", function(d, i){
                           return "circle county" + d.name.substring(0,d.name.length-20).replace(/\s+/g, '');
                       })
                    .attr("cx", 0) //g element already at correct x pos
                    .attr("cy", function(d) {
                        return - (d.idx * 2 * radius) - radius-margin2.bottom*2; 
                    })
                    .attr("r", radius)
                    .on("mouseover", function(d){
                        d3.selectAll("path.county" + d.name.substring(0,d.name.length-20).replace(/\s+/g, ''))
                        .attr("opacity", .7)
                        .style("stroke-width",5)
                        .style("stroke", "yellow");
                     
                     })
                     .on("mouseout", function(d){
                        d3.selectAll("path.county" + d.name.substring(0,d.name.length-20).replace(/\s+/g, ''))
                        .attr("opacity", 1)
                        .style("stroke-width",1)
                        .style("stroke", "white");
                    });

 
                                     
                       

                
    }

   render() {

   return (
      <div> <Row className="rowblock">
           <Col lg={{span: 6}}>
              <div class="headerdiv"><h1 className="descriptionheader"> {this.state.variablename}</h1></div>
               {/* <p>Quick description here</p> */}
           </Col>
           <Col lg={{span: 11}}>
               <Row className="rowblock" noGutters={true}>
                   {/* <Col lg={1}></Col> */}
                   <Col  lg={{span: 5}} className="mapclass">
                   </Col>
                   {/* <Col lg={1}></Col> */}
                   <Col lg={{span: 5}} className="distribution">
                   {/* <div className="dotplottitle"><h2 className="dotplotheader">Dotplot Distribution</h2></div> */}
                   <svg></svg>
                   </Col>
                   <Col lg={{span:2}}><div class="distexplanation">Some explanation of the data. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. </div></Col>
               </Row>
               <Row className="rowblock" noGutters={true}>
               <Col  lg={{span: 5, offset: 1}} className="test">
                   </Col>
                   <Col lg ={{span: 5, offset: 1}} className="tablemap"><div className="top10title"><h2 className="top10header">Counties with the Highest Values</h2></div><svg className="top10"></svg></Col>
               </Row>
           </Col>
       </Row>
       <Row className="rowblock">
                <Col lg={{span: 6}}>
               
               <div class="headerdiv"><h1 className="descriptionheader">Demographic Maps</h1></div>
                {/* <p>Quick description here</p> */}
                
            </Col>
       </Row>
   </div>
   )
   }
}

export default Map