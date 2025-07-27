/**
 * Modal - A reusable modal/lightbox component for displaying content in an overlay.
 *
 * Props:
 *   isOpen (bool): Whether the modal is open
 *   onClose (function): Handler to close the modal
 *   children (node): Content to display inside the modal
 *   onPrev (function): Optional handler for previous navigation (for image galleries)
 *   onNext (function): Optional handler for next navigation
 *   showNav (bool): Show navigation arrows (default: false)
 *
 * Usage:
 *   <Modal isOpen={modalOpen} onClose={closeModal} showNav onPrev={prevImg} onNext={nextImg}>
 *     <img src={selectedImg} alt="" />
 *   </Modal>
 */
import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, onPrev, onNext, showNav = false }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (showNav && e.key === 'ArrowLeft' && onPrev) onPrev();
      if (showNav && e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, showNav]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {showNav && (
          <>
            <button className="modal-nav modal-prev" onClick={onPrev}>&#8592;</button>
            <button className="modal-nav modal-next" onClick={onNext}>&#8594;</button>
          </>
        )}
        {children}
        <button className="modal-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default Modal;
