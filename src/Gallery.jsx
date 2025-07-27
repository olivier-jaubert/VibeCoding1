import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Gallery.css';
import GalleryGrid from './GalleryGrid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

// Automatically import all jpg and png images from assets folder
const images = {
  ...import.meta.glob('./assets/*.jpg', { eager: true }),
  ...import.meta.glob('./assets/*.png', { eager: true }),
};

const imageList = Object.values(images).map((mod) => mod.default);

// Automatically import all jpg and png images from enhanced_images folder
const enhancedImagesStatic = {
  ...import.meta.glob('./assets/enhanced_images/*.jpg', { eager: true }),
  ...import.meta.glob('./assets/enhanced_images/*.png', { eager: true }),
};
const enhancedImageList = Object.values(enhancedImagesStatic).map((mod) => mod.default);

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState('');
  // Add state for selected enhanced image
  const [selectedEnhancedImg, setSelectedEnhancedImg] = useState(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [dynamicEnhancedImages, setDynamicEnhancedImages] = useState([]);
  // Favorites state and persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('gallery-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('gallery-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handler to save as image
  const handleSaveAsImage = async () => {
    const gallery = document.getElementById('gallery-root');
    if (!gallery) return;
    const canvas = await html2canvas(gallery, { useCORS: true });
    const link = document.createElement('a');
    link.download = 'gallery.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  // Handler to save as PDF
  const handleSaveAsPDF = async () => {
    const gallery = document.getElementById('gallery-root');
    if (!gallery) return;
    const canvas = await html2canvas(gallery, { useCORS: true });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('gallery.pdf');
  };

  // Handler to edit image using DeepAI Photo Editor API with text input
  const handleEnhanceImage = async (src) => {
    if (!editPrompt.trim()) {
      setEnhanceError('Please enter a prompt for the enhancement.');
      return;
    }
    setIsEnhancing(true);
    setEnhanceError('');
    try {
      // Convert image to blob
      const response = await fetch(src);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');
      formData.append('text', editPrompt);
      const apiKey = import.meta.env.VITE_DEEPAI_API_KEY;
      const result = await axios.post('https://api.deepai.org/api/image-editor', formData, {
        headers: { 'api-key': apiKey },
      });
      if (result.data && result.data.output_url) {
        setDynamicEnhancedImages((prev) => [...prev, result.data.output_url]);
      } else {
        setEnhanceError(`Enhancement failed. Response: ${JSON.stringify(result.data)}`);
      }
    } catch (err) {
      let errorMsg = 'Enhancement failed. ';
      if (err.response && err.response.data) {
        errorMsg += `API error: ${JSON.stringify(err.response.data)}`;
      } else if (err.message) {
        errorMsg += `Error: ${err.message}`;
      } else {
        errorMsg += 'Unknown error.';
      }
      setEnhanceError(errorMsg);
    }
    setIsEnhancing(false);
  };

  const toggleFavorite = (url) => {
    setFavorites((prev) =>
      prev.includes(url) ? prev.filter((f) => f !== url) : [...prev, url]
    );
  };

  // For main and enhanced images
  const allImages = imageList.concat(enhancedImageList, dynamicEnhancedImages);
  const displayedImages = showFavorites
    ? allImages.filter((url) => favorites.includes(url))
    : imageList;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '24px 0 0 0' }}>
        <button
          onClick={handleSaveAsImage}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: 'none',
            background: '#0a2342',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          💾 Save as Image
        </button>
        <button
          onClick={handleSaveAsPDF}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: 'none',
            background: '#0a2342',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          📄 Save as PDF
        </button>
        <button
          onClick={() => setShowFavorites((v) => !v)}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: 'none',
            background: showFavorites ? '#f39c12' : '#0a2342',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>
      <div id="gallery-root">
        {/* Header and profile intro moved to Header and ProfileIntro components */}

        <GalleryGrid
          images={displayedImages}
          favorites={favorites}
          onImageClick={setSelectedImg}
          onToggleFavorite={toggleFavorite}
          showFavorites={showFavorites}
          selectedImg={selectedImg}
          isEnhancing={isEnhancing}
          handleEnhanceImage={handleEnhanceImage}
        />
        {enhanceError && (
          <div style={{ color: 'red', textAlign: 'center', margin: 12 }}>⚠️ {enhanceError}</div>
        )}
        {/* Enhanced Images Section (persistent) */}
        {enhancedImageList.concat(dynamicEnhancedImages).length > 0 && (
          <div id="enhanced-images" style={{ marginTop: 32 }}>
            <h2 style={{ gridColumn: '1/-1', textAlign: 'center', color: '#0a2342' }}>
              🪄 Edited Images
            </h2>
            <div
              style={{
                gridColumn: '1/-1',
                textAlign: 'center',
                color: '#555',
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              These images are AI edited versions of photos from the main gallery using a text
              prompt 📝✨.
            </div>
            <GalleryGrid
              images={enhancedImageList.concat(dynamicEnhancedImages)}
              onImageClick={setSelectedEnhancedImg}
            />
          </div>
        )}
        {selectedImg && (
          <Modal
            isOpen={!!selectedImg}
            onClose={() => setSelectedImg(null)}
            onPrev={() => {
              const idx = displayedImages.indexOf(selectedImg);
              if (idx > 0) setSelectedImg(displayedImages[idx - 1]);
            }}
            onNext={() => {
              const idx = displayedImages.indexOf(selectedImg);
              if (idx < displayedImages.length - 1) setSelectedImg(displayedImages[idx + 1]);
            }}
            showNav={displayedImages.length > 1}
          >
            <img src={selectedImg} alt="Large preview" style={{ maxHeight: '60vh', maxWidth: '80vw' }} />
            <input
              type="text"
              placeholder="📝 Describe your enhancement (e.g. 'make it look like a painting')"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              style={{
                width: '100%',
                margin: '16px 0 8px 0',
                padding: 8,
                borderRadius: 6,
                border: '1px solid #ccc',
                fontSize: 16,
              }}
              disabled={isEnhancing}
            />
            <button
              style={{
                marginTop: 8,
                width: '100%',
                background: '#0a2342',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '10px 0',
                cursor: isEnhancing ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                fontSize: 18,
              }}
              disabled={isEnhancing}
              onClick={() => handleEnhanceImage(selectedImg)}
            >
              {isEnhancing ? '✨ Editing...' : '✨ AI Editor'}
            </button>
          </Modal>
        )}
        {/* Modal for zoomed enhanced image */}
        {selectedEnhancedImg && (
          <Modal
            isOpen={!!selectedEnhancedImg}
            onClose={() => setSelectedEnhancedImg(null)}
            onPrev={() => {
              const allEnhanced = enhancedImageList.concat(dynamicEnhancedImages);
              const idx = allEnhanced.indexOf(selectedEnhancedImg);
              if (idx > 0) setSelectedEnhancedImg(allEnhanced[idx - 1]);
            }}
            onNext={() => {
              const allEnhanced = enhancedImageList.concat(dynamicEnhancedImages);
              const idx = allEnhanced.indexOf(selectedEnhancedImg);
              if (idx < allEnhanced.length - 1) setSelectedEnhancedImg(allEnhanced[idx + 1]);
            }}
            showNav={enhancedImageList.concat(dynamicEnhancedImages).length > 1}
          >
            <img src={selectedEnhancedImg} alt="Enhanced Large preview" style={{ maxHeight: '70vh', maxWidth: '90vw' }} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Gallery;
