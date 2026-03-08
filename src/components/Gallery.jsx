import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/data.js';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const Lightbox = ({ image, onClose, onNext, onPrev }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gold hover:text-yellow-400 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <svg className="w-10 h-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gold hover:text-yellow-400 transition-colors neu-button p-4"
        aria-label="Previous image"
      >
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl max-h-[90vh] w-full"
      >
        <img src={image} alt="Gallery" className="w-full h-full object-contain rounded-2xl shadow-2xl" />
      </motion.div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold hover:text-yellow-400 transition-colors neu-button p-4"
        aria-label="Next image"
      >
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gold font-semibold bg-surface/80 backdrop-blur-md px-6 py-2 rounded-full">
        {currentIndex + 1} / {galleryImages.length}
      </div>
    </motion.div>
  );

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-text/80 text-lg max-w-2xl mx-auto">
            Relive the moments from Torque 2025 - A celebration of innovation and engineering excellence
          </p>
        </motion.div>

        {/* Horizontal Scrolling Gallery */}
        <div className="gallery-container">
          <div className="gallery-track">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(image, index)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`Torque Gallery ${index + 1}`}
                  className="gallery-image"
                  loading="lazy"
                />
                <figcaption className="gallery-caption">Torque 2K25</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-text/60 text-sm mt-8"
        >
          Click on any image to view in full screen • Use arrow keys to navigate
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={closeLightbox}
            onNext={() => navigateImage('next')}
            onPrev={() => navigateImage('prev')}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
