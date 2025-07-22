import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';

const WelcomeSection = ({ isLoggedIn }) => {
  const refs = {
    banner: useRef(null),
    emptyDecor: useRef(null),
    aboutUs: useRef(null),
    vision: useRef(null),
    mission: useRef(null),
    signature: useRef(null)
  };

  const [visible, setVisible] = useState({
    banner: false,
    emptyDecor: false,
    aboutUs: false,
    vision: false,
    mission: false,
    signature: false
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const targetKey = entry.target.getAttribute("data-key");
          if (targetKey && entry.isIntersecting) {
            setVisible(prev => ({ ...prev, [targetKey]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.setAttribute("data-key", key);
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Style generator function for each block
  const getStyle = (isVisible, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(30px)",
    transition: `all 0.6s ease ${delay}s`
  });

  return (
    <section className="Sec2">
      <div
        ref={refs.banner}
        style={getStyle(visible.banner, 0)}
        className="WelcomeBanner"
      >
        <h3 className="welcomeText">WELCOME TO RCCG NEWSPRINGS TIM412</h3>
      </div>

      <div
        ref={refs.emptyDecor}
        style={getStyle(visible.emptyDecor, 0.2)}
        className="EmptyDecor"
      >
        <div className="TIM">
          <h1>T</h1>
          <h1>I</h1>
          <h1>M</h1>
          <h1 className="Timothy">412</h1>
        </div>
      </div>

      <div className="Words">
        <div
          ref={refs.aboutUs}
          style={getStyle(visible.aboutUs, 0.4)}
          className="about-us"
        >
          <h2>About Us</h2>
          <p>
            We are the youth arm of RCCG Newsprings Parish, raising a generation of
            spiritually grounded, purpose-driven young people who are ready to impact the world for Christ.
          </p>
        </div>

        <div className="vision-mission-container">
          <div
            ref={refs.vision}
            style={getStyle(visible.vision, 0.6)}
            className="vision-box"
          >
            <h3>Our Vision</h3>
            <p>
              To raise passionate youths who love God, live with purpose, and lead with integrity in every sphere of influence.
            </p>
          </div>

          <div
            ref={refs.mission}
            style={getStyle(visible.mission, 0.8)}
            className="mission-box"
          >
            <h3>Our Mission</h3>
            <p>
              To equip and empower youths through mentorship, discipleship, and creative outreach programs that transform lives.
            </p>
          </div>
        </div>

        <h4
          ref={refs.signature}
          style={getStyle(visible.signature, 1)}
          className="pastor-signature"
        >
          Pastor Olusola Adewole
        </h4>
      </div>
    </section>
  );
};

export default WelcomeSection;
