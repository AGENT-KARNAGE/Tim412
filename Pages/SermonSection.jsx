import React from "react";
import "./thisweek.css"; // Reuse the same styling as ThisWeekWithTim412

import newWine from "../Assets/Videos/New-Wine.mp4";
import finishingStrong from "../Assets/Videos/Finishing-Strong.mp4";
import godAlone from "../Assets/Videos/God-Alone.mp4";

const sermons = [
  { video: newWine, title: "New Wine" },
  { video: finishingStrong, title: "Finishing Strong" },
  { video: godAlone, title: "God and God Alone" },
];

const SermonSection = () => {
  return (
    <section className="this-week-section">
      <h2>Sermons</h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...sermons, ...sermons].map(({ video, title }, index) => (
            <div className="carousel-card" key={index}>
              <video
                src={video}
                controls
                className="carousel-video"
              />
              <h4 className="carousel-caption">{title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SermonSection;
