import React from 'react';
import '../styles/styles.css';

const WelcomeSection = ({isLoggedIn}) => {
  return (
    <section className="Sec2">
      <div className="WelcomeBanner">
        <h3 className="welcomeText">WELCOME TO RCCG NEWSPRINGS TIM412</h3>
      </div>

      <div className="Container">
        <div className="EmptyDecor">
          <div className="TIM">
            <h1>T</h1>
            <h1>I</h1>
            <h1>M</h1>
            <h1 className='Timothy'>412</h1>
          </div>
          
        </div>

        <div className="Words">
          {/* About Us */}
          <div className="about-us">
            <h2>About Us</h2>
            <p>
              We are the youth arm of RCCG Newsprings Parish, raising a generation of
              spiritually grounded, purpose-driven young people who are ready to impact the world for Christ.
            </p>
          </div>

          {/* Vision & Mission Boxes */}
          <div className="vision-mission-container">
            <div className="vision-box">
              <h3>Our Vision</h3>
              <p>
                To raise passionate youths who love God, live with purpose, and lead with integrity in every sphere of influence.
              </p>
            </div>

            <div className="mission-box">
              <h3>Our Mission</h3>
              <p>
                To equip and empower youths through mentorship, discipleship, and creative outreach programs that transform lives.
              </p>
            </div>
          </div>

          <h4 className="pastor-signature">Pastor Olusola Adewole</h4>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
