import React from 'react';
import '../styles/styles.css';
import bgImage from '../Assets/images/jack-sharp.jpg';

const Header = () => (
  <header className="BGP">
    <img className="backgroundImage" src={bgImage} alt="background" />
    <div className="ImageText">
      <h1>WELCOME TO</h1>
      <h1><b>RCCG NEWSPRINGS</b> <i className="phrase">TIM412</i></h1>
      <p className="phrase">Home is Here</p>
    </div>
  </header>
);

export default Header;// Header component placeholder