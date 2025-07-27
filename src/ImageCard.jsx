import React from "react";
import PropTypes from "prop-types";
import "./ImageCard.css";

/**
 * ImageCard - A reusable card component for displaying gallery images.
 * Props:
 *   src (string): Image source URL
 *   alt (string): Alt text for accessibility
 *   onClick (function): Optional click handler (e.g., open modal)
 *   className (string): Optional additional class names
 */
const ImageCard = ({ src, alt, onClick, className = "" }) => {
  return (
    <div className={`image-card ${className}`.trim()} onClick={onClick} tabIndex={onClick ? 0 : undefined} role={onClick ? "button" : undefined} aria-label={alt}>
      <img src={src} alt={alt} loading="lazy" className="image-card-img" />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ImageCard;
