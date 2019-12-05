/**
 * Program file for the Index Page
 * Made a const and exported it as "EconIndex" to reference in App.js
 */
import React,{ Component } from 'react';
import '../styling/EconIndex.css';
import { Row, Container, Collapse, Col, Button, Accordion, Card, CardGroup, Tab, Tabs, TabContent, Image} from 'react-bootstrap';
import {Slider, Handles, Rail, Ticks, Tracks} from 'react-compound-slider'

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Divider from '@material-ui/core/Divider';

import earnings_logo from '../pictures/earnings_logo.png'
import education_logo from '../pictures/education_logo.png'
import health_logo from '../pictures/health_logo.png'
import poverty_logo from '../pictures/poverty_logo.png'
import employment_logo from '../pictures/employment_logo.png'
import { TextareaAutosize } from '@material-ui/core';

class Vars extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      key: 'var1',
    };
  }

  render(){
    return(
      <Tabs
        activeKey={this.state.key}
        onSelect={key => this.setState({key})}
        className = "tabsformat"
      >
        <Tab eventKey="var1" title={<span><img src = {poverty_logo} className="imgsize"/></span>} className="tabsformat"><h4>Poverty</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var2" title={<span><img src = {health_logo} className="imgsize"/></span>} className="tabsformat"><h4>Health Insurance</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var3" title={<span><img src = {earnings_logo}className="imgsize"/></span>} className="tabsformat"><h4>Earnings</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var4" title={<span><img src = {employment_logo}className="imgsize"/></span>} className="tabsformat"><h4>Employment</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var5" title={<span><img src = {education_logo}className="imgsize"/></span>} className="tabsformat"><h4>Education</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
      </Tabs>
    );
  }
}

const sliderStyle = {
  position: 'relative',
  width: '100%',
  height: 80,
}

const railStyle ={
  position: 'absolute',
  width: '100%',
  height:10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: "gainsboro",
}

const values_x = [20, 30, 50, 80];

class Slide extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      domain: [props.min, props.max],
      values: [props.values],
      type: props.type,
      actualmin: props.actualmin,
      step: props.step,
    };
  }

  onChange = values => {
    this.setState({values});
  };

  render(){
    const { domain, values, type, actualmin, step } = this.state;
    const flip = this.props.flip;
    let info = "";
    let minmax = ""
    let i = 9;
    let sliderClass = "slider"
    if (flip) {
      i = 8
        info =  
        <Col sm={4}>
          <Row>
          <Col sm={2}><h2>=</h2></Col>
          <Col sm={3}>
          <div className="value">
          <h4><RankCalc value={values} min={actualmin} max={domain[1]} /> </h4>
        </div>
        </Col>
        <Col sm={2}>
          <div class="arrowicon"><h2><ArrowRightAltIcon fontSize="large" ></ArrowRightAltIcon></h2></div></Col>
          <Col sm={4}>
          <div className="value">
          <h4><RankCalc value={values} min={actualmin} max={domain[1]} flip={"True"}/> </h4>
          <h6>Rescaled Value</h6>
        </div>
        </Col>
        </Row>
      </Col>
    }
    else {
      info = <Col sm={3}>
      <Row className="justify-content-center" noGutters="true">
      <Col sm={3}><h2>=</h2></Col>
      <Col sm={9}>
    <div className="value">
      <h4><RankCalc value={values} min={actualmin} max={domain[1]} /> </h4>
      <h6>Rescaled Value</h6>
    </div>
    </Col>
    </Row>
    </Col>
    }
    if (type=== "rescale"){
      sliderClass = "singleslider" 
      minmax =       
    <Col sm={i}>
      <Row>
        <Col >
          <h6>Minimum: {actualmin}</h6>
        </Col>
        <Col>              
          <h6>Maximum: {domain[1]}</h6>
        </Col>
      </Row>
    </Col>
    }
      return(
        <div className={sliderClass}>
          <Row className="justify-content-center">
            <Col sm={i}>
          <Slider
            mode = {1}
            step = {step}
            domain = {domain}
            rootStyle = {sliderStyle}
            onChange = {this.onChange}
            values = {values}
          >
            <Rail>
              {({getRailProps}) => (
                <div style={railStyle} {...getRailProps()} />
              )}
            </Rail>
            <Handles>
              {({handles, getHandleProps}) => (
                <div className="slider-handles">
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
            <Ticks count={12}>
              {({ticks}) => {
                ticks = ticks.filter((obj,i) => obj.value>=actualmin);
                return (
                <div className="slider-ticks">
                  {ticks.map(tick => (
                    <Tick key={tick.id} tick={tick} count={ticks.length}/>
                  ))}
                  
                  {/* <Tick className="actualmintick" key = {`$$-${actualmin}`} tick={{id: `$$-${actualmin}`,value: actualmin, percent: (actualmin-domain[0])/(domain[1]-domain[0])}} count={12}></Tick> */}
                  {/* <Tick key={`$$-${domain[1]}`} tick={{id: `$$-${domain[1]}`,value: domain[1], percent: 100}} count={12}></Tick> */}

                </div>
              )}}
            </Ticks>
          </Slider>
          </Col>
         {info}
          </Row>
          {minmax}
        </div>
      )
  }
}


export function Handle({
  handle: {id, value, percent},
  getHandleProps
}){
  console.log(id, value, percent)
  return(
    <div
      style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: 25,
          zIndex: 2,
          width: 30,
          height: 30,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          color: '#333',
        }}
        {...getHandleProps(id)}
      >
    <div style={{ fontFamily: 'Roboto', fontSize: 14, marginTop: -35 }}>
          {value}
        </div>
    </div>
  )
}

