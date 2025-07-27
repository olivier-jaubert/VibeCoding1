import React from 'react';
import ImageCard from './ImageCard';
import './Gallery.css';

const GalleryGrid = ({ images, favorites = [], onImageClick, onToggleFavorite, showFavorites = false, selectedImg, isEnhancing, handleEnhanceImage }) => (
  <div className="gallery-container">
    {images.map((src, idx) => (
      <div className="gallery-item" key={idx} style={{ position: 'relative' }}>
        <ImageCard
          src={src}
          alt={`Gallery ${idx + 1}`}
          onClick={() => onImageClick(src)}
          className={favorites.includes(src) ? 'favorite' : ''}
        />
        {onToggleFavorite && (
          <button
            aria-label={favorites.includes(src) ? 'Remove from favorites' : 'Add to favorites'}
            onClick={e => { e.stopPropagation(); onToggleFavorite(src); }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(255,255,255,0.8)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: favorites.includes(src) ? '#f39c12' : '#aaa',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)'
            }}
            tabIndex={0}
          >
            {favorites.includes(src) ? '★' : '☆'}
          </button>
        )}
        {/* Only show Enhance button if this image is selected and not in favorites mode */}
        {!showFavorites && selectedImg === src && handleEnhanceImage && (
          <button
            style={{
              marginTop: 8,
              width: '100%',
              background: '#0a2342',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 0',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            disabled={isEnhancing}
            onClick={() => handleEnhanceImage(src)}
          >
            {isEnhancing ? '✨ Enhancing...' : '✨ AI Editor'}
          </button>
        )}
      </div>
    ))}
  </div>
);

export default GalleryGrid;
