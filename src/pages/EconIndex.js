/**
 * Program file for the Index Page
 * Made a const and exported it as "EconIndex" to reference in App.js
 */
import React,{ Component } from 'react';
import '../styling/EconIndex.css';
import { Row, Dropdown, DropdownButton, Container, Collapse, Col, Button, Accordion, Card, CardGroup, Tab, Tabs, TabContent, Image} from 'react-bootstrap';
import NavBar from '../components/NavBar'
import {Slider, Handles, Rail, Ticks, Tracks} from 'react-compound-slider'
import Map from '../components/IndexMap'
import IndexMap2 from '../components/IndexMap2'
import { scroller, Element} from "react-scroll";


import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Divider from '@material-ui/core/Divider';

import Scrollspy from 'react-scrollspy'

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';

// import ListItemText from '@material-ui/core/ListItemText';

import earnings_logo from '../pictures/earnings_logo.png'
import education_logo from '../pictures/education_logo.png'
import health_logo from '../pictures/health_logo.png'
import poverty_logo from '../pictures/poverty_logo.png'
import employment_logo from '../pictures/employment_logo.png'

import indexdata from '../data/indexdata.json'

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
        <Tab eventKey="var1" title={<span><img src = {poverty_logo} className="imgsize"/></span>} className="tabsformat"><h4>Poverty</h4><h5>Percent with Income Below Poverty</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var2" title={<span><img src = {health_logo} className="imgsize"/></span>} className="tabsformat"><h4>Health Insurance</h4><h5>Percent With Health Insurance</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var3" title={<span><img src = {earnings_logo}className="imgsize"/></span>} className="tabsformat"><h4>Earnings: </h4> <ul><h5>Median Earnings-Full Time</h5>
        <h5>Median Earnings - Part Time/Other</h5></ul><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
        </Tab>
        <Tab eventKey="var4" title={<span><img src = {employment_logo}className="imgsize"/></span>} className="tabsformat"><h4>Employment</h4><h5>Unemployment Rate</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
        <Tab eventKey="var5" title={<span><img src = {education_logo}className="imgsize"/></span>} className="tabsformat"><h4>Education</h4><h5>Percent with Less than a High School Degree</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p></Tab>
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
    // this.change = this.change.bind(this)
  }

  change = values => {
    // if (!this.props.multiple)
        this.setState({values});
  };

  render(){
    const { domain, values, type, actualmin, step } = this.state;
    const multiple = this.props.multiple
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
          <div className={"value"}>
          <h4><RankCalc value={values} min={actualmin} max={domain[1]} /> </h4>
        </div>
        </Col>
        <Col sm={2}>
          <div className="arrowicon"><h2><ArrowRightAltIcon fontSize="large" ></ArrowRightAltIcon></h2></div></Col>
          <Col sm={4}>
          <div className={"value"}>
          <h4><RankCalc value={values} min={actualmin} max={domain[1]} flip={"True"}/> </h4>
          <h6>Rescaled Value</h6>        </div>
        </Col>
        </Row>
      </Col>
    }
    else {
      info = <Col sm={3}>
      <Row className="justify-content-center" noGutters="true">
      <Col sm={3}><h2>=</h2></Col>
      <Col sm={9}>
      <div className={"value"}>      <h4><RankCalc value={values} min={actualmin} max={domain[1]} /> </h4>
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
    if (multiple){
      return(
        <div className={sliderClass}>
          <Row>
            <Col sm={10}>
          <Slider
            mode = {2}
            step = {step}
            domain = {domain}
            disabled={true}
            rootStyle = {sliderStyle}
            values = {values[0]}
          >
            <Rail>
              {({getRailProps}) => (
                <div style={railStyle} {...getRailProps()} />
              )}
            </Rail>
            <Handles>
              {({handles, getHandleProps}) => {
                return (
                <div className="slider-handles">
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      // domain={domain}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}}
            </Handles>
            <Tracks left={false} right={false}>
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
         {/* {info} */}
          </Row >
          <Row className="justify-content-center">
          {minmax}
          </Row>
        </div>
      )
    }
    else {
      return(
        <div className={sliderClass}>
          <Row className="justify-content-center">
            <Col sm={i}>
          <Slider
            mode = {1}
            step = {step}
            domain = {domain}
            rootStyle = {sliderStyle}
            onChange = {this.change}
            values = {values}
          >
            <Rail>
              {({getRailProps}) => (
                <div style={railStyle} {...getRailProps()} />
              )}
            </Rail>
            <Handles>
              {({handles, getHandleProps}) => {
                return (
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
              )}}
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
          backgroundColor: "teal",
          // backgroundColor: '#2C4870',
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
        backgroundColor: "teal",
        // backgroundColor: '#546C91',
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
  return (finalstate.sum/finalstate.count).toFixed(2)
}

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }
const anchor_items = [{url: "#section-1", name: "Variables in the Index"}, 
                         //  {url: "/dataportal", name: "Data Portal"},
                         {url: "#section-2", name: "Rescaling Variables"},
                         {url: "#section-3", name: "Rescaling by Race"},
                         {url: "#section-4", name: "Composing the Index"},
                         {url: "#section-5", name: "Index Map"},
                           {url: "#section-6", name: "Index Maps by Race"}

                          ];

export const EconIndex = () => (
	//   <div className="screenwidth">
	// 	<div className="econindex">
	//     <h1>Index</h1>
	// 	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	// 	<img id ="EconImage" src = {require('../pictures/MSimage.png')} alt="Index Map"/>
	// 	</div>
  //   </div>

  <div>

    <div className="screenwidth">
    <div className="econindex">

<Row className="justify-content-center" noGutters={"True"}>
  <Col sm={12} lg={8}>
  <h1>Women's Economic Security Index</h1>

<Row className="justify-content-center" >
<section class="bg-light page-section" className="section">
<p> We developed a women's economic security index for Mississippi that goes beyond traditional understandings of economic security, that is limited to poverty. 
Our index also attempts to capture the ways in which race intersects with gender to affect the economic conditions of women in Mississippi. 

</p>

{/* Bottom maps moved to the top */}
{/* Index Maps by Race need to be resized */}
<Row className="justify-content-center rowblock">
  <h4>Index Value: {average([66,64,54,59,81,73])}</h4>
</Row>

<p>This county would have a final index value of 66.17. As we can see through the rescaled values it gets for each variable, they are distributed from 54 to 81, which means
  this county is generally on the higher end of the distribution for each variable.
</p>


</section>
</Row>

<Row>
  <h6>We highly recommend you read through our methodology for calculating the index, which is included below our maps for the index. 
  </h6>
</Row>

    <Row className="justify-content-center">
    <div class="anchor">
      <a id="section-1"> </a>
    </div>

<section></section>
    <section class="page-section">
    <Row>
        <Col>

       <div className="headerdiv indexheader"><h1 className="descriptionheader">Variables in the Index</h1></div>

    </Col>
    </Row>
      <div className="info_section">
        {/* <h1>What variables are part of our index?</h1> */}
        <div className="tabs">
        <Vars />
        </div>
      </div>
    </section>
  
</Row>
  <Row>
                <Col>

               <div className="headerdiv indexheader"><h1 className="descriptionheader">Index</h1></div>

            </Col>
            </Row>
            {/* <Row>
              <h2>Index</h2>
            </Row> */}
            <Row className="rowblock">
        <Col lg={7}>
          <Map datainput = {indexdata} variable ={"Index"} height={485} width={400} className={"index"}></Map></Col>
        <Col>            
        <div className="indexdesc">
          <div>We finally map all the index values by county to see how it distributes across the state. Some More Explanation Here. <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </div>
        </div>
    </Col>
    </Row>
  <Row><Col>
        <div className="headerdiv indexheader"><h1 className="descriptionheader">Index Maps by Race</h1></div>
    </Col></Row>
    </Col>
    </Row>
    </div>
    <div>  <IndexMap2 className = "demmaps" variables = {["Index_White_M2", "Index_Black_M2"]} labels = {["Index White", "Index Black"]} datainput = {indexdata} /></div>

      <div className="econindex">

      <Row className="justify-content-center" noGutters={"True"}>
    

{/* <div className="scrollspy">
<Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
  <ul>
<li><a href="#section-1">Variables in the Index</a></li>
<li><a href="#section-2">Rescaling Variables</a></li>
<li><a href="#section-3">Rescaling by Race</a></li>
<li><a href="#section-4">Composing the Index</a></li>
<li><a href="#section-5">Index Map</a></li>
<li><a href="#section-6">Index Maps by Race</a></li>
</ul>
      <Col sm={12} lg={1}>
<Dropdown className="expanded">
          {anchor_items.map((obj, i)=>
            <Dropdown.Item eventKey="i" href={obj.url}>{obj.name}</Dropdown.Item>
          )}
</Dropdown> 
</Col>
</Scrollspy>
</div> */}

<Col sm={12} lg={8}>

 

            <Row className="justify-content-center" >
<div class="anchor">
              <a id="section-2"> </a>
            </div>
            <section class="bg-light page-section" className="section">
            <h1>How did we calculate the index?</h1>
            <Row>
                <Col>

               <div className="headerdiv indexheader"><h1 className="descriptionheader">Rescaling Variables</h1></div>

            </Col>
            </Row>
              <div class="slidecontainer" className="info_section">
                {/* <h2>Rescaling Each Variable</h2> */}
                <p>Most of our variables were on a scale of 0-100 since they were percentages, but we also had variables such as Median Income that had to be incorporated into the index. In order to ensure every variable was standardized in the same way, we rescaled each variable to be from 0-100 based on the range of the dataset.</p>
                <p> Let's take Median Earnings for women working full time and Poverty as an example.
                  The minimum value for Median Income is 18,500 and the maximum is 41,059. We let these correspond to 0 and 100, respectively. The county with the minimum value gets a value of 0 and the county with the highest value gets a value of 100. <span style={{fontWeight: "bold"}}>To calculate each county's rescaled value, we take its value, subtract the minimum from it and then divide over the range.</span> We get a fraction that we then multiply by 100.
                  This corresponds essentially to rankings. Counties with higher rescaled values have higher values for that variable relative to the other counties. The slider below shows what a county with a Median Income of 23,500 would have as its rescaled value: 22. Intuitively, a value of 22 would mean that this county is in the first quartile of the distribution and is relatively not doing as well as most counties.

    </p>
                  <Slide min={18500} max={41059} values={23500} type="rescale" actualmin={18500} step={500}/>

    <p>
    Now, let's take Poverty as our example.

                  The minimum value for the percent of women in poverty was 10.41 and the maximum was 44.75. We calculate the index similarly and the slider below shows what a county with 27% of women in poverty would have as its rescaled value: 48. Intuitively, a value of 48 would mean that this county falls in the middle of the distribution of all the counties.
                  There is one more step for rescaling poverty. With Median Earnings, a higher rescaled value means the county is more economically secure. However, with the way we've rescaled poverty, a higher rescaled value corresponds to higher levels of poverty and thus economic insecurity. To account for that, we will subtract the rescaled value from 100 so that the scale is reversed and the county with the highest level of poverty corresponds to a ranking of 0 and the county with the lowest level of poverty corresponds to a ranking of 100.
    </p>
                  <Slide min={10} max={44.75} values={27} type="rescale" actualmin={10.41} step={.5} flip={"True"}/>

              </div>
              </section>

              <div class="anchor">
              <a id="section-3"> </a>
            </div>

              <section  class="bg-light page-section" className="section">
              <Row>
                <Col>

               <div className="headerdiv indexheader"><h1 className="descriptionheader">Rescaling by Race</h1></div>

            </Col>
            </Row>
                  <div class="slidecontainer" className="info_section race">
{/* <h2>Rescaling Variables Differentiated by Race</h2> */}
<p>Due to our commitment to intersectionality and to understanding how economic security is differentiated by race, we wanted to create a separate economic security index for white women and Black women, asides from our women's economic security index.
However, both demographics have different ranges and if we rescale each to its range, we would not be able to compare values to each other. The two sliders below show the rescaled value that would be returned for a county if it's Median Earnings value was $32,500.
The rescaled value for Black Women's Median Earnings is almost twice as high as for white women. Since Black Women's Median Earnings have a maximum of $37,344, a value of $32,500 would be high compared to most counties. In comparison, the value falls in the lower half of the distribution for white women since
Median Earnings for white women have a much higher maximum.
</p>
<h3>Median Earnings - Full Time for White Women</h3>
<Slide min={23500} max={45043} values={32500} type="rescale" actualmin={23838} step={500}/>
<h3>Median Earnings - Full Time for Black Women</h3>
<Slide min={16000} max={37344} values={32500} type="rescale" actualmin={16382} step={500}/>

<div className="subheading">
<h3>One Scale for Both Races</h3></div>
<p>To account for that, we will use one range, where the minimum is the minimum of the distribution for either race and similarly for the maximum. The sliders below show the
full range, with each race's distribution highlighted.</p>



<h3>Median Earnings - Full Time for White Women</h3>
<Slide min={16000} max={45043} values={[23838, 45043]} type="rescale" actualmin={16382} step={1} multiple={"True"}/>
<h3>Median Earnings - Full Time for Black Women</h3>
<Slide min={16000} max={45043} values={[16382, 37344]} type="rescale" actualmin={16382} step={1} multiple={"True"}/>

<h3>Combined Scale</h3>
<p>This last slider shows the combined distribution of the two races again. On the new scale, a value of $32,500 corresponds to 56. Now, county values will be comparable across race. </p>
<Slide min={16000} max={45043} values={32500} type="rescale" actualmin={16382} step={500}/>

<p> The values now are able to reflect two things:
<Row>
<Col md={1}></Col>
<Col sm={10} >
<ul><li> As before, they show the relative economic security of the county for the given race of women depending on where they fall from 0 to 100.
</li>
<li>But now, they also show us a measure of inequality in a county based on the difference in values for each race. </li></ul>
</Col>
</Row>
Counties with very different values for both races imply that one group of women generally have much higher earnings whereas counties with similar values mean that both races are facing similar conditions.
<br />
<br />
One important thing to note with this new range is that it combines the data for both races, but does so without losing the detail that both provide us. This is <span style={{fontWeight: "bold"}}> not </span> the same range as the one for Median Earnings for all Women that we saw earlier. It has a lower minimum and a higher maximum, reflecting the racial dynamics of economic security.
</p>

</div>


              <div class="anchor">
              <a id="section-4"> </a>
            </div>
              <section class="bg-light page-section" className="section">
              <Row>
                <Col>

               <div className="headerdiv indexheader"><h1 className="descriptionheader">Composing the Index</h1></div>

            </Col>
            </Row>

              <div class="slidecontainer" className="info_section multiplevars">
                <h2>Combining Variables Into Our Index</h2>
                <p>We do the same steps for each of our variables as shown below and we average them to get a final index value for a county. </p>
                <h3>Poverty</h3>
                <Slide min={10} max={44.75} values={22} type="vars" actualmin={10.41} step={1} flip={"True"}/>

                <h3>Median Earnings - Full Time</h3>
                <Slide min={18500} max={41059} values={33000} type="vars" actualmin={18500} step={500}/>
                <h3>Median Earnings - Part Time</h3>
                <Slide min={4500} max={13694} values={9500} type="vars" actualmin={4523} step={1}/>
                <h3>Health Insurance</h3>
                <Slide min={78} max={92.85} values={87} type="vars" actualmin={78.55} step={1}/>
                <h3>Educational Level - Less Than A High School Degree</h3>
                <Slide min={7} max={29.68} values={12} type="vars" actualmin={7.79} step={1} flip={"True"}/>
                <h3>Unemployment Rate</h3>
                <Slide min={4} max={24.9} values={10} type="vars" actualmin={4.5} step={1} flip={"True"}/>

                <Divider className="divider" variant="middle" />

                <Row className="justify-content-center rowblock">
                  <h4>Index Value: {average([66,64,54,59,81,73])}</h4>
                </Row>
<p>This county would have a final index value of 66.17. As we can see through the rescaled values it gets for each variable, they are distributed from 54 to 81, which means
  this county is generally on the higher end of the distribution for each variable.
</p>
              </div>
              </section>


                      </section>
            </Row>

 
         
 

        </Col>
        </Row>
</div>

</div>
 

{/*<IndexMap2 className = "demmaps" variables = {["Index_White_M2", "Index_Black_M2"]} labels = {["Index White", "Index Black"]} datainput = {indexdata} />*/}


  </div>
	)

export default EconIndex
