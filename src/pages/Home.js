/**
 * Program file for the Home Page
 * Made a const and exported it as "Home" to reference in App.js
 */
import React from "react";
import "../styling/App.css";
import style from "../styling/Home.css";
import WinC from "../pictures/WinC.jpg";
import WinCLogo from "../pictures/WinCLogo.png";
import Report from "../pictures/Report.jpg";
import data_logo from "../pictures/database.svg";
import stories_logo from "../pictures/stories.svg";
import method_logo from "../pictures/tools.svg";
import data_portal_demo from "../pictures/Data_portal_demo.mp4";
import "bootstrap";
import Fade from "react-reveal/Fade";
import { Card, Button, Carousel, Figure, Row, Col } from "react-bootstrap";
import AnimatedNumber from "react-animated-number";
import HomepageStats from "../components/HomepageStats";
import StickyBox from "react-sticky-box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import smoothscroll from "smoothscroll-polyfill";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDiv: true,
    };
    this.myRef = React.createRef();
    // syntax for using functions
    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // once the page loads, what to do - scroll to the top of the page
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick() {
    smoothscroll.polyfill();
    const y = this.myRef.current.getBoundingClientRect().top - 90;
    // console.log(this.myRef.current.getBoundingClientRect())
    window.scrollTo({ top: y, behavior: "smooth" });
    // this.myRef.current.scrollIntoView({behavior: "smooth"});
  }

  /* render needed to create result */
  render() {
    // java script can go here
    // const { showDiv1 } = this.state;
    // const { showDiv2 } = this.state;
    // const { showDiv3 } = this.state;

    // write html inside the return
    return (
      // first section of homepage
      <div className="homescreen">
        {/*<div className="rectangle"></div>*/}
        {/*<Fade duration={1000}>*/}
        {/*</Fade>*/}
        {/* section 1 - contains heading, subtitle arrow down 
            why no class associated with this section? */}
        <section>
          <div className="banner">
            <img src={WinC} alt="Women in Construction" id="HomeBanner" />
          </div>
          <div className="bannerwords">
            {/*<p>Make<wbr></wbr>
                    Women<wbr></wbr>
                    <mark className="yellow">Count</mark>
                    <img src = "https://cdn3.iconfinder.com/data/icons/glypho-free/64/map-pin-marker-circle-512.png"
                         width="90"
                         alt="Map Icon"/>
                </p>*/}
            <h1> MAKE WOMEN COUNT</h1> {/* main heading of the website  */}
            {/* <h1> MAKE WOMEN <span className="yellow">COUNT</span></h1> */}
            {/* </div> */}
            {/* <div className="bannercaption"> */}
            <p>Understanding the Experience of Women in Mississippi</p>
            {/*arrow feature - click feature not added*/}
            {/* the arrow only goes down one section. why not go down to features or something? */}
            <div id="arrow-down" onClick={this.handleClick}>
              <i class="down"></i>
            </div>
            {/* <AddCircleIcon onClick={this.handleClick} className="add"></AddCircleIcon> */}
          </div>
        </section>

        {/*slideshow feature (react-bootstrap carousel)*/}
        {/*need to make sure carousel dimensions are right images used*/}
        {/* section 1 - image and welcome */}
        {/* the image starts to overtake the welcoome message as the window width decreases (currently xl=6) */}
        <section class="page-section first" ref={this.myRef}>
          <Row>
            <Col xl={6}>
              <div className="introduction">
                {/*}<div className="image">*/}
                {/* added the mx-auto tag to the className for the image. not sure if it makes a difference. */}
                <Carousel id="carousel">
                  <Carousel.Item>
                    <img
                      src={Report}
                      alt="Women in Construction"
                      className="mx-auto d-block"
                    />
                    <Carousel.Caption>Report - Placeholder</Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={WinCLogo}
                      alt="Women in Construction"
                      className="mx-auto d-block"
                    />
                    <Carousel.Caption>Women in Construction</Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                {/*</div>*/}
              </div>
            </Col>
            <Col xl={6}>
              <div className="introduction">
                <h1>Welcome</h1>
                <p>
                  {" "}
                  {/* this message needs to be updated */}
                  The Mississippi Women's Count aims to strengthen Mississippi
                  women's economic security by using data to better inform
                  policy makers. Our site uses both qualitative and quantitative
                  data to provide a comprehensive understanding of the unique
                  challenges women encounter. We used this data to develop a
                  women's economic security index that will inform our own
                  policy initiatives. The information was gathered from a
                  variety of sources, such as American Community Survey from the
                  US Census Bureau and interviews with Women in Construction.
                  This project is a collaboration between Mississippi Low-Income
                  Childcare Initiative and Barnard College's Empirical Reasoning
                  Center & Mississippi Semester class.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* <section class="page-section first">
          <div className="introduction">
            <h1>Welcome</h1>
                <p>The Mississippi Women's Count aims to strengthen Mississippi women's economic security by using data to better inform policy makers.
                Our site uses both qualitative and quantitative data to provide a comprehensive understanding of the unique challenges women encounter.
                We used this data to develop a women's economic security index that will inform our own policy initiatives.
                The information was gathered from a variety of sources, such as American Community Survey from the US Census Bureau and interviews with Women in Construction.
                This project is a collaboration between Mississippi Low-Income Childcare Initiative and Barnard College's Empirical Reasoning Center & Mississippi Semester class.
                </p>
          </div>
        </section> */}

        {/* section 2 - Statistics section*/}
        <section class="page-section second">
          <div className="introduction">
            <h1>Statistics</h1>
            <p>
              {" "}
              {/* this text needs to be replaced */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
              maxime quam architecto quo inventore harum ex magni, dicta
              impedit.
            </p>
            <div class="container">
              {" "}
              {/* holds the 3 statistics numbers */}
              <div class="row text-center">
                <div class="col-md-4">
                  <h4 class="statistics_num">#48</h4>
                  <p class="text-muted-home">
                    {" "}
                    Mississippi is ranked 48 among US states.{" "}
                  </p>
                </div>
                <div class="col-md-4">
                  <h4 class="statistics_num">2.9M</h4>
                  <p class="text-muted-home">
                    Mississippi has a population of 2.9 million
                  </p>
                </div>
                <div class="col-md-4">
                  <h4 class="statistics_num">32%</h4>
                  <p class="text-muted-home">
                    32% of people in Mississippi are college educated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*section 3 - Features section */}
        <section class="page-section first">
          <section id="services"> {/* why services as the id? */}
            <div className="introduction"> 
            {/* originally was an h2, made it an h1 for consistency of font/color etc. */}
              <h1>Features</h1>
              <p> {/* text needs to be replaced */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
            {/* changed from class="container" to "introduction" */}
            <div class="introduction">
              <div class="row text-center">
                <div class="col-md-4 bottom-spacing">
                  <span class="fa-stack fa-4x">
                    {/* <Fade duration={1500}> */}
                    <a href="dataportal">
                      <img src={data_logo} alt="Data icon" id="FeatureLogo"/>
                    </a>
                    {/* </Fade> */}
                  </span>
                  <a href="dataportal">
                    <h4 class="service-heading">Data Portal</h4>
                  </a>
                  <p class="text-muted">
                    The data portal has seven main categories: demographics,
                    health, education, employment, income, housing, and
                    government assistance. Within each category, there are
                    several subcategories. Once you select a subcategory, you
                    can toggle between the different gender and sex breakdowns.
                    On each of these variable pages, you get a map, table, and
                    histogram to get a comprehensive view of how each county
                    measures in this particular variable.{" "}
                  </p>
                  <Button variant="primary" href="dataportal" style={{backgroundColor: "teal", borderColor:"teal"}}>
                    Go to Data Portal
                  </Button>
                </div>
                <div class="col-md-4 bottom-spacing">
                  <span class="fa-stack fa-4x">
                    {/* <Fade duration={1500} delay={500}> */}
                    <a href="stories">
                      <img
                        src={stories_logo}
                        alt="Book icon"
                        id="FeatureLogo"
                      />
                    </a>
                    {/* </Fade> */}
                  </span>
                  <a href="stories">
                    <h4 class="service-heading">Stories</h4>
                  </a>
                  <p class="text-muted">
                    Read through stories we collected from women in the Women in
                    Construction Job Training Program. There are two ways to
                    filter through stories, either by person or by topic. If you
                    select by person, you will get a preview of each of the
                    interviewees, and you can see more about each person and
                    their full interview transcript. If you select by topic, you
                    get to see all quotes that pertain to the topic you choose.
                    Some of the interviewees requested not to be identified by
                    name, instead they will be identified as Women in
                    Construction Participant.
                  </p>
                  <Button variant="primary" href="stories" style={{backgroundColor: "teal", borderColor:"teal"}}>
                    Go to Stories
                  </Button>
                </div>
                <div class="col-md-4 bottom-spacing">
                  <span class="fa-stack fa-4x">
                    {/* <Fade duration={1500} delay={1000}> */}
                    <a href="indexinfo">
                      <img
                        src={method_logo}
                        alt="Methodology logo"
                        id="FeatureLogo"
                      />
                    </a>
                    {/* </Fade> */}
                  </span>
                  <a href="indexinfo">
                    <h4 class="service-heading">Economic Security Index</h4>
                  </a>
                  <p class="text-muted">
                    Read through our process of calculating a Women's Economic
                    Security Index and visualize the distribution of the index
                    across counties. See how we differentiated the index by race
                    to capture the combined effects of race and gender.
                  </p>
                  <Button variant="primary" href="indexinfo" style={{backgroundColor: "teal", borderColor:"teal"}}>
                    Go to Index
                  </Button>
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

        {/* testing section 4 - Video Demo Section */}
        {/* ref={this.myRef} --> what is this? */}
        <section class="page-section second">
          {/* <Row> */}
            <div className="introduction demobottom">
              <h1>Scroll Demo</h1>
              <p> The different features of Make Women Count </p>
            </div>
          {/* </Row> */}
          <Row className="introduction demobottom">
            <Col xl={3}>
              <div className="textbottom">
              <StickyBox offsetTop={80}>
                    <h3>Data Portal</h3> {/* add: Compare populations by race and gender. */}
                    The data portal has seven main categories: demographics,
                    health, education, employment, income, housing, and
                    government assistance.
              </StickyBox>
              </div>
            </Col>
            <Col xl={9}>
            <div className="demo-bottom">
                    <video
                      src={data_portal_demo}
                      id="video"
                      autoplay="autoplay"
                      loop="true"
                      muted
                    ></video>
              </div>
            </Col>
          </Row>
          <Row className="introduction">
            <Col xl={3}>
              <div className="textbottom">
              <StickyBox offsetTop={80}>
                    <h3>Index</h3>
                    Read through our process of calculating a Women's Economic
                    Security Index and visualize the distribution of the index
                    across counties.
                  </StickyBox>
              </div>
            </Col>
            <Col xl={9}>
              <p> MISSING VIDEO </p>
            </Col>
          </Row>
          <Row className="introduction">
            <Col xl={3}>
              <div className="textbottom">
              <StickyBox offsetTop={80}>
                    <h3>Stories</h3>
                    Read through stories we collected from women in the Women in
                    Construction Job Training Program. Explore either by person
                    or topic.
                  </StickyBox>
              </div>
            </Col>
            <Col xl={9}>
              <p> MISSING VIDEO </p>
            </Col>
          </Row>
        </section>

        {/*section 4 - Video Demo Section*/}
        {/* if video is not loading or file not found error, try downloading the video from the drive and replace file*/}
        <section class="page-section second">
          <div className="introduction">
            <h1>Scroll Demo</h1>
            <p> The different features of Make Women Count </p>
            <div> {/* Tries to add Row (june 2023). tried changing div to Col. Was messy.*/}
            <div className="row"> {/* this contains the video and short description on the left. why not class "row video-demo"??*/}
              <div style={{ overflow: "auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  {/* <Col sm={6}> */}
                  <StickyBox offsetTop={80}>
                    <h3>Data Portal</h3> {/* add: Compare populations by race and gender. */}
                    The data portal has seven main categories: demographics,
                    health, education, employment, income, housing, and
                    government assistance.
                  </StickyBox>
                  {/* </Col> */}
                  {/* <Col sm={6}> */}
                  <div>
                    <video
                      src={data_portal_demo}
                      id="video"
                      autoplay="autoplay"
                      loop="true"
                      muted
                    ></video>
                  </div>
                  {/* </Col> */}
                </div>
              </div>
            </div>

            <div className="row video-demo"> {/* this is the Index description */}
              <div style={{ overflow: "auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <StickyBox offsetTop={80}>
                    <h3>Index</h3>
                    Read through our process of calculating a Women's Economic
                    Security Index and visualize the distribution of the index
                    across counties.
                  </StickyBox>
                  <div> {/* !! missing */}
                    {/* <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="row video-demo"> {/* this is the stories description */}
              <div style={{ overflow: "auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <StickyBox offsetTop={80}>
                    <h3>Stories</h3>
                    Read through stories we collected from women in the Women in
                    Construction Job Training Program. Explore either by person
                    or topic.
                  </StickyBox>
                  <div> {/* !! missing */}
                    {/* <video src={data_portal_demo} id="video" autoplay="autoplay" loop="true" muted></video> */}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Imp: Consider adding a footer with an "UP" arrow. */}

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
    );
  }
}

export default Home;
