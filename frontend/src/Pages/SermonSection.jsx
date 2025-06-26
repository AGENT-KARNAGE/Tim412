import React from "react";
import "./thisweek.css"; // Keep your styling

// Replace local videos with YouTube embed URLs
const sermons = [
  {
    video: "https://www.youtube.com/embed/lR1Hk0FVi_k", // Pastor E.A. Adeboye – God of Miracles
    title: "God of Miracles – Pastor E.A. Adeboye"
  },
  {
    video: "https://www.youtube.com/embed/6uR-7qJqxMk", // Apostle Joshua Selman – The Power of Prayer
    title: "The Power of Prayer – Apostle Joshua Selman"
  },
  {
    video: "https://www.youtube.com/embed/3O0nZgqfvtI", // Pastor Paul Enenche – Finishing Strong
    title: "Finishing Strong – Pastor Paul Enenche"
  },
  {
    video: "https://www.youtube.com/embed/k5mW1GVs05c", // Bishop David Oyedepo – Understanding Faith
    title: "Understanding Faith – Bishop David Oyedepo"
  },
  {
    video: "https://www.youtube.com/embed/roNIQFEsn7Q", // Apostle Michael Orokpo – Purity and Power
    title: "Purity and Power – Apostle Michael Orokpo"
  },
  {
    video: "https://www.youtube.com/embed/tPKEpmL9c-4", // Pastor Mensa Otabil – The Word and Your Destiny
    title: "The Word & Your Destiny – Pastor Mensa Otabil"
  },
  {
    video: "https://www.youtube.com/embed/kMKfp-HZqAA", // Dr. Myles Munroe – Purpose and Vision
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