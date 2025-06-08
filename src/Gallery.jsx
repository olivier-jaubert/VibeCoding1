import React, { useState } from "react";
import "./Gallery.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

// Automatically import all jpg images from assets folder
const images = import.meta.glob('./assets/*.jpg', { eager: true });

const imageList = Object.values(images).map((mod) => mod.default);

// Automatically import all jpg images from enhanced_images folder
const enhancedImagesStatic = import.meta.glob('./assets/enhanced_images/*.jpg', { eager: true });
const enhancedImageList = Object.values(enhancedImagesStatic).map((mod) => mod.default);

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState("");
  // Add state for selected enhanced image
  const [selectedEnhancedImg, setSelectedEnhancedImg] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");

  // Handler to save as image
  const handleSaveAsImage = async () => {
    const gallery = document.getElementById("gallery-root");
    if (!gallery) return;
    const canvas = await html2canvas(gallery, { useCORS: true });
    const link = document.createElement("a");
    link.download = "gallery.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  // Handler to save as PDF
  const handleSaveAsPDF = async () => {
    const gallery = document.getElementById("gallery-root");
    if (!gallery) return;
    const canvas = await html2canvas(gallery, { useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
    pdf.save("gallery.pdf");
  };

  // Handler to edit image using DeepAI Photo Editor API with text input
  const handleEnhanceImage = async (src) => {
    if (!editPrompt.trim()) {
      setEnhanceError("Please enter a prompt for the enhancement.");
      return;
    }
    setIsEnhancing(true);
    setEnhanceError("");
    try {
      // Convert image to blob
      const response = await fetch(src);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");
      formData.append("text", editPrompt);
      const apiKey = "6c7fe6d1-9d25-4bf7-a1c0-d2e0eceede12";
      const result = await axios.post(
        "https://api.deepai.org/api/image-editor",
        formData,
        { headers: { "api-key": apiKey } }
      );
      if (result.data && result.data.output_url) {
        setEnhancedImages((prev) => [...prev, result.data.output_url]);
      } else {
        setEnhanceError(
          `Enhancement failed. Response: ${JSON.stringify(result.data)}`
        );
      }
    } catch (err) {
      let errorMsg = "Enhancement failed. ";
      if (err.response && err.response.data) {
        errorMsg += `API error: ${JSON.stringify(err.response.data)}`;
      } else if (err.message) {
        errorMsg += `Error: ${err.message}`;
      } else {
        errorMsg += "Unknown error.";
      }
      setEnhanceError(errorMsg);
    }
    setIsEnhancing(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '24px 0 0 0' }}>
        <button onClick={handleSaveAsImage} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0a2342', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>💾 Save as Image</button>
        <button onClick={handleSaveAsPDF} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0a2342', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>📄 Save as PDF</button>
      </div>
      <div id="gallery-root">
        <h1 style={{ textAlign: "center" }}>
          🖼️ Personal Gallery<br />
          Olivier's Friday Art Journey 🎨 
        </h1>
        <div className="profile-section" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 32 }}>
          <img
            src={new URL('./assets/annex/Picture_OJ.jpg', import.meta.url).href}
            alt="Olivier Jaubert"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          />
          <div style={{ fontStyle: 'italic', fontSize: 18, marginBottom: 8 }}>
            Biomedical Imaging Scientist 🧬 during the week, but Artist 🎨 on Fridays
          </div>
          <blockquote style={{ maxWidth: 500, textAlign: 'center', fontSize: 16, margin: 0 }}>
            Working 4 days a week opens up quite a bit of opportunities to explore new things 🌱. With no one around to sidetrack you, it gives you the free time you need—with no valid excuses to not try 🚀. Science and Art are fun 😂 ❤️.
          </blockquote>
        </div>
        
        <div className="gallery-container">
          {imageList.map((src, idx) => (
            <div className="gallery-item" key={idx}>
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                onClick={() => setSelectedImg(src)}
                style={{ cursor: "pointer" }}
              />
              {/* Only show Enhance button if this image is selected */}
              {selectedImg === src && (
                <button
                  style={{ marginTop: 8, width: '100%', background: '#0a2342', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 0', cursor: 'pointer', fontWeight: 500 }}
                  disabled={isEnhancing}
                  onClick={() => handleEnhanceImage(src)}
                >
                  {isEnhancing ? '✨ Enhancing...' : '✨ AI Editor'}
                </button>
              )}
            </div>
          ))}
        </div>
        {enhanceError && <div style={{ color: 'red', textAlign: 'center', margin: 12 }}>⚠️ {enhanceError}</div>}
        {/* Enhanced Images Section (persistent) */}
        {enhancedImageList.length > 0 && (
          <div className="gallery-container" style={{ marginTop: 32 }}>
            <h2 style={{ gridColumn: '1/-1', textAlign: 'center', color: '#0a2342' }}>🪄 Enhanced Images</h2>
            {enhancedImageList.map((url, idx) => (
              <div className="gallery-item" key={idx}>
                <img src={url} alt={`Enhanced ${idx + 1}`} style={{ cursor: 'pointer' }} onClick={() => setSelectedEnhancedImg(url)} />
              </div>
            ))}
          </div>
        )}
        {selectedImg && (
          <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img src={selectedImg} alt="Large preview" />
              <input
                type="text"
                placeholder="📝 Describe your enhancement (e.g. 'make it look like a painting')"
                value={editPrompt}
                onChange={e => setEditPrompt(e.target.value)}
                style={{ width: '100%', margin: '16px 0 8px 0', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
                disabled={isEnhancing}
              />
              <button
                style={{ marginTop: 8, width: '100%', background: '#0a2342', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', cursor: isEnhancing ? 'not-allowed' : 'pointer', fontWeight: 500, fontSize: 18 }}
                disabled={isEnhancing}
                onClick={() => handleEnhanceImage(selectedImg)}
              >
                {isEnhancing ? '✨ Enhancing...' : '✨ AI Editor'}
              </button>
              <button className="modal-close" onClick={() => setSelectedImg(null)}>&times;</button>
            </div>
          </div>
        )}
        {/* Modal for zoomed enhanced image */}
        {selectedEnhancedImg && (
          <div className="modal-overlay" onClick={() => setSelectedEnhancedImg(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img src={selectedEnhancedImg} alt="Enhanced Large preview" />
              <button className="modal-close" onClick={() => setSelectedEnhancedImg(null)}>&times;</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
