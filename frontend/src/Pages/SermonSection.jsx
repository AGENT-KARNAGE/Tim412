import React, { useEffect, useRef, useState } from "react";
import "./thisweek.css";

const sermons = [/* ...your data */];

const SermonSection = () => {
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRefs = [...cardRefs.current]; // ✅ snapshot for cleanup
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []); // ✅ no stale ref warnings now

  return (
    <section className="this-week-section">
      <h2>Sermons</h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...sermons, ...sermons].map(({ video, title }, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="carousel-card"
              style={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index)
                  ? "translateY(0)"
                  : "translateY(50px)",
                transition: "opacity 0.6s ease, transform 0.6s ease"
              }}
            >
              <iframe
                width="100%"
                height="250"
                src={video}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="carousel-video"
              ></iframe>
              <h4 className="carousel-caption">{title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SermonSection;
