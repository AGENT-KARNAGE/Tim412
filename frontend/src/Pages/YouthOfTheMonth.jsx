import React, { useEffect, useRef, useState } from 'react';
import './Events.css';
import youthImage from '../Assets/images/youth-month.jpg'; // Replace with actual image path

const YouthOfTheMonth = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // You can tweak this
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`Sec1 youth-section ${isVisible ? 'visible' : ''}`}
      ref={sectionRef}
    >
      <div className="youth-of-month-container">
        <div className="youth-image-wrapper">
          <img src={youthImage} alt="Youth of the Month" className="youth-image" />
          <h3 className="youth-name">Oyinatorunwa Osinoowo</h3>
        </div>
        <div className="youth-writeup">
          <h2>Youth of the Month</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur, nisl vel suscipit
            cursus, nunc elit convallis sapien, vitae tincidunt metus arcu a nulla. Fusce in pulvinar
            sapien. Donec sodales porta eros. Mauris quis congue lacus. Nam eget justo felis. Suspendisse
            potenti. Cras sit amet augue eget risus porta ullamcorper vel nec quam. Phasellus eget sapien
            a elit laoreet fermentum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default YouthOfTheMonth;

