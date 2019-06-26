/**
 * Program file for the Oral Histories Page
 * Used flip cards and several divs for each side of the card
 * NEED TO ADD ICONS BELOW SEE MORE BUTTON AND AUTOPOPULATE USING CSV OR ARRAY
 */
import React from 'react';
//import { Row } from 'react-bootstrap';
import './OralHistories.css';


//const people_data = [{image_src: "path/to/img", bio: "yada yada yuada", name: "Winsome"},
//                        {image_src: "path/to/img", bio: "yada yada yuada", name: "Winsome"} ]

//const links = nav_bar_items.map((obj, index) => <Nav.Link href = {obj.url}>{obj.name}</Nav.Link>);


export const Story = () => (
    <div>
      <h1>People/Story</h1>
      <div class = "container">
          <div class = "row justify-content-around">
              <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 1</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 2</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 3</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class = "row justify-content-around">
          <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 4</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 5</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 6</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class = "col-md-3 card-container">
                  <div class="card-flip">
                      <div class="card front">
                          <img src = {require('./person.png')}/>
                          <div class= "card-text">   
                              <h4>Person 7</h4>
                          </div>
                      </div>
                      <div class="card back">
                          <div class= "card-header">
                              Name
                          </div>
                          <div class="card block">
                              <h4 class="card-title">Bio</h4>
                              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              <a href="#" class="btn btn-primary">See more</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
     </div>
  )
export default Story