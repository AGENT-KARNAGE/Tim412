import React from "react";
import "./thisweek.css"; // Keep your styling

// Replace local videos with YouTube embed URLs
const sermons = [
  {
    video: "https://www.youtube.com/embed/lR1Hk0FVi_k",
    title: "God of Miracles – Pastor E.A. Adeboye"
  },
  {
    video: "https://www.youtube.com/embed/rLWseubRH8Y",
    title: "The Power of Prayer – Apostle Joshua Selman"
  },
  {
    video: "https://www.youtube.com/embed/M8qJr2qERso",
    title: "Finishing Strong – Pastor Paul Enenche"
  },
  {
    video: "https://www.youtube.com/embed/X2CCMQnQHAM",
    title: "Understanding Faith – Bishop David Oyedepo"
  },
  {
    video: "https://www.youtube.com/embed/M8qJr2qERso?start=41",
    title: "Purity and Power – Apostle Michael Orokpo"
  },
  {
    video: "https://www.youtube.com/embed/g5Rel7_VFfM",
    title: "The Word & Your Destiny – Pastor Mensa Otabil"
  },
  {
    video: "https://www.youtube.com/embed/4IFHbtsOlX0",
    title: "Purpose and Vision – Dr. Myles Munroe"
  }
];


const SermonSection = () => {
  return (
    <section className="this-week-section">
      <h2>Sermons</h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...sermons, ...sermons].map(({ video, title }, index) => (
            <div className="carousel-card" key={index}>
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