/**
 * Program file for the Index Page
 * Made a const and exported it as "EconIndex" to reference in App.js
 */
import React,{ Component } from 'react';
import '../styling/EconIndex.css';
import { Row, Collapse, Col, Button, Accordion, Card, CardGroup, Tab, Tabs, TabContent, Image} from 'react-bootstrap';
import {Slider, Handles, Rail, Ticks} from 'react-compound-slider'

import earnings_logo from '../pictures/earnings_logo.png'
import education_logo from '../pictures/education_logo.png'
import health_logo from '../pictures/health_logo.png'
import poverty_logo from '../pictures/poverty_logo.png'
import employment_logo from '../pictures/employment_logo.png'

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
  backgroundColor: '#8B9CB6',
}

const values_x = [20, 30, 50, 80];

class Slide extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      domain: [props.min, props.max],
      values: [props.values],
      type: props.type
    };
  }

  onChange = values => {
    this.setState({values});
  };

  render(){
    const { domain, values, type } = this.state;

    if(type == "rescale"){
      return(
        <div>
          <Slider
            mode = {1}
            step = {1}
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
            <Ticks count={10}>
              {({ticks}) => (
                <div className="slider-ticks">
                  {ticks.map(tick => (
                    <Tick key={tick.id} tick={tick} count={ticks.length}/>
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
          <br />
          <div class="row">
            <div class="col-md-4">
              <h4>Minimum: {domain[0]}</h4>
            </div>
            <div class="col-md-4">
              <h4>Current Value: {values}</h4>
            </div>
            <div class="col-md-4">
              <h4>Calculated Index: <RankCalc value={values} min={domain[0]} max={domain[1]} /> </h4>
            </div>
          </div>
        </div>
      )
    }
    else{
      return(
        <div>
          <Slider
            mode = {1}
            step = {1}
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
            <Ticks count={10}>
              {({ticks}) => (
                <div className="slider-ticks">
                  {ticks.map(tick => (
                    <Tick key={tick.id} tick={tick} count={ticks.length}/>
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
      )
    }
  }
}


export function Handle({
  handle: {id, value, percent},
  getHandleProps
}){
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



function RankCalc(props){
  return (props.value-props.min) / (props.max-props.min)
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
	  <iframe src="https://storymaps.arcgis.com/stories/931e709e07914cb8824e9a6d3747729f" height="500px" width="100%"/>

    <div className="screenwidth">
      <div className="econindex">
        <h1>Index</h1>

        <section class="page-section">
          <div className="info_section">
            <h1>Variables</h1>
            <Vars />
          </div>
        </section>

        <section class="bg-light page-section" className="section">
          <div class="slidecontainer" className="info_section">
            <h1>Rescaling</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>

            <Slide min={0} max={100} values={50} type="rescale"/>
          </div>
          <div class="slidecontainer" className="info_section">
            <h1>Rankings</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
            <h3>Var 1</h3>
            <Slide min={0} max={100} values={values_x[0]} type="vars"/>
            <br />
            <h3>Var 2</h3>
            <Slide min={0} max={100} values={values_x[1]} type="vars"/>
            <br />
            <h3>Var 3</h3>
            <Slide min={0} max={100} values={values_x[2]} type="vars"/>
            <br />
            <h3>Var 4</h3>
            <Slide min={0} max={100} values={values_x[3]} type="vars"/>
          </div>
        </section>

        <section class="page-section" className="section">
          <div className="info_section">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img id ="EconImage" src = {require('../pictures/MSimage.png')} alt="Index Map"/>
          </div>
        </section>
      </div>
    </div>
    </div>
	)

export default EconIndex
