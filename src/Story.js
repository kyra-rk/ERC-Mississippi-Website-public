import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import './OralHistories.css';

export const Story = () => (
  <div>
    <h1>People/Story</h1>
    <div class = "container">
        <div class = "row justify-content-around">
            <div class = "col-md-4 card-container">
                <div class ="instructions">
                <div class="instructions-flip">
                    <div class="instructions-front"> 
                        <h3>Hover to flip</h3>
                    </div>
                    <div class="instructions-back">
                        <h3>Move cursor away from card to flip back</h3>
                    </div>
                </div>
                </div>
            </div>
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 1</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person1
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class = "row justify-content-around">
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 2</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person2
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 3</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person3
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class = "row justify-content-around">
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 4</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person4
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 5</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person5
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class = "row justify-content-around">
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 6</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person6
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
                            <a href="#" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "col-md-4 card-container">
                <div class="card-flip">
                    <div class="card front">
                        <img src = {require('./MSimage.png')}/>
                        <div class= "card-text">   
                            <h4>Person 7</h4>
                        </div>
                    </div>
                    <div class="card back">
                        <div class= "card-header">
                            Name of person7
                        </div>
                        <div class="card block">
                            <h4 class="card-title">Bio</h4>
                            <p class="card-text">Blah Blah</p>
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