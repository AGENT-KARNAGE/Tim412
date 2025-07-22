import React, { useEffect, useRef, useState } from "react";
import "./thisweek.css";

import img1 from "../Assets/images/thisweek/Image1.1.jpg";
import img2 from "../Assets/images/thisweek/Image1.7.jpg";
import img3 from "../Assets/images/thisweek/Image1.3.jpg";
import img4 from "../Assets/images/thisweek/Image1.8.jpg";
import img5 from "../Assets/images/thisweek/Image1.5.jpg";
import img6 from "../Assets/images/thisweek/Image1.6.jpg";
import img7 from "../Assets/images/thisweek/Image1.2.jpg";
import img8 from "../Assets/images/thisweek/Image1.4.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const ThisWeekWithTim412 = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // optional: stop observing after first entry
          }
        });
      },
      {
        threshold: 0.3, // trigger when 30% is visible
      }
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
      className="this-week-section"
      ref={sectionRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(40px)",
        transition: "all 1s ease-out"
      }}
    >
      <h2>This Week with TIM412</h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...images, ...images].map((img, index) => (
            <div className="carousel-card" key={index}>
              <img src={img} alt={`This Week ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThisWeekWithTim412;