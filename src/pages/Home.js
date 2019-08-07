/**
 * Program file for the Home Page
 * Made a const and exported it as "Home" to reference in App.js
 */
import React from 'react';
import '../styling/App.css'
import '../styling/Home.css'
import WinC from '../pictures/WinC.jpg'
import { Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {

  state = {
      showDiv: true
  }

  render() {
      const { showDiv1 } = this.state;
      const { showDiv2 } = this.state;
      const { showDiv3 } = this.state;
      return (
        <div className="homescreen">
          <div className="banner">
            <img src = {WinC} alt="Women in Construction" id ="HomeBanner"/>
              <div className="bannerwords">
                <p>Make Women Count</p>
              </div>
          </div>
          <div className="introduction">
          <h1>Welcome</h1>
              <p>The Mississippi Women's Count aims to strengthen Mississippi women's economic security by using data to better inform policy makers.
                Our site uses both qualitative and quantitative data to provide a comprehensive understanding of the unique challenges women encounter.
                The information was gathered from a variety of sources, such as American Community Survey from the US Census Bureau and interviews with Women in Construction.
                This project is a collaboration between Mississippi Low-Income Childcare Initiative and Barnard College's Empirical Reasoning Center & Mississippi Semester class.
                </p>
          <h1>How to Use</h1>
          <p>Please select the buttons to learn how to use the site</p>
          </div>
            <div className="Howto">
              <Row className="howtorow">
                <Col xl={4}>
                  <Row>
                  <Button size="lg" className="homebutton" onClick={() => this.setState({ showDiv1: !showDiv1 })} style={{backgroundColor: "#d4a45c", borderColor: "#d4a45c"}}>
                    Data Portal
                  </Button>
                  </Row>
                  <Row className="explanation">
                  { showDiv1 && (
                  <div id="div1">The data portal has seven main categories: demographics, health, education, employment, income, housing, and government assistance. Within each category, there are several subcategories. Once you select a subcategory, you can toggle between the different gender and sex breakdowns. On each of these variable pages, you get a map, table, and histogram to get a comprehensive view of how each county measures in this particular variable. Sometimes the breakdowns are unavailable (e.g. there was no gender breakdown found) so the buttons turn grey and will be disabled.</div>
                  )}
                  </Row>
                </Col>
                <Col xl={4}>
                  <Row>
                  <Button size="lg" className="homebutton" onClick={() => this.setState({ showDiv2: !showDiv2 })} style={{backgroundColor: "#d4a45c", borderColor: "#d4a45c"}}>
                    Economic Security Index
                  </Button>                    
                  </Row>
                  <Row className="explanation">
                  { showDiv2 && (
                    <div id="div2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  )}
                  </Row>
                </Col>
                <Col xl={4}>
                  <Row>
                  <Button size="lg" className="homebutton" onClick={() => this.setState({ showDiv3: !showDiv3 })} style={{backgroundColor: "#d4a45c", borderColor: "#d4a45c"}}>
                    Stories
                  </Button>                    
                  </Row>
                  <Row className="explanation">
                  { showDiv3 && (
                    <div id="div3">There are two ways to filter through stories, either by person or by topic. If you select by person, you will get a preview of each of the interviewees from the Women in Construction Program, and you can see more about each person and their full interview transcript. If you select by topic, you get to see all quotes that pertain to the topic you choose. Some of the interviewees requested not to be identified by name, instead they will be identified as Women in Construction Participant.</div>
                  )}
                  </Row>
                </Col>
              </Row>
            </div>
          </div>  
      )
  }
}

export default Home