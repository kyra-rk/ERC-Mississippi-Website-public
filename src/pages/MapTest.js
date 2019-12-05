import React, { Component } from 'react'
import '../styling/Map.css'
import {Row, Col, Container} from 'react-bootstrap'
import json from '../data/Mississippi-Counties.json'
import * as d3 from "d3";
// import d3tip from "d3-tip";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: this.props.datainput,
            color: d3.scaleQuantile().range(["#fde8f4","#dfb9cf","#b76293","#79064b", "#30031e"]),
            variable: this.props.variable,
            variablename: this.props.varname,
            variabledescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            group: this.props.group,
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.drawMap =this.drawMap.bind(this)
        this.drawDotplot=this.drawDotplot.bind(this)
        this.drawTopTen = this.drawTopTen.bind(this)
        this.drawTopTenSmaller = this.drawTopTenSmaller.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }


    componentDidMount(){

    this.drawMap();
    this.drawDotplot();
    this.drawTopTen();
    // this.drawTopTenSmaller();
}

    componentDidUpdate(prevProps){

        if (this.props.variable != prevProps.variable){
            this.setState({variable: this.props.variable, variablename: this.props.varname, group: this.props.group});
        }
        this.drawMap();
        this.drawDotplot();
        this.drawTopTen();
    }

    drawTopTen(){
        let variable = this.state.variable;
        let topdata = this.state.dataset;
        let color= this.state.color;
        topdata = topdata.sort(function (a, b) {
            return b[variable]-a[variable];
          })

          topdata = topdata.filter(function(d){
              return d[variable] != "NA"
          })
          topdata = topdata.filter(function(d,i){
              console.log(d[variable])
          return i < 10;
         });

         let data = topdata;

         var margin2 = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        var newsvgWidth = document.getElementsByClassName(["tablemap"])[0].clientWidth
        let svgWidth = newsvgWidth;
        let svgHeight = newsvgWidth/1.3;
        var newWidth = newsvgWidth - margin2.left - margin2.right;
        var newHeight = newWidth/1.3
        var width = newWidth - margin2.left - margin2.right;
        var height = newHeight - margin2.top - margin2.bottom;

        var svg2 = d3.select(".tablemap").append("svg")
                .attr("class", "singlevarsvg")
                .attr("width", width + margin2.left + margin2.right)
                .attr("height", height + margin2.top + margin2.bottom)
                .append("g")


       var x_bar = d3.scaleLinear()
       .range([0.15*svgWidth, .6*svgWidth])
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
               .attr("transform", "translate (" + .15*svgWidth+ " 0)")
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
               .attr("x", .17*svgWidth)
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
                   return x_bar(d[variable]) + .19*svgWidth;
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
    }

    drawTopTenSmaller(){
        let variable = this.state.variable;
        let topdata = this.state.dataset;
        let color= this.state.color;
        topdata = topdata.sort(function (a, b) {
            return b[variable]-a[variable];
          })
          topdata = topdata.filter(function(d,i){
          return i < 10;
         });

         let data = topdata;

         var margin2 = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        var newsvgWidth = document.getElementsByClassName(["tablemap"])[0].clientWidth
        let svgWidth = newsvgWidth;
        let svgHeight = newsvgWidth/1.3;
        var newWidth = newsvgWidth - margin2.left - margin2.right;
        var newHeight = newWidth/1.3
        var width = newWidth - margin2.left - margin2.right;
        var height = newHeight - margin2.top - margin2.bottom;

        var svg2 = d3.select(".tablemap").append("svg")
        .attr("class", "singlevarsvg")
        .attr("width", width + margin2.left + margin2.right)
        .attr("height", height + margin2.top + margin2.bottom)
        .append("g")


       var x_bar = d3.scaleLinear()
       .range([0.2*svgWidth, .4*svgWidth])
       .domain([0,  d3.max(data, function(d){
         return parseFloat(d[variable]).toFixed(2);
       })
       ]);

         var y_ax = d3.scaleBand()
       .range([.05*svgHeight, .5*svgHeight])
       .domain(data.map(function (d, i) {
         return d.Geography.substring(0,d.Geography.length-20);}))
         .padding(0.05);

                  var yAxis = d3.axisLeft(y_ax)
               //no tick marks
               .tickSize(0);

                  var gy = svg2.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate (" + .2*width+ " 0)")
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
               .attr("height", 15)
               .attr("x", .2*width)
               .attr("width", function (d) {
                   return x_bar(d[variable]);
               });

               bars.append("text")
               .attr("class", "label_bar")
               .attr("fill", "black")
               //y position of the label is halfway down the bar
               .attr("y", function (d,i) {
                   return y_ax(d.Geography.substring(0,d.Geography.length-20)) + 15 / 2 + 4;
               })
               //x position is 3 pixels to the right of the bar
               .attr("x", function (d) {
                   return x_bar(d[variable]) + .22*width;
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
                .style("fill", "yellow")
                .style("stroke", "purple")
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
                    .style("stroke", "white");
                    d3.selectAll("circle.county" + d.Geography.substring(0,d.Geography.length-20))
                    .attr("opacity", 1)
                    .style("fill", "#63053d")
                    .style("stroke", "none");
                })
    }

    drawDotplot(){
        let variable = this.state.variable;
        let data = this.state.dataset;
        var margin2 = {
         top: 10,
         right: 10,
         bottom: 10,
         left: 10
         };
     var newsvgWidth = document.getElementsByClassName(["distribution"])[0].clientWidth
     var computedStyle = window.getComputedStyle(document.getElementsByClassName(["distribution"])[0], null)
     newsvgWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
         var svgWidth = document.getElementsByClassName(["mapclass"])[0].clientWidth
        var computedMapStyle = window.getComputedStyle(document.getElementsByClassName(["mapclass"])[0], null);
         svgWidth = svgWidth - parseFloat(computedMapStyle.paddingLeft) + parseFloat(computedMapStyle.paddingRight);
        let svgHeight = svgWidth/1.175;
     // let svgHeight = document.getElementsByClassName(["mapclass"])[0].clientHeight
 //    svgHeight = svgWidth/1.3
         svgWidth = newsvgWidth;
         
        

         // svgHeight = newsvgWidth/1.3;
         var newwidth = newsvgWidth - margin2.left - margin2.right;
         var newHeight = svgHeight;
         var width = newwidth - margin2.left - margin2.right;
         var height = newHeight - margin2.top - margin2.bottom;
 
         var div = d3.select("div.tooltip")               
         .style("opacity", 0);
     var arrow = d3.select("div.arrow")
         .style("opacity", 0);

                 var svg3 = d3.select(".distribution").append("svg")
                 .attr("class", "singlevarsvg")
                 .attr("width", newwidth + margin2.left)
                 .attr("height", height + margin2.top + margin2.bottom)
                 .append("g")
                 const minval = d3.min(data, function(d){
                     return parseFloat(d[variable]);
                   });
                 const maxval = d3.max(data, function(d){
                     return parseFloat(d[variable]);
                   });
 
                 var rounding = 10
                 if (maxval>1000){
                     rounding = 1000
                 }
                 if (maxval>10000){
                     rounding = 10000
                 }
                const min = minval
                const max = maxval
 
                 var bindist = ((max-min)/10)

                 const thresholds = []
 
                 var val=0
                 let i=0
                 while (val<max){
                     // console.log(val, max)
                     thresholds[i] = min+bindist*(i+1)
                     val = thresholds[i]
                     i+=1
                 }
 
                 const x_dotplot = d3.scaleLinear()
                         .rangeRound([margin2.left*3,  newwidth])
                         .domain([min, max]);
 
                 var histogram = d3.histogram()
                     .domain(x_dotplot.domain())
                     .thresholds(thresholds)
                     .value(function(data) {return parseFloat(data[variable]);});
 
                 const bins = histogram(data).filter(d => d.length>0);
                 // console.log(bins);
                 var maxinabin = d3.max(bins, function(d){return d.length})
                 var maxy = Math.ceil(maxinabin/10)*10;
                 
                 var y_dotplot = d3.scaleLinear()
                 .rangeRound([height-margin2.bottom*3, 0 ])
                 .domain([0,maxy]);
                 
                 var yradius = (y_dotplot(0) - y_dotplot(1)-1)/2
                 var xradius = (x_dotplot(min + (bins[0].x1 - bins[0].x0))-x_dotplot(min))/2
                 var radius = Math.min(xradius, yradius)
 
                 var ylimit = (radius*2)*maxy

                  y_dotplot.rangeRound([height-margin2.bottom*3, margin2.top]);
 
                 let binContainer = svg3.selectAll(".gBin")
                             .data(bins, function(b) { 
                                 let sortedb = b.sort(function (a, b) {
                                 return a[variable]-b[variable];
                               });
                             return sortedb;});
 
                 let adjustheight = height - margin2.bottom
                
                 
                 
                 svg3.append("g")
                 .attr("class", "axis--x")
                 .attr("transform", "translate(0," + (adjustheight-margin2.bottom) + ")")
                 .call(d3.axisBottom(x_dotplot).ticks(thresholds.length+1).tickSize(-(height-margin2.top), 0, 0))
                 .selectAll("text")
                 .style("text-anchor", "end")
                 .attr("transform", function(){ if (bindist > 1000) {return "rotate(-65)";} else {return "rotate(0)";}});
 
                 svg3.append("g")
                 .attr("class", "axis--y")
                 .attr("transform", "translate(" + margin2.left*3 + ",0)")
                 .call(d3.axisLeft(y_dotplot).ticks(maxinabin/5).tickSize(-svgWidth, 0, 0))
 
                 let binContainerEnter = binContainer.enter()
                 .append("g")
                     .attr("class", "gBin")
                     .attr("transform", d => "translate(" + (x_dotplot(d.x0) + x_dotplot(d.x1))/2 + "," + adjustheight + ")");
 
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
                         return - (d.idx * 2 * radius) - radius - margin2.bottom*2;
                     })
                     .attr("r", radius)
                     .on("mouseover", function(d){
                         d3.selectAll("path.county" + d.name.substring(0,d.name.length-20).replace(/\s+/g, ''))
                         .style("stroke-width",6)
                         .style("stroke", "yellow");
 
                         div.transition()        
                             .duration(200)      
                             .style("opacity", .9);    
                         arrow.transition()
                             .duration(200)
                             .style("opacity", .9);
                         div.html(d.name.substring(0,d.name.length-20) + " County <br/>"  + d.value.toFixed(2))  
                             .style("left", (d3.event.pageX + 10) + "px")     
                             .style("top", (d3.event.pageY - 70) + "px");    
 
                         arrow.html("▼")
                         .style("left", (d3.event.pageX + 6) + "px")     
                         .style("top", (d3.event.pageY - 12) + "px")
 
 
                      })
                      .on("mouseout", function(d){
                         d3.selectAll("path.county" + d.name.substring(0,d.name.length-20).replace(/\s+/g, ''))
                         .attr("opacity", 1)
                         .style("stroke-width",1)
                         .style("stroke", "white");
 
                         div.transition()        
                         .duration(200)      
                         .style("opacity", 0);    
                     arrow.transition()
                         .duration(200)
                         .style("opacity", 0);
                    
                     });
    }

    drawMap() {
        d3.selectAll("svg.singlevarsvg").remove();

        //Get the width of the column and make the svg the same size
        let svgWidth = document.getElementsByClassName(["mapclass"])[0].clientWidth
        var computedStyle = window.getComputedStyle(document.getElementsByClassName(["mapclass"])[0], null)
        svgWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        let svgHeight = svgWidth/1.2;
        
        //Create variables to store our state variables
        let variable = this.state.variable;
        let data = this.state.dataset;

        //Set projection info for the map to be placed accordingly
        const projection = d3.geoTransverseMercator()
        .rotate([88 + 50/60,-29 - 30/60])
        .fitExtent([[10, 10], [svgWidth-10, svgHeight-10]], json);

        var path = d3.geoPath().projection(projection);

        //Add SVG 
        var svg = d3.select(".mapclass").append("svg")
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

            d3.selectAll("circle.county" + d.properties.NAME.replace(/\s+/g, ''))
                .style("stroke", "yellow")
                .style("stroke-width", 3);
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

   return (
      <div>
      <Row className="rowblock">
           <Col lg={{span: 8}}>
              <div className="headerdiv"><h1 className="descriptionheader"> {`${this.state.variablename} (${this.state.group})`}</h1></div>
               {/* <p>Quick description here</p> */}
           </Col>
           <Col lg={{span: 10, offset: 1}}>
              <div className="distexplanation">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
               {/* <p>Quick description here</p> */}
           </Col>
           <Col lg={{span: 11}}>
               <Row className="rowblock" >
                   <Col lg={{span: 5, offset: 1}}>
                       <Row className="justify-content-center"><div className="maptitle"><h1> Map </h1></div></Row>
                       <Row><Col className="mapclass"></Col></Row>
                   </Col>

                   <Col lg={{span: 6}}>
                       <Row className="justify-content-center"><div className="maptitle"><h1> Dotplot Distribution </h1></div></Row>
                       <Row><Col className="distribution"></Col></Row>
                   </Col>
               </Row>
               <Row className="rowblock" noGutters={true}>
               <Col  lg={{span: 5, offset: 1}} className="test">
               <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus interdum posuere lorem ipsum dolor sit amet. Euismod nisi porta lorem mollis. Quam vulputate dignissim suspendisse in est ante in. Dui ut ornare lectus sit. Amet tellus cras adipiscing enim. Id porta nibh venenatis cras sed felis eget velit aliquet. Aliquam faucibus purus in massa. Magna fringilla urna porttitor rhoncus dolor purus non enim. Cras ornare arcu dui vivamus arcu. Tincidunt arcu non sodales neque sodales ut. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Ac ut consequat semper viverra nam libero justo. Aliquet risus feugiat in ante metus dictum at. Mauris vitae ultricies leo integer. Fames ac turpis egestas maecenas pharetra.</div>
                   </Col>
                   <Col lg ={{span: 5, offset: 1}} className="tablemap"><div className="top10title"><h2 className="top10header">Counties with the Highest Values</h2></div></Col>
               </Row>
           </Col>
       </Row>

   </div>
   )
   }
}

export default Map