export function Tick({tick, count}){
  return(
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 50,
          marginLeft:-0.5,
          width: 1,
          height: 8,
          backgroundColor: 'silver',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop:60,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {tick.value}
      </div>
    </div>
  )
}

export function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}


function RankCalc(props){
  let rank =  100* Math.round(100*((props.value-props.min) / (props.max-props.min)))/100;
  if (props.flip){
    return 100 - rank
  }
  return rank;
}

function average(arr){
  var finalstate=arr.reduce(function(state,a) { state.sum+=a;state.count+=1; return state },{sum:0,count:0}); 
  return finalstate.sum/finalstate.count
}
  


export const EconIndex = () => (
	//   <div className="screenwidth">
	// 	<div className="econindex">
	//     <h1>Index</h1>
	// 	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	// 	<img id ="EconImage" src = {require('../pictures/MSimage.png')} alt="Index Map"/>
	// 	</div>
  //   </div>
  
  <div>
	  {/* <iframe src="https://storymaps.arcgis.com/stories/931e709e07914cb8824e9a6d3747729f" height="500px" width="100%"/> */}

    <div className="screenwidth">
      <div className="econindex">
        <h1>Index</h1>
        <Row className="justify-content-center">

        <Col sm={9}>
        <Row className="justify-content-center">

        <section class="page-section">
          <div className="info_section">
            <h1>What variables are part of our index?</h1>
            <div className="tabs">
            <Vars />
            </div>
          </div>
        </section>
      
</Row>

        <Row className="justify-content-center">

        <section class="bg-light page-section" className="section">
        <h1>How did we calculate the index?</h1>
          <div class="slidecontainer" className="info_section">
            <h2>Rescaling Each Variable</h2>
            <p>Most of our variables were on a scale of 0-100 since they were percentages, but we also had variables such as Median Income that had to be incorporated into the index. In order to ensure every variable was standardized in the same way, we rescaled each variable to be from 0-100 based on the range of the dataset.</p>
            <p> Let's take Median Earnings for women working full time and Poverty as an example. 
              The minimum value for Median Income is 18,500 and the maximum is 81,059. We let these correspond to 0 and 100, respectively. The county with the minimum value gets a value of 0 and the county with the highest value gets a value of 100. <span style={{fontWeight: "bold"}}>To calculate each county's rescaled value, we take its value, subtract the minimum from it and then divide over the range.</span> We get a fraction that we then multiply by 100. 
              This corresponds essentially to rankings. Counties with higher rescaled values have higher values for that variable relative to the other counties. The slider below shows what a county with a Median Income of 32,500 would have as its rescaled value: 22. Intuitively, a value of 22 would mean that this county is in the first quartile of the distribution and is relatively not doing as well as most counties.

</p>
              <Slide min={18500} max={81059} values={32500} type="rescale" actualmin={18500} step={500}/>

<p>
Now, let's take Poverty as our example. 

              The minimum value for the percent of women in poverty was 10.41 and the maximum was 44.75. We calculate the index similarly and the slider below shows what a county with 27% of women in poverty would have as its rescaled value: 48. Intuitively, a value of 48 would mean that this county falls in the middle of the distribution of all the counties. 
              There is one more step for rescaling poverty. With Median Earnings, a higher rescaled value means the county is more economically secure. However, with the way we've rescaled poverty, a higher rescaled value corresponds to higher levels of poverty and thus economic insecurity. To account for that, we will subtract the rescaled value from 100 so that the scale is reversed and the county with the highest level of poverty corresponds to a ranking of 0 and the county with the lowest level of poverty corresponds to a ranking of 100. 
</p>
              <Slide min={10} max={44.75} values={27} type="rescale" actualmin={10.41} step={.5} flip={"True"}/>
             
          </div>
          <div class="slidecontainer" className="info_section">
            <h2>Combing Variables Into Our Index</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
            <h3>Poverty</h3>
            <Slide min={0} max={100} values={values_x[0]} type="vars" actualmin={0} step={1} flip={"True"}/>
            <h3>Median Earnings - Full Time</h3>
            <Slide min={0} max={100} values={values_x[1]} type="vars" actualmin={0} step={1}/>
            <h3>Median Earnings - Part Time</h3>
            <Slide min={0} max={100} values={values_x[2]} type="vars" actualmin={0} step={1}/>
            <h3>Health Insurance</h3>
            <Slide min={0} max={100} values={values_x[3]} type="vars" actualmin={0} step={1}/>
            <h3>Educational Level - Less Than A High School Degree</h3>
            <Slide min={7} max={29.68} values={values_x[3]} type="vars" actualmin={0} step={1}/>
            <h3>Unemployment Rate</h3>
            <Slide min={0} max={100} values={values_x[3]} type="vars" actualmin={0} step={1}/>
            
            <Divider className="divider" variant="middle" />

            <Row className="justify-content-center rowblock">
<h4>Index Value: {average([20,30,50,80,100,80])}</h4>
            </Row>

          </div>
        </section>
        </Row>

<Row className="rowblock">
  {/* <section className="section"> */}
    <Col md={7}><div className="map">MAP GOES HERE</div></Col>
    <Col>            
    <div className="indexdesc">
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
    </div>
</Col>
  {/* </section> */}
</Row>
        
        <section class="page-section" className="section">
          <div className="info_section">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img id ="EconImage" src = {require('../pictures/MSimage.png')} alt="Index Map"/>
          </div>
        </section>

        </Col>
        </Row>
        {/* </Container> */}
      </div>
    </div>
    </div>
	)

export default EconIndex
