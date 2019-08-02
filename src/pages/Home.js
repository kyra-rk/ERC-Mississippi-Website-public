/**
 * Program file for the Home Page
 * Made a const and exported it as "Home" to reference in App.js
 */
import React from 'react';
import '../styling/App.css'
import '../styling/Home.css'
import WinC from '../pictures/WinC.jpg'

export const Home = () => (
  <div className="banner">
    <img src = {WinC} alt="Women in Construction" id ="HomeBanner"/>
      <div className="bannerwords">
        <p>Make Women Count</p>
      </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
)

export default Home