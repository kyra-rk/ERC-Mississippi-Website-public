/**
 * Program file for the Home Page
 * Made a const and exported it as "Home" to reference in App.js
 */
import React from 'react';
import '../styling/App.css'
import '../styling/Home.css'
import WinC from '../pictures/WinC.jpg'
import WinCLogo from '../pictures/WinCLogo.png'
import Report from '../pictures/Report.jpg'
import data_logo from '../pictures/database.svg'
import stories_logo from '../pictures/stories.svg'
import method_logo from '../pictures/tools.svg'
// import data_portal_demo from '../pictures/Data_portal_demo.mp4'
import 'bootstrap';
import Fade from 'react-reveal/Fade';
import {Card, Button, Carousel, Figure} from 'react-bootstrap';
import AnimatedNumber from 'react-animated-number';
import HomepageStats from '../components/HomepageStats'
import StickyBox from 'react-sticky-box';


class Home extends React.Component {

  state = {
      showDiv: true
  }


  render() {
      // const { showDiv1 } = this.state;
      // const { showDiv2 } = this.state;
      // const { showDiv3 } = this.state;
      return (

        <div className="homescreen">
            <div className="rectangle"></div>
            {/* <Fade duration={1000}> */}
            <div className="image">
              <Carousel id ="HomeBanner">
                <Carousel.Item>
                  <img src = {WinC} alt="Women in Construction" className="d-block"/>
                  <Carousel.Caption>One of the Participants of Women in Construction</Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img src = {Report} alt="Women in Construction" className="d-block"/>
                  <Carousel.Caption>Report - Placeholder</Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img src = {WinCLogo} alt="Women in Construction" className="d-block"/>
                  <Carousel.Caption>Women in Construction</Carousel.Caption>
                </Carousel.Item>

              </Carousel>
            </div>
            {/* </Fade> */}
            <div className="bannerwords">
                <p>Make<wbr></wbr>
                    Women<wbr></wbr>
                    <mark className="yellow">Count</mark>
                    {/*<img src = "https://cdn3.iconfinder.com/data/icons/glypho-free/64/map-pin-marker-circle-512.png"*/}
                         {/*width="90"*/}
                         {/*alt="Map Icon"/>*/}
                </p>
            </div>
        <section class="page-section first">
          <div className="introduction">
            <h1>Welcome</h1>
                <p>The Mississippi Women's Count aims to strengthen Mississippi women's economic security by using data to better inform policy makers.
                Our site uses both qualitative and quantitative data to provide a comprehensive understanding of the unique challenges women encounter.
                We used this data to develop a women's economic security index that will inform our own policy initiatives.
                The information was gathered from a variety of sources, such as American Community Survey from the US Census Bureau and interviews with Women in Construction.
                This project is a collaboration between Mississippi Low-Income Childcare Initiative and Barnard College's Empirical Reasoning Center & Mississippi Semester class.
                </p>
          </div>
        </section>


        <section class="page-section second">
          <div className="introduction">
              <h1>Statistics</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
            <div class="container">
              <div class="row text-center">
                <div class="col-md-4">
                    <h4 class="statistics_num">#48</h4>
                  <p class="text-muted-home"> Mississippi is ranked 48 among US states. </p>
                </div>
                <div class="col-md-4">
                    <h4 class="statistics_num">2.9M</h4>
                  <p class="text-muted-home">Mississippi has a population of 2.9 million</p>
                </div>
                <div class="col-md-4">
                    <h4 class="statistics_num">32%</h4>
                  <p class="text-muted-home">32% of people in Mississippi are college educated</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section class="page-section first">
          <section id="services">
                <div className="introduction">
                  <h2>Features</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                </div>
          <div class="container">
            <div class="row text-center">
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    {/* <Fade duration={1500}> */}
                  <a href="dataportal">
                    <img src = {data_logo} alt="Data logo" id="FeatureLogo"/>
                  </a>
                    {/* </Fade> */}
                </span>
                <a href="dataportal">
                  <h4 class="service-heading">Data Portal</h4>
                </a>
                <p class="text-muted">The data portal has seven main categories: demographics, health, education, employment, income, housing, and government assistance. Within each category, there are several subcategories. Once you select a subcategory, you can toggle between the different gender and sex breakdowns. On each of these variable pages, you get a map, table, and histogram to get a comprehensive view of how each county measures in this particular variable. </p>
                <Button variant="primary" href="dataportal">Go to Data Portal</Button>
              </div>
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    {/* <Fade duration={1500} delay={500}> */}
                  <a href="stories">
                    <img src = {stories_logo} alt="Data logo" id="FeatureLogo"/>
                  </a>
                    {/* </Fade> */}
                </span>
                <a href="stories">
                  <h4 class="service-heading">Stories</h4>
                </a>
                <p class="text-muted">Read through stories we collected from women in the Women in Construction Job Training Program. There are two ways to filter through stories, either by person or by topic. If you select by person, you will get a preview of each of the interviewees, and you can see more about each person and their full interview transcript. If you select by topic, you get to see all quotes that pertain to the topic you choose. Some of the interviewees requested not to be
                identified by name, instead they will be identified as Women in Construction Participant.</p>
                <Button variant="primary" href="stories">Go to Stories</Button>
              </div>
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    {/* <Fade duration={1500} delay={1000}> */}
                  <a href="index">
                    <img src = {method_logo} alt="Methodology logo" id="FeatureLogo"/>
                  </a>
                    {/* </Fade> */}
                </span>
                <a href="index">
                  <h4 class="service-heading">Economic Security Index</h4>
                </a>
                <p class="text-muted">Read through our process of calculating a Women's Economic Security Index and visualize the distribution of the index across counties.
                See how we differentiated the index by race to capture the combined effects of race and gender.
                </p>
                <Button variant="primary" href="index">Go to Index</Button>
              </div>
            </div>
          </div>
          </section>
        </section>

        {/*<section class="page-section first">
          <div className="introduction">
            <h1>Feature Demo</h1>
            <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video>
          </div>
        </section>*/}

        {/*<section class="page-section">
          <div className="introduction">
            <h1>Feature Demo</h1>
            <Carousel>
              <Carousel.Item>
                  <p>The data portal has seven main categories: demographics, health, education, employment, income, housing, and government assistance. Within each category, there are several subcategories. Once you select a subcategory, you can toggle between the different gender and sex breakdowns. On each of these variable pages, you get a map, table, and histogram to get a comprehensive view of how each county measures in this particular variable. </p>
                  <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video>
              </Carousel.Item>

              <Carousel.Item>
                <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video>
                <Carousel.Caption>
                  <h3 classname="carousel_caption">Stories</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>*/}

        <section class="page-section second">
          <div className="introduction">
            <h1>Scroll Demo</h1>
            <p> The different features of Make Women Coount </p>
            <div className="row">
            <div style={{overflow: 'auto' }}>
              <div style={{display: 'flex', alignItems: 'flex-start' }}>
                <StickyBox offsetTop={80}>
                <h3>Data Portal</h3>
                The data portal has seven main categories: demographics, health, education, employment, income, housing, and government assistance.
                </StickyBox>
                <div>
                  {/* <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video> */}
                </div>
              </div>
            </div>
            </div>

            <div className="row video-demo">
            <div style={{overflow: 'auto' }}>
              <div style={{display: 'flex', alignItems: 'flex-start' }}>
                <StickyBox offsetTop={80}>
                <h3>Index</h3>
                Read through our process of calculating a Women's Economic Security Index and visualize the distribution of the index across counties.
                </StickyBox>
                <div>
                  {/* <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video> */}
                </div>
              </div>
            </div>
            </div>

            <div className="row video-demo">
            <div style={{overflow: 'auto' }}>
              <div style={{display: 'flex', alignItems: 'flex-start' }}>
                <StickyBox offsetTop={80}>
                  <h3>Stories</h3>
                  Read through stories we collected from women in the Women in Construction Job Training Program. Explore either by person or topic.
                </StickyBox>
                <div>
                  {/* <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video> */}
                </div>
              </div>
            </div>
            </div>

          </div>
        </section>



        {/*<section class="page-section">*/}
            {/*<div className="Howto">*/}
              {/*<Row className="howtorow">*/}
                {/*<Col xl={4}>*/}
                  {/*<Row>*/}
                  {/*<Button size="lg" className="homebutton" onClick={() => this.setState({ showDiv1: !showDiv1 })} style={{backgroundColor: "#d4a45c", borderColor: "#d4a45c"}}>*/}
                    {/*Data Portal*/}
                  {/*</Button>*/}
                  {/*</Row>*/}
                  {/*<Row className="explanation">*/}
                  {/*{ showDiv1 && (*/}
                  {/*<div id="div1">The data portal has seven main categories: demographics, health, education, employment, income, housing, and government assistance. Within each category, there are several subcategories. Once you select a subcategory, you can toggle between the different gender and sex breakdowns. On each of these variable pages, you get a map, table, and histogram to get a comprehensive view of how each county measures in this particular variable. Sometimes the breakdowns are unavailable (e.g. there was no gender breakdown found) so the buttons turn grey and will be disabled.</div>*/}
                  {/*)}*/}
                  {/*</Row>*/}
                {/*</Col>*/}
                {/*<Col xl={4}>*/}
                  {/*<Row>*/}
                  {/*<Button size="lg" className="homebutton" onClick={() => this.setState({ showDiv2: !showDiv2 })} style={{backgroundColor: "#d4a45c", borderColor: "#d4a45c"}}>*/}
                    {/*Economic Security Index*/}
                  {/*</Button>*/}
                  {/*</Row>*/}
                  {/*<Row className="explanation">*/}
                  {/*{ showDiv2 && (*/}
                    {/*<div id="div2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>*/}
                  {/*)}*/}
                  {/*</Row>*/}
                {/*</Col>*/}
                {/*<Col xl={4}>*/}
                  {/*<Row>*/}
                  {/*<Button size="lg" className="homebutton" onClick={() => this.setState({ showDiv3: !showDiv3 })} style={{backgroundColor: "#d4a45c", borderColor: "#d4a45c"}}>*/}
                    {/*Stories*/}
                  {/*</Button>*/}
                  {/*</Row>*/}
                  {/*<Row className="explanation">*/}
                  {/*{ showDiv3 && (*/}
                    {/*<div id="div3">There are two ways to filter through stories, either by person or by topic. If you select by person, you will get a preview of each of the interviewees from the Women in Construction Program, and you can see more about each person and their full interview transcript. If you select by topic, you get to see all quotes that pertain to the topic you choose. Some of the interviewees requested not to be identified by name, instead they will be identified as Women in Construction Participant.</div>*/}
                  {/*)}*/}
                  {/*</Row>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</div>*/}
            {/*</section>*/}
          </div>
      )
  }
}

export default Home
