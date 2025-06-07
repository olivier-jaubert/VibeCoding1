import React from "react";
import "./Gallery.css";

// Automatically import all jpg images from assets folder
const images = import.meta.glob('./assets/*.jpg', { eager: true });

const imageList = Object.values(images).map((mod) => mod.default);

const Gallery = () => (
  <div className="gallery-container">
    {imageList.map((src, idx) => (
      <div className="gallery-item" key={idx}>
        <img src={src} alt={`Gallery ${idx + 1}`} />
      </div>
    ))}
  </div>
);

export default Gallery;
