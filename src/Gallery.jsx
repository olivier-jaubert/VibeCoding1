import React, { useState } from "react";
import "./Gallery.css";

// Automatically import all jpg images from assets folder
const images = import.meta.glob('./assets/*.jpg', { eager: true });

const imageList = Object.values(images).map((mod) => mod.default);

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Personal Gallery<br />
        Olivier's Friday Art journey
      </h1>
      <div className="gallery-container">
        {imageList.map((src, idx) => (
          <div className="gallery-item" key={idx}>
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              onClick={() => setSelectedImg(src)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
      {selectedImg && (
        <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImg} alt="Large preview" />
            <button className="modal-close" onClick={() => setSelectedImg(null)}>&times;</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
