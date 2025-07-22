import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import bgImage from '../Assets/images/jack-sharp.jpg';

const Header = ({ username }) => {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const visibleStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 1s ease, transform 1s ease',
  };

  const hiddenStyle = {
    opacity: 0,
    transform: 'translateY(40px)',
  };

  return (
    <header className="BGP" ref={headerRef}>
      <img className="backgroundImage" src={bgImage} alt="background" />
      <div className="ImageText">
        <h1 style={isVisible ? visibleStyle : hiddenStyle}>
          HELLO <span>{username}</span>, WELCOME TO
        </h1>
        <h1 style={isVisible ? visibleStyle : hiddenStyle}>
          <b>RCCG NEWSPRINGS</b> <i className="phrase">TIM412</i>
        </h1>
        <p className="phrase" style={isVisible ? visibleStyle : hiddenStyle}>
          Home is Here — a place where your journey of faith matters.
        </p>
      </div>
    </header>
  );
};

export default Header;